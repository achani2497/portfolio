import type { TechnologyId } from "./technologies";

export const EXPERIENCE_ORDER = [
  "devecoop",
  "kovix",
  "ingeray",
  "utnEngineering",
  "utnAssistant",
] as const;

export type ExperienceId = (typeof EXPERIENCE_ORDER)[number];

export type ExperienceStructureItem = {
  id: ExperienceId;
  kind: "work" | "education";
  company: string;
  companyInitials: string;
  logo?: string;
  techIds?: readonly TechnologyId[];
};

export const experienceStructure: Record<ExperienceId, ExperienceStructureItem> = {
  devecoop: {
    id: "devecoop",
    kind: "work",
    company: "Cooperativa de Trabajo Devecoop",
    companyInitials: "D",
    logo: "devecoop.png",
    techIds: [
      "react",
      "typescript",
      "tailwind",
      "nodejs",
      "expressjs",
      "mongodb",
    ],
  },
  kovix: {
    id: "kovix",
    kind: "work",
    company: "Kovix",
    companyInitials: "K",
    logo: "kovix.svg",
    techIds: [
      "react",
      "reactNative",
      "typescript",
      "angular",
      "tailwind",
      "expressjs",
      "nestjs",
      "django",
      "postgresql",
      "mysql",
      "amazonS3",
    ],
  },
  ingeray: {
    id: "ingeray",
    kind: "work",
    company: "Ingeray S.R.L.",
    companyInitials: "I",
    logo: "ingeray.svg",
    techIds: ["vue", "react", "expressjs", "laravel", "php", "mysql"],
  },
  utnEngineering: {
    id: "utnEngineering",
    kind: "education",
    company: "Universidad Tecnologica Nacional (UTN - FRBA)",
    companyInitials: "U",
    logo: "utn.jpg",
  },
  utnAssistant: {
    id: "utnAssistant",
    kind: "education",
    company: "Universidad Tecnologica Nacional (UTN - FRBA)",
    companyInitials: "U",
    logo: "utn.jpg",
  },
};
