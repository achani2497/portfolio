import {
  siAngular,
  siDjango,
  siExpress,
  siGithub,
  siGmail,
  siGooglecalendar,
  siLaravel,
  siMongodb,
  siMysql,
  siNestjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs
} from "simple-icons";

import type { SimpleIcon } from "simple-icons";

export const icons = {
  siGithub,
  siGmail,
  siReact,
  siTypescript,
  siNodedotjs,
  siExpress,
  siMongodb,
  siAngular,
  siNestjs,
  siDjango,
  siPostgresql,
  siMysql,
  siVuedotjs,
  siLaravel,
  siPhp,
  siGooglecalendar,
  siTailwindcss
} as const satisfies Record<string, SimpleIcon>;

export type SimpleIconKey = keyof typeof icons;
