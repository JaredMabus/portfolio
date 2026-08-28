# AGENTS.md

Welcome to Jared Mabus's Developer Portfolio & Analytics Showcase repository. This document provides essential context, architectural patterns, command workflows, and guidelines for AI agents working in this codebase.

---

## 1. Project Overview

- **Purpose**: Personal portfolio website highlighting full-stack web development projects, resume/experience, data analytics skills, and contact information.
- **Production URL**: [https://jaredmabusth.me](https://jaredmabusth.me)
- **Primary Tech Stack**:
  - **Core Framework**: React 18 + TypeScript 5
  - **Bundler & Build Tool**: Vite 6
  - **UI / Design System**: Material UI v5 (`@mui/material`), `@mui/icons-material`, Emotion (`@emotion/react`, `@emotion/styled`)
  - **Routing**: React Router v6 (`react-router-dom`)
  - **Animations**: React Spring (`@react-spring/web`)
  - **Testing**: Vitest + React Testing Library (`@testing-library/react`, `jsdom`)
  - **Deployment**: GitHub Pages (`gh-pages`)
  - **Package Manager**: Yarn (v1.22.x Classic)

---

## 2. Essential Commands

All commands should be executed from the repository root using `yarn`:

| Command | Description |
| :--- | :--- |
| `yarn dev` | Starts the Vite development server with HMR on `http://localhost:3000` |
| `yarn build` | Runs TypeScript type-checking (`tsc --noEmit`) and creates an optimized production bundle in `dist/` |
| `yarn preview` | Serves the production build locally for verification |
| `yarn test` | Runs unit test suites using Vitest |
| `yarn deploy` | Builds the project and publishes the `dist/` folder to GitHub Pages |

> **Agent Check**: Always verify changes by running `yarn build` before finishing tasks.

---

## 3. Directory Structure

```text
portfolio/
├── .github/                  # CI/CD and GitHub workflows
├── public/                   # Static public assets (favicon, robots, etc.)
├── src/
│   ├── assets/               # SVGs, icons, illustrations, profile images
│   ├── components/           # Shared global components
│   │   ├── data/             # Shared component data (navData.tsx)
│   │   ├── Header.tsx        # Top navigation header & drawer
│   │   ├── Footer.tsx        # Global footer
│   │   ├── SideNav.tsx       # Desktop / mobile side navigation
│   │   ├── Socials.tsx       # Social media links and icons
│   │   ├── ThemeSwitchBtn.tsx# Light/Dark mode toggle button
│   │   ├── PageContainer.tsx # Page layout wrapper with transitions
│   │   └── Tooltips.tsx      # Tooltip helper components
│   ├── pages/                # Route views
│   │   ├── Contact/          # Contact form view and validation logic
│   │   ├── Home.tsx          # Hero section and introduction
│   │   ├── Project/          # Project showcase grid & cards
│   │   │   ├── components/   # ProjectCard, ProjectGrid
│   │   │   └── data/         # projectData.ts (project list & metadata)
│   │   ├── Resume/           # Resume timeline, skills, and work history
│   │   │   └── data/         # resumeData.ts
│   │   └── index.tsx         # Barrel exports for page components
│   ├── styles/
│   │   └── theme.ts          # Centralized Material 3 (M3) palette & theme definitions
│   ├── types/
│   │   └── mui-palette.d.ts  # MUI Theme/Palette TypeScript module augmentations
│   ├── utils/                # Custom React hooks (useDocumentTitle, useLocalStorage)
│   ├── App.tsx               # Root component, ThemeProvider, ThemeContext, and routing
│   ├── main.tsx              # React DOM entry point
│   ├── setupTests.ts         # Test setup and matchers
│   └── vite-env.d.ts         # Vite client type references
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript root config
├── tsconfig.app.json         # TypeScript application config
└── vite.config.ts            # Vite bundler configuration with `@/` alias
```

---

## 4. Key Architectural & Implementation Patterns

### 4.1 Path Aliases
- `@/*` resolves to `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- Prefer using `@/` for imports across directories (e.g. `import { themeLight } from "@/styles/theme";`).

### 4.2 Material 3 (M3) Theming, Color Tokens & State Layers
- Theming is implemented in `src/styles/theme.ts` and augmented in `src/types/mui-palette.d.ts`.
- It extends standard MUI palettes with full Material 3 tonal palettes and interaction state layers:
  - Tonal steps: `neutral` (`n0`–`n100`), `neutralVariant` (`nv10`–`nv90`).
  - Surface roles: `surface`, `surfaceDim`, `surfaceBright`, `surfaceContainerLowest`, `surfaceContainerLow`, `surfaceContainer`, `surfaceContainerHigh`, `surfaceContainerHighest`, `surfaceContainerGlass`.
  - Roles: `primaryContainer`, `onPrimaryContainer`, `surfaceVariant`, `outline`, `border`, etc.
  - Fixed brand sets: `primaryFixed`, `secondaryFixed`, `tertiaryFixed`, etc.
  - Interactive state layers on all augmented `PaletteColor` tokens: `state.hover`, `state.selected`, `state.focus`, `state.focusVisible`, `state.outlinedBorder`, `state.dragged`, `state.disabled`, `state.disabledBg`.
- Two complete themes are exported: `themeLight` and `themeDark`.
- Global styles (scrollbar styling, typography resets) are provided via `GlobalStyle` in `src/styles/theme.ts`.

### 4.3 Theme State Management
- `ThemeContext` is initialized in `src/App.tsx` providing `{ light: boolean, toggleTheme: () => void }`.
- Persists user theme preference in `localStorage` key `'theme'` (`'light'` vs `'dark'`).
- Respects system preferences via `window.matchMedia('(prefers-color-scheme: light)')` when no stored preference exists.

### 4.4 Data-Driven Content
- Portfolio project cards and resume entries are separated from view components:
  - Projects: `src/pages/Project/data/projectData.ts`
  - Resume & Experience: `src/pages/Resume/data/resumeData.ts`
  - Navigation items: `src/components/data/navData.tsx`
- When updating or adding content, modify the respective data structures rather than hardcoding into JSX.

### 4.5 Routing
- Single Page Application routing is handled by `react-router-dom` in `src/App.tsx`:
  - `/` -> `Home`
  - `/projects` -> `Project`
  - `/resume` -> `Resume`
  - `*` -> Wildcard redirects back to `Home`

---

## 5. Guidelines for AI Agents

1. **Type Safety**: Maintain strict TypeScript adherence. Ensure custom MUI palette extensions in `src/types/mui-palette.d.ts` are respected and updated if adding new theme tokens.
2. **Build Verification**: Run `yarn build` after making modifications to guarantee clean TypeScript compilation and successful Vite bundle creation.
3. **Consistent Styling**: Use Material UI `sx` props, `styled` components, or MUI system tokens referencing `theme.palette`. Avoid hardcoding hex codes when a palette token exists.
4. **Preserve Documentation & Comments**: Maintain existing code comments, docstrings, and license headers.
5. **Mobile Responsiveness**: Ensure all new UI components are responsive across desktop, tablet, and mobile breakpoints using MUI's responsive props (e.g. `xs`, `sm`, `md`, `lg`).
