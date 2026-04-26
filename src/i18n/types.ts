export type Locale = "en" | "es";

export type TechnologyItem = {
  label: string;
  icon: string;
  level: string;
};

export type ExperienceTech = {
  label: string;
  icon: string;
};

export type ExperienceItem = {
  kind: "work" | "education";
  role: string;
  company: string;
  companyInitials: string;
  period: string;
  status?: string;
  description: string;
  logo?: string;
  techs?: ExperienceTech[];
};

export type AppDictionary = {
  meta: {
    title: string;
    description: string;
  };
  sidebar: {
    intro: string;
    experience: string;
    technologies: string;
    contact: string;
  };
  intro: {
    role: string;
    name: string;
    about: string;
    github: string;
    linkedin: string;
    email: string;
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  technologies: {
    title: string;
    items: TechnologyItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    line1: string;
    line2: string;
    cta: string;
  };
};
