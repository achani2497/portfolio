import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { icons } from "../components/consts/icons";
import { lucideIcons } from "../components/consts/lucideIcons";

type IconResult =
    | { type: "simple"; icon: SimpleIcon }
    | { type: "lucide"; icon: LucideIcon }
    | null;

export function getIconData(iconName: string): IconResult {
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