import type { ExperienceId } from "../data/experiences";
import type { TechnologyLevelKey } from "../data/technologies";

export type Locale = "en" | "es";

export type ExperienceCopyItem = {
  role: string;
  period: string;
  status?: string;
  description: string;
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
    itemsById: Record<ExperienceId, ExperienceCopyItem>;
  };
  technologies: {
    title: string;
    levels: Record<TechnologyLevelKey, string>;
  };
  contact: {
    eyebrow: string;
    title: string;
    line1: string;
    line2: string;
    cta: string;
  };
  footer: {
    rightsReserved: string;
    authorship: string;
  };
};
