import type { SimpleIcon } from "simple-icons";
import { icons } from "../components/consts/icons";

export function getIcon(iconName: string): SimpleIcon | null {
    return icons[iconName] ?? null;
}