import type { AppDictionary } from "../types";

export const enDictionary: AppDictionary = {
  meta: {
    title: "Alejandro Chañi - Portfolio",
    description:
      "Full Stack Developer portfolio with experience in React, Node.js, and scalable product development.",
  },
  sidebar: {
    intro: "Introduction",
    experience: "Experience & Education",
    technologies: "Technologies",
    contact: "Contact",
  },
  intro: {
    role: "Full Stack Developer",
    name: "Alejandro Ismael Chañi",
    about:
      "Information Systems Engineer and Full Stack Developer with 5 years of experience building scalable, product-oriented web applications. Strong background in React and Node.js, working across Frontend and Backend, contributing to end-to-end feature design and implementation, technical decision-making, and continuous software quality improvement. My focus is to be part of projects with real impact and to keep growing toward technical leadership roles.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
  },
  experience: {
    title: "Experience & Education",
    items: [
      {
        kind: "work",
        role: "Full Stack Developer",
        company: "Cooperativa de Trabajo Devecoop",
        companyInitials: "D",
        period: "Mar 2024 - Present",
        description:
          "Batuta project:\n• Development and refactoring of backend modules, designing and implementing REST APIs with Express.js and TypeScript, and optimizing MongoDB queries to improve performance and support the product's scalability.\n• Participation in frontend module design and full interface development with React, focusing on user experience, performance, and code quality.\n• Refactoring of legacy frontend and backend modules, reducing technical debt and improving code maintainability.\n• Proposal and progressive rollout of an architecture based on Clean Architecture, defining responsibilities and technical guidelines for the project.\n• Contribution to technical design and architecture decisions, working closely with other team roles.",
        logo: "devecoop.png",
        techs: [
          { label: "React", icon: "siReact" },
          { label: "TypeScript", icon: "siTypescript" },
          { label: "Node.js", icon: "siNodedotjs" },
          { label: "Express.js", icon: "siExpress" },
          { label: "MongoDB", icon: "siMongodb" },
        ],
      },
      {
        kind: "work",
        role: "Full Stack Developer",
        company: "Kovix",
        companyInitials: "K",
        period: "Mar 2022 - Feb 2024",
        description:
          "• End-to-end feature development in product-oriented applications, participating in different projects and business contexts, including critical flows in both frontend and backend.\n• Development of web and mobile frontend interfaces and backend services, working with different stacks depending on the project, integrating external services and Amazon S3 storage.\n• Design and implementation of UI components and REST APIs, participating in requirements analysis and technical design, and proposing improvements that were applied in the final product.",
        logo: "kovix.svg",
        techs: [
          { label: "React", icon: "siReact" },
          { label: "React Native", icon: "siReact" },
          { label: "TypeScript", icon: "siTypescript" },
          { label: "Angular", icon: "siAngular" },
          { label: "Express.js", icon: "siExpress" },
          { label: "NestJS", icon: "siNestjs" },
          { label: "Django", icon: "siDjango" },
          { label: "PostgreSQL", icon: "siPostgresql" },
          { label: "MySQL", icon: "siMysql" },
          { label: "Amazon S3", icon: "aws" },
        ],
      },
      {
        kind: "work",
        role: "Full Stack Developer",
        company: "Ingeray S.R.L.",
        companyInitials: "I",
        period: "Mar 2019 - Feb 2022",
        description:
          "• End-to-end design and development of web applications, including an internal management app still in use that centralizes billing and project tracking data, with direct impact on work organization and internal processes.\n• Development of a web application for end users to report equipment failures through QR codes, improving report efficiency and traceability.\n• Development and maintenance of frontend and backend features, as well as the company's institutional website, participating in requirements gathering, solution design, and full feature delivery.",
        logo: "ingeray.svg",
        techs: [
          { label: "Vue", icon: "siVuedotjs" },
          { label: "React", icon: "siReact" },
          { label: "Express.js", icon: "siExpress" },
          { label: "Laravel", icon: "siLaravel" },
          { label: "PHP", icon: "siPhp" },
          { label: "MySQL", icon: "siMysql" },
        ],
      },
      {
        kind: "education",
        role: "Information Systems Engineering",
        company: "Universidad Tecnologica Nacional (UTN - FRBA)",
        companyInitials: "U",
        period: "2016 - 2024",
        status: "Degree completed",
        description:
          "Undergraduate education focused on software engineering, systems analysis, architecture, and management of technology projects.",
        logo: "utn.jpg",
      },
      {
        kind: "education",
        role: "Teaching Assistant",
        company: "Universidad Tecnologica Nacional (UTN - FRBA)",
        companyInitials: "U",
        period: "2019 - 2022",
        description:
          "Participation as a teaching assistant in the 'Programming Paradigms' course, supporting classes, answering questions, and collaborating with student follow-up.",
        logo: "utn.jpg",
      },
    ],
  },
  technologies: {
    title: "Technologies",
    items: [
      { label: "React", icon: "siReact", level: "Advanced" },
      { label: "TypeScript", icon: "siTypescript", level: "Intermediate" },
      { label: "Node.js", icon: "siNodedotjs", level: "Intermediate" },
      { label: "Express.js", icon: "siExpress", level: "Intermediate" },
      { label: "MongoDB", icon: "siMongodb", level: "Intermediate" },
      { label: "React Native", icon: "siReact", level: "Basic" },
      { label: "Angular", icon: "siAngular", level: "Basic" },
      { label: "NestJS", icon: "siNestjs", level: "Intermediate" },
      { label: "Django", icon: "siDjango", level: "Basic" },
      { label: "PostgreSQL", icon: "siPostgresql", level: "Intermediate" },
      { label: "MySQL", icon: "siMysql", level: "Intermediate" },
      { label: "Amazon S3", icon: "aws", level: "Intermediate" },
      { label: "Vue", icon: "siVuedotjs", level: "Intermediate" },
      { label: "Laravel", icon: "siLaravel", level: "Intermediate" },
    ],
  },
  contact: {
    eyebrow: "Let's talk!",
    title: "Interested in my work?",
    line1: "Let's schedule a call and discuss your proposal.",
    line2:
      "I am open to new opportunities and technical challenges in projects with real impact.",
    cta: "Let's set up a meeting!",
  },
};
