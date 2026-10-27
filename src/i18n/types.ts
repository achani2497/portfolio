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
    mainStack: string;
    secondaryTechnologies: string;
    levels: Record<TechnologyLevelKey, string>;
  };
  contact: {
    eyebrow: string;
    title: string;
    line1: string;
    line2: string;
    cta: string;
  };
  chat: {
    title: string;
    description: string;
    emptyState: string;
    input: {
      placeholder: string;
      ariaLabel: string;
      send: string;
      stop: string;
      stopTitle: string;
      retry: string;
      dismiss: string;
    };
    status: {
      thinking: string;
      loading: string;
      stopped: string;
    };
    limits: {
      messagesLeft: string;
      messageLeft: string;
      limitReached: string;
    };
    export: {
      label: string;
      buttonTitle: string;
      header: string;
      exportedAt: string;
      userRole: string;
      assistantRole: string;
    };
    errors: {
      network: string;
      timeout: string;
      interruptedStream: string;
      generic: string;
      scheduleFailure: string;
      scheduleSuccess: string;
    };
    unavailable: {
      title: string;
      description: string;
    };
    options: {
      scheduleMeeting: string;
      downloadCv: string;
      openCalendar: string;
      schedulePending: string;
    };
  };
  footer: {
    rightsReserved: string;
    authorship: string;
  };
};
