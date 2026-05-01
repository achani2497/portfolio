import type { AppDictionary } from "../../types";
import { enContact } from "./contact";
import { enExperience } from "./experience";
import { enFooter } from "./footer";
import { enIntro } from "./intro";
import { enMeta } from "./meta";
import { enSidebar } from "./sidebar";
import { enTechnologies } from "./technologies";

export const enDictionary: AppDictionary = {
  meta: enMeta,
  sidebar: enSidebar,
  intro: enIntro,
  experience: enExperience,
  technologies: enTechnologies,
  contact: enContact,
  footer: enFooter,
};
