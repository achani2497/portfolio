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

export const lucideIcons: Record<string, LucideIcon> = {
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
};
