import {
  BriefcaseBusiness,
  ChevronDown,
  Cloud,
  CodeXml,
  Home,
  Linkedin,
  MessagesSquare,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";

export const lucideIcons = {
  // Missing techs icons on simple-icons
  linkedin: Linkedin,
  aws: Cloud,
  // Sidebar icons
  home: Home,
  experience: BriefcaseBusiness,
  technologies: CodeXml,
  contact: MessagesSquare,
  // Theme icons
  sun: Sun,
  moon: Moon,
  // UI icons
  chevronDown: ChevronDown,
} as const satisfies Record<string, LucideIcon>;

export type LucideIconKey = keyof typeof lucideIcons;
