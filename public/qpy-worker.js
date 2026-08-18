/*
 * public/qpy-worker.js
 * عامل ويب يشغّل بايثون داخل المتصفح عبر Pyodide (WebAssembly) دون أي خادم.
 * A Web Worker running Python in-browser via Pyodide — zero backend required.
 *
 * يعمل داخل عامل مستقل كي لا تُجمّد الحلقات اللانهائية واجهة المستخدم،
 * ويمكن إنهاؤه من الصفحة الرئيسية لإيقاف تنفيذ معلّق.
 *
 * هذا الملف يُقدَّم كما هو من مجلد public ولا يمرّ بأي مُجمِّع.
 */

/* eslint-disable no-undef */

const PYODIDE_VERSION = "0.28.3";
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

/**
 * طبقة بايثون التي تدير نطاقات الدفاتر وتلتقط المخرجات والرسوم.
 * كل دفتر له نطاق متغيّرات مستقل يستمر عبر الخلايا.
 */
const BOOTSTRAP = `
import ast
import base64
import io
import json
import os
import sys
import traceback
import warnings

os.environ.setdefault("MPLBACKEND", "AGG")

# مع خلفية AGG تُطلق matplotlib تحذيراً عند plt.show()، ونحن نلتقط الأشكال
# ونعرضها بأنفسنا، فلا داعي لإزعاج المتدرّب بتحذير لا يعنيه.
warnings.filterwarnings("ignore", message=".*FigureCanvasAgg is non-interactive.*")
warnings.filterwarnings("ignore", message=".*cannot be shown.*")

_Q_NAMESPACES = {}


def _q_namespace(key):
    ns = _Q_NAMESPACES.get(key)
    if ns is None:
        ns = {"__name__": "__main__", "__builtins__": __builtins__}
        _Q_NAMESPACES[key] = ns
    return ns


def _q_reset(key):
    _Q_NAMESPACES.pop(key, None)
    try:
        import matplotlib.pyplot as plt

        plt.close("all")
    except Exception:
        pass
    return True


def _q_capture_figures():
    images = []
    if "matplotlib" not in sys.modules:
        return images
    try:
        import matplotlib.pyplot as plt
    except Exception:
        return images
    for num in plt.get_fignums():
        figure = plt.figure(num)
        buffer = io.BytesIO()
        try:
            figure.savefig(buffer, format="png", dpi=110, bbox_inches="tight")
            images.append(base64.b64encode(buffer.getvalue()).decode("ascii"))
        except Exception:
            pass
    plt.close("all")
    return images


def _q_run(key, source):
    namespace = _q_namespace(key)
    out_buffer, err_buffer = io.StringIO(), io.StringIO()
    old_stdout, old_stderr = sys.stdout, sys.stderr
    sys.stdout, sys.stderr = out_buffer, err_buffer
    result = None
    error = None

    try:
        tree = ast.parse(source, mode="exec")
        # آخر تعبير يُعرض تلقائياً تماماً كما في دفاتر Jupyter
        tail = None
        if tree.body and isinstance(tree.body[-1], ast.Expr):
            tail = ast.Expression(tree.body.pop().value)
            ast.fix_missing_locations(tail)
        exec(compile(tree, "<خلية>", "exec"), namespace)
        if tail is not None:
            value = eval(compile(tail, "<خلية>", "eval"), namespace)
            if value is not None:
                try:
                    result = repr(value)
                except Exception:
                    result = "<تعذّر عرض القيمة>"
    except SyntaxError as exc:
        error = {
            "type": type(exc).__name__,
            "message": str(exc),
            "traceback": "".join(traceback.format_exception_only(type(exc), exc)),
        }
    except BaseException as exc:  # noqa: BLE001 - نلتقط كل شيء لعرضه للمتدرّب
        stack = traceback.format_exc()
        # نحذف إطارات هذه الطبقة كي يرى المتدرّب أثر شيفرته فقط
        lines = stack.splitlines(True)
        cleaned = [line for line in lines if "_q_run" not in line and "qpy-worker" not in line]
        error = {
            "type": type(exc).__name__,
            "message": str(exc),
            "traceback": "".join(cleaned) if cleaned else stack,
        }
    finally:
        sys.stdout, sys.stderr = old_stdout, old_stderr

    return json.dumps(
        {
            "stdout": out_buffer.getvalue(),
            "stderr": err_buffer.getvalue(),
            "result": result,
            "images": _q_capture_figures(),
            "error": error,
        },
        ensure_ascii=False,
    )
`;

let pyodide = null;
let booting = null;

function post(message) {
  self.postMessage(message);
}

async function boot() {
  post({ type: "status", status: "loading", detail: "تحميل نواة بايثون…" });
  importScripts(`${INDEX_URL}pyodide.js`);
  pyodide = await self.loadPyodide({ indexURL: INDEX_URL });
  await pyodide.runPythonAsync(BOOTSTRAP);
  post({ type: "status", status: "ready", detail: "النواة جاهزة" });
  return pyodide;
}

async function ensureReady() {
  if (pyodide) return pyodide;
  if (!booting) {
    booting = boot().catch((error) => {
      booting = null;
      throw error;
    });
  }
  return booting;
}

self.onmessage = async (event) => {
  const { type, id, key, code, packages } = event.data ?? {};

  try {
    if (type === "init") {
      await ensureReady();
      post({ type: "ready", id });
      return;
    }

    if (type === "reset") {
      const runtime = await ensureReady();
      runtime.globals.set("_q_key", key);
      runtime.runPython("_q_reset(_q_key)");
      post({ type: "reset-done", id, key });
      return;
    }

    if (type === "run") {
      const runtime = await ensureReady();
      const startedAt = performance.now();

      // تحميل الحزم المطلوبة تلقائياً من جُمَل import داخل الشيفرة
      try {
        await runtime.loadPackagesFromImports(code);
      } catch {
        /* حزمة غير متوفرة — يظهر الخطأ لاحقاً كخطأ استيراد عادي في بايثون */
      }
      if (Array.isArray(packages) && packages.length) {
        try {
          await runtime.loadPackage(packages);
        } catch {
          /* نتجاهل ونترك بايثون يبلّغ عن النقص */
        }
      }

      runtime.globals.set("_q_key", key);
      runtime.globals.set("_q_src", code);
      const raw = runtime.runPython("_q_run(_q_key, _q_src)");
      const payload = JSON.parse(raw);
      payload.durationMs = Math.round(performance.now() - startedAt);
      post({ type: "result", id, payload });
      return;
    }
  } catch (error) {
    post({
      type: "fatal",
      id,
      message: error && error.message ? error.message : String(error),
    });
  }
};
