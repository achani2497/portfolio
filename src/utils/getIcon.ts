import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { icons, type SimpleIconKey } from "../components/consts/icons";
import {
  lucideIcons,
  type LucideIconKey,
} from "../components/consts/lucideIcons";

export type IconKey = SimpleIconKey | LucideIconKey;

type IconResult =
  | { type: "simple"; icon: SimpleIcon }
  | { type: "lucide"; icon: LucideIcon }
  | null;

export function getIconData(iconName: IconKey): IconResult {
  // intento simple-icons
  const simpleIcon = icons[iconName];

  if (simpleIcon) {
    return { type: "simple", icon: simpleIcon };
  }

  // fallback lucide
  const lucideIcon = lucideIcons[iconName];

  if (lucideIcon) {
    return { type: "lucide", icon: lucideIcon };
  }

  return null;
}
