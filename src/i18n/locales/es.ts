import type { AppDictionary } from "../types";

export const esDictionary: AppDictionary = {
  meta: {
    title: "Alejandro Chañi - Portfolio",
    description:
      "Portfolio de Full Stack Developer con experiencia en React, Node.js y desarrollo de productos escalables.",
  },
  sidebar: {
    intro: "Introducción",
    experience: "Experiencia y Educación",
    technologies: "Tecnologías",
    contact: "Contacto",
  },
  intro: {
    role: "Full Stack Developer",
    name: "Alejandro Ismael Chañi",
    about:
      "Ingeniero en Sistemas de Información y Desarrollador Full Stack con 5 años de experiencia construyendo aplicaciones web escalables y orientadas a producto. Con experiencia principalmente en React y Node.js, trabajando en Frontend y Backend, participando en el diseño e implementación de features end-to-end, decisiones técnicas y mejora continua de la calidad del software. Mi foco es formar parte de proyectos con impacto real y evolucionar hacia roles de liderazgo técnico.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
  },
  experience: {
    title: "Experiencia y Formación",
    items: [
      {
        kind: "work",
        role: "Full Stack Developer",
        company: "Cooperativa de Trabajo Devecoop",
        companyInitials: "D",
        period: "Mar. 2024 - Actualidad",
        description:
          "Proyecto Batuta: \n• Desarrollo y refactorización de módulos backend, diseñando e implementando APIs REST con Express.js y TypeScript, y optimizando queries en MongoDB para mejorar performance y acompañar a la escalabilidad del producto.\n • Participación en el diseño de módulos frontend y desarrollo completo de interfaces con React, poniendo foco en la experiencia de usuario, performance y calidad del código.\n • Refactorización de módulos legacy en frontend y backend, reduciendo deuda técnica y mejorando la mantenibilidad del código.\n • Propuesta y puesta en marcha progresiva de una arquitectura basada en Clean Architecture, definiendo responsabilidades y lineamientos técnicos para el proyecto.\n • Aporte en decisiones de diseño técnico y arquitectura, trabajando de forma cercana con otros perfiles del equipo.",
        logo: "devecoop.png",
      },
      {
        kind: "work",
        role: "Full Stack Developer",
        company: "Kovix",
        companyInitials: "K",
        period: "Mar. 2022 - Feb. 2024",
        description:
          "• Desarrollo de features end-to-end en aplicaciones orientadas a producto, participando en distintos proyectos y contextos de negocio, incluyendo flujos críticos, tanto en frontend como backend.\n • Desarrollo de interfaces frontend web y mobile y servicios backend, trabajando con distintos stacks según el proyecto e integrando servicios externos y almacenamiento en Amazon S3.\n • Diseño e implementación de componentes de UI y APIs REST, participando en el análisis de requerimientos y diseño técnico, y proponiendo mejoras que se aplicaron en el producto final.",
        logo: "kovix.svg",
      },
      {
        kind: "work",
        role: "Full Stack Developer",
        company: "Ingeray S.R.L.",
        companyInitials: "I",
        period: "Mar. 2019 - Feb. 2022",
        description:
          "• Diseño y desarrollo end-to-end de aplicaciones web, incluyendo una app interna de gestión que sigue en uso y centraliza información de facturación y seguimiento de proyectos, con impacto directo en la organización del trabajo y los procesos internos.\n • Desarrollo de una aplicación web para usuarios finales que permite reportar fallas en equipos mediante códigos QR, mejorando la eficiencia y trazabilidad de los reportes.\n • Desarrollo y mantenimiento de funcionalidades frontend y backend, además del sitio web institucional de la empresa, participando en el relevamiento de requerimientos, diseño de soluciones y entrega de features completas.",
        logo: "ingeray.svg",
      },
      {
        kind: "education",
        role: "Ingenieria en Sistemas de Informacion",
        company: "Universidad Tecnologica Nacional (UTN - FRBA)",
        companyInitials: "U",
        period: "2016 - 2024",
        status: "Carrera finalizada",
        description:
          "Formacion de grado orientada a ingenieria de software, análisis de sistemas, arquitectura y gestión de proyectos tecnológicos.",
        logo: "utn.jpg",
      },
      {
        kind: "education",
        role: "Profesor Ayudante",
        company: "Universidad Tecnologica Nacional (UTN - FRBA)",
        companyInitials: "U",
        period: "2019 - 2022",
        description:
          "Participación como profesor ayudante en de la materia 'Paradigmas de Programación', acompañando clases, resolviendo consultas y colaborando con el seguimiento de estudiantes.",
        logo: "utn.jpg",
      },
    ],
  },
  technologies: {
    title: "Tecnologías",
    levels: {
      basic: "Básico",
      intermediate: "Intermedio",
      advanced: "Avanzado",
    },
  },
  contact: {
    eyebrow: "¡Hablemos!",
    title: "¿Te interesa mi trabajo?",
    line1: "Coordinemos una llamada y comentame la propuesta.",
    line2:
      "Estoy abierto a nuevas oportunidades y desafíos técnicos en proyectos con impacto real.",
    cta: "Armemos una reunión!",
  },
  footer: {
    rightsReserved: "Todos los derechos reservados.",
    authorship: "Sitio diseñado y desarrollado por mí.",
  },
};
