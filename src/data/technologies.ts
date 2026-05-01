import type { IconKey } from "../utils/getIcon";

export type TechnologyLevelKey = "basic" | "intermediate" | "advanced";

type TechnologyDefinition = {
  id: string;
  label: string;
  icon: IconKey;
  level: TechnologyLevelKey;
  featured: boolean;
};

export const technologies = [
  { id: "react", label: "React", icon: "siReact", level: "advanced", featured: true },
  {
    id: "typescript",
    label: "TypeScript",
    icon: "siTypescript",
    level: "intermediate",
    featured: true,
  },
  {
    id: "nodejs",
    label: "Node.js",
    icon: "siNodedotjs",
    level: "intermediate",
    featured: true,
  },
  {
    id: "expressjs",
    label: "Express.js",
    icon: "siExpress",
    level: "intermediate",
    featured: true,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    icon: "siMongodb",
    level: "intermediate",
    featured: true,
  },
  {
    id: "reactNative",
    label: "React Native",
    icon: "siReact",
    level: "basic",
    featured: true,
  },
  { id: "angular", label: "Angular", icon: "siAngular", level: "basic", featured: true },
  {
    id: "tailwind",
    label: "Tailwind",
    icon: "siTailwindcss",
    level: "intermediate",
    featured: true,
  },
  {
    id: "nestjs",
    label: "NestJS",
    icon: "siNestjs",
    level: "intermediate",
    featured: true,
  },
  { id: "django", label: "Django", icon: "siDjango", level: "basic", featured: true },
  {
    id: "postgresql",
    label: "PostgreSQL",
    icon: "siPostgresql",
    level: "intermediate",
    featured: true,
  },
  { id: "mysql", label: "MySQL", icon: "siMysql", level: "intermediate", featured: true },
  {
    id: "amazonS3",
    label: "Amazon S3",
    icon: "aws",
    level: "intermediate",
    featured: true,
  },
  { id: "vue", label: "Vue", icon: "siVuedotjs", level: "intermediate", featured: true },
  {
    id: "laravel",
    label: "Laravel",
    icon: "siLaravel",
    level: "intermediate",
    featured: true,
  },
  { id: "php", label: "PHP", icon: "siPhp", level: "intermediate", featured: false },
] as const satisfies readonly TechnologyDefinition[];

export type Technology = (typeof technologies)[number];
export type TechnologyId = Technology["id"];

export const technologyCatalog: Record<TechnologyId, Technology> = technologies.reduce(
  (accumulator, technology) => {
    accumulator[technology.id] = technology;
    return accumulator;
  },
  {} as Record<TechnologyId, Technology>,
);

export const featuredTechnologies = technologies.filter(
  (technology) => technology.featured,
);
