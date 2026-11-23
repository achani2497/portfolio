# AGENTS.md — Portfolio

Personal developer portfolio for **Alejandro Ismael Chañi**, built with Astro, React, and Tailwind CSS. Deployed on Vercel.

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Framework      | Astro 6                           |
| UI (islands)   | React 19 + React DOM 19           |
| Styling        | Tailwind CSS 4 (Vite plugin)      |
| Language       | TypeScript (strict)               |
| Icons          | lucide-react, simple-icons        |
| Analytics      | @vercel/analytics                 |
| Formatting     | Prettier + astro + tailwindcss plugins |
| Package manager| pnpm 11                           |
| Node           | >= 22.12.0                        |

## Folder Structure

```
/
├── public/          # Static assets (favicons, PWA icons, logos, flags)
├── src/
│   ├── assets/      # SVGs and images imported in components
│   ├── components/
│   │   ├── chat/        # React island components (*.tsx)
│   │   ├── consts/      # Icon mapping constants
│   │   ├── experience/  # Experience section sub-components
│   │   ├── layouts/     # Structural layout pieces (Sidebar, Footer, Wave)
│   │   ├── sections/    # Full-page sections (Intro, Experience, Technologies, Contact)
│   │   └── ui/          # Reusable UI atoms (Icon, Switch, LanguageSwitch, etc.)
│   ├── config/      # Site config, navigation
│   ├── data/        # Typed data modules (experiences, technologies)
│   ├── i18n/        # Locale dictionaries per section (en + es)
│   ├── layouts/     # Root Layout.astro
│   ├── pages/       # Routes (single index.astro)
│   ├── styles/      # Global CSS + Tailwind directives
│   ├── types/       # Shared TypeScript types (chat, etc.)
│   └── utils/       # Icon resolver, scroll-spy, fade-in, locale detection
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Key Conventions

### File types by purpose
- **`.astro`** — Static/server-rendered components. Most of the UI.
- **`.tsx`** — React islands for interactive client components (chat only).
- **`.ts`** — Pure TypeScript: data, config, utils, i18n dictionaries.

### Naming
- Components: `PascalCase.astro` / `PascalCase.tsx`
- Data, config, utils: `camelCase.ts`
- i18n section files: `camelCase.ts` (e.g., `intro.ts`, `sidebar.ts`)

### Imports
- Relative imports only (`../components/...`). No path aliases.

### Exports
- Add `export` only when another file imports the symbol. Types, constants and helpers used only inside their own file stay private.
- Reusable helpers live in their own file under the module's `lib/` (or `src/utils/`) with a single purpose. Never export a helper from a hook file.

### Readability
- Prefer flat code: early returns and small named predicates over nested conditionals.
- A function must be understandable on one read by someone unfamiliar with the project. No cleverness for its own sake.

### Commits
- Conventional commits with one concise subject line.
- No bullet lists in the commit message body.

### Package manager
- pnpm only. Do not use npm or yarn; `package-lock.json` and `yarn.lock` are not tracked.

### TypeScript
- Strict mode (`astro/tsconfigs/strict`).
- `as const` on constant objects, `satisfies` for type-safe arrays.
- Explicit return types on exported functions.

## Design Tokens

Colors are defined as CSS custom properties in `src/styles/global.css` and mapped to Tailwind utility classes in `tailwind.config.js` via `var(--color-*)` references. No hardcoded colors in components — always use the token classes (`text-primary`, `bg-surface`, `lilac-500`, etc.).

## i18n

Two locales: `en` (default), `es`. Each locale has its own dictionary split by section (intro, experience, technologies, contact, sidebar, footer, meta). Use `getDictionary(locale)` to load, `getDictionarySafe()` for fallback. Language toggle via `LanguageSwitch.astro` with flag SVGs from `public/flags/`.

### Copy & tone
- Chat copy must sound like Moonie: warm, friendly and dog-themed (Moonie represents Luna). ES uses Rioplatense voseo consistently across every chat section.
- Pending tone refinement is tracked in `PROGRESS.md`.

## Commands

| Command              | Action                                   |
| -------------------- | ---------------------------------------- |
| `pnpm install`       | Install dependencies                     |
| `pnpm run dev`       | Dev server at `localhost:4321`           |
| `pnpm run build`     | Production build to `dist/`              |
| `pnpm run preview`   | Preview production build locally         |
| `pnpm run check`     | Astro + TypeScript diagnostics           |
| `pnpm run typecheck` | `tsc --noEmit`                           |
| `pnpm run astro ...` | Astro CLI (add, check, etc.)             |

## Architecture Notes

- **Single-page app** — one route (`/`), sections as scroll targets.
- **Astro-first, React-where-needed** — `.astro` for content, React islands only for interactive chat.
- **No content collections** — data lives in `src/data/` as typed TypeScript modules.
- Sidebar highlights current section via scroll-spy. Sections fade in via Intersection Observer.
