import type { IconKey } from "../utils/getIcon";

export type TechnologyLevelKey = "basic" | "intermediate" | "advanced";

export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "mobile"
  | "language";

type TechnologyDefinition = {
  id: string;
  label: string;
  icon: IconKey;
  level: TechnologyLevelKey;
  category: TechnologyCategory;
  featured: boolean;
  mainStack: boolean;
};

const CATEGORY_ORDER: Record<TechnologyCategory, number> = {
  frontend: 0,
  backend: 1,
  database: 2,
  cloud: 3,
  mobile: 4,
  language: 5,
};

const LEVEL_ORDER: Record<TechnologyLevelKey, number> = {
  advanced: 0,
  intermediate: 1,
  basic: 2,
};

export const technologies = [
  {
    id: "react",
    label: "React",
    icon: "siReact",
    level: "advanced",
    category: "frontend",
    featured: true,
    mainStack: true,
  },
  {
    id: "typescript",
    label: "TypeScript",
    icon: "siTypescript",
    level: "intermediate",
    category: "language",
    featured: true,
    mainStack: true,
  },
  {
    id: "nodejs",
    label: "Node.js",
    icon: "siNodedotjs",
    level: "intermediate",
    category: "backend",
    featured: true,
    mainStack: true,
  },
  {
    id: "expressjs",
    label: "Express.js",
    icon: "siExpress",
    level: "intermediate",
    category: "backend",
    featured: true,
    mainStack: true,
  },
  {
    id: "tailwind",
    label: "Tailwind",
    icon: "siTailwindcss",
    level: "intermediate",
    category: "frontend",
    featured: true,
    mainStack: true,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    icon: "siMongodb",
    level: "intermediate",
    category: "database",
    featured: true,
    mainStack: false,
  },
  {
    id: "reactNative",
    label: "React Native",
    icon: "siReact",
    level: "basic",
    category: "mobile",
    featured: true,
    mainStack: false,
  },
  {
    id: "angular",
    label: "Angular",
    icon: "siAngular",
    level: "basic",
    category: "frontend",
    featured: true,
    mainStack: false,
  },
  {
    id: "nestjs",
    label: "NestJS",
    icon: "siNestjs",
    level: "intermediate",
    category: "backend",
    featured: true,
    mainStack: false,
  },
  {
    id: "django",
    label: "Django",
    icon: "siDjango",
    level: "basic",
    category: "backend",
    featured: true,
    mainStack: false,
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    icon: "siPostgresql",
    level: "intermediate",
    category: "database",
    featured: true,
    mainStack: false,
  },
  {
    id: "mysql",
    label: "MySQL",
    icon: "siMysql",
    level: "intermediate",
    category: "database",
    featured: true,
    mainStack: false,
  },
  {
    id: "amazonS3",
    label: "Amazon S3",
    icon: "aws",
    level: "intermediate",
    category: "cloud",
    featured: true,
    mainStack: false,
  },
  {
    id: "vue",
    label: "Vue",
    icon: "siVuedotjs",
    level: "intermediate",
    category: "frontend",
    featured: true,
    mainStack: false,
  },
  {
    id: "laravel",
    label: "Laravel",
    icon: "siLaravel",
    level: "intermediate",
    category: "backend",
    featured: true,
    mainStack: false,
  },
  {
    id: "php",
    label: "PHP",
    icon: "siPhp",
    level: "intermediate",
    category: "backend",
    featured: false,
    mainStack: false,
  },
] as const satisfies readonly TechnologyDefinition[];

export type Technology = (typeof technologies)[number];
export type TechnologyId = Technology["id"];

function sortByCategoryThenLevel(list: Technology[]): Technology[] {
  return [...list].sort((a, b) => {
    const catDiff = CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category];
    if (catDiff !== 0) return catDiff;
    return LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level];
  });
}

export const mainStack: Technology[] =
  sortByCategoryThenLevel(technologies.filter((t) => t.mainStack));

export const secondaryTechnologies: Technology[] =
  sortByCategoryThenLevel(technologies.filter((t) => !t.mainStack));

export const technologyCatalog: Record<TechnologyId, Technology> =
  technologies.reduce(
    (accumulator, technology) => {
      accumulator[technology.id] = technology;
      return accumulator;
    },
    {} as Record<TechnologyId, Technology>,
  );

export const featuredTechnologies = technologies.filter(
  (technology) => technology.featured,
);
