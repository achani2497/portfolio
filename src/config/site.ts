import type { IconKey } from "../utils/getIcon";

export const SITE_PROFILE = {
  fullName: "Alejandro Ismael Chañi",
  titleName: "Alejandro Chañi",
  email: "alejandro.chani24@gmail.com",
} as const;

export const SITE_LINKS = {
  github: "https://github.com/achani2497",
  linkedin: "https://linkedin.com/in/alejandro-chañi",
  calendar: "https://calendar.app.google/UN5BnTAkxnHJyN8b8",
  email: `mailto:${SITE_PROFILE.email}`,
} as const;

export const SOCIAL_LINKS = [
  { key: "github", icon: "siGithub" },
  { key: "linkedin", icon: "linkedin" },
  { key: "email", icon: "siGmail" },
] as const satisfies readonly { key: "github" | "linkedin" | "email"; icon: IconKey }[];

export const BRANDING = {
  themeColor: "#E7E0F5",
  manifestName: `${SITE_PROFILE.titleName} - Portfolio`,
  manifestShortName: SITE_PROFILE.titleName,
} as const;
