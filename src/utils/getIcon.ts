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

function isSimpleIconKey(iconName: IconKey): iconName is SimpleIconKey {
  return iconName in icons;
}

function isLucideIconKey(iconName: IconKey): iconName is LucideIconKey {
  return iconName in lucideIcons;
}

export function getIconData(iconName: IconKey): IconResult {
  // intento simple-icons
  const simpleIcon = isSimpleIconKey(iconName) ? icons[iconName] : undefined;

  if (simpleIcon) {
    return { type: "simple", icon: simpleIcon };
  }

  // fallback lucide
  const lucideIcon = isLucideIconKey(iconName)
    ? lucideIcons[iconName]
    : undefined;

  if (lucideIcon) {
    return { type: "lucide", icon: lucideIcon };
  }

  return null;
}
