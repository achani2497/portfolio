import {
    BriefcaseBusiness,
    Cloud,
    CodeXml,
    Home,
    Linkedin,
    MessagesSquare,
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
};