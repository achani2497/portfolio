import type { AppDictionary } from "../../types";
import { esContact } from "./contact";
import { esExperience } from "./experience";
import { esFooter } from "./footer";
import { esIntro } from "./intro";
import { esMeta } from "./meta";
import { esSidebar } from "./sidebar";
import { esTechnologies } from "./technologies";

export const esDictionary: AppDictionary = {
  meta: esMeta,
  sidebar: esSidebar,
  intro: esIntro,
  experience: esExperience,
  technologies: esTechnologies,
  contact: esContact,
  footer: esFooter,
};
