/**
 * components/CategoryIcon.tsx
 * ربط اسم الأيقونة النصي في بيانات التصنيفات بمكوّن lucide-react.
 */
import {
  Atom,
  Binary,
  Gauge,
  ShieldCheck,
  Sprout,
  ToggleRight,
  Trophy,
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
  Sprout,
  Trophy,
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = ICONS[name] ?? Atom;
  return <Icon className={className} aria-hidden="true" />;
}
