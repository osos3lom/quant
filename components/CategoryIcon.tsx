/**
 * components/CategoryIcon.tsx
 * ربط اسم الأيقونة النصي في بيانات التصنيفات بمكوّن lucide-react.
 */
import {
  Atom,
  Binary,
  Gauge,
  ShieldCheck,
  ToggleRight,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Atom,
  ToggleRight,
  Workflow,
  Gauge,
  Binary,
  ShieldCheck,
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = ICONS[name] ?? Atom;
  return <Icon className={className} aria-hidden="true" />;
}
