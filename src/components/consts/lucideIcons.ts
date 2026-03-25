import {
    BriefcaseBusiness,
    Cloud,
    CodeXml,
    Home,
    Linkedin,
    type LucideIcon,
} from "lucide-react";

export const lucideIcons: Record<string, LucideIcon> = {
    // Missing techs icons on simple-icons
    linkedin: Linkedin,
    aws: Cloud,
    // Sidebar icons
    home: Home,
    experience: BriefcaseBusiness,
    technologies: CodeXml
};