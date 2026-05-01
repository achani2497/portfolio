import type { IconKey } from "../utils/getIcon";

export const SECTION_NAVIGATION = [
  { id: "intro", icon: "home", i18nKey: "sidebar.intro" },
  { id: "experience", icon: "experience", i18nKey: "sidebar.experience" },
  {
    id: "technologies",
    icon: "technologies",
    i18nKey: "sidebar.technologies",
  },
  { id: "contact", icon: "contact", i18nKey: "sidebar.contact" },
] as const satisfies readonly {
  id: "intro" | "experience" | "technologies" | "contact";
  icon: IconKey;
  i18nKey: "sidebar.intro" | "sidebar.experience" | "sidebar.technologies" | "sidebar.contact";
}[];

export type SectionId = (typeof SECTION_NAVIGATION)[number]["id"];
