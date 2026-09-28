# **Jared's Portfolio**

Welcome to my portfolio repository! I am a **Full-Stack Developer** and **Data Analyst** with experience building dynamic and responsive web applications using modern technologies. Below you’ll find projects, tools, and skills that reflect my ability to deliver creative, technical solutions.

## **About Me**

- 🎓 **Full Stack Web Development Certificate** from the **University of Minnesota Coding Bootcamp**.
- 📊 Three years of experience in **data analysis** and **business intelligence**.
- 💻 Proficient in both front-end and back-end development with a focus on building scalable, well-documented applications.
- 🚀 I enjoy learning and implementing new technologies, continuously improving my skills through personal projects.

## **Skills**

Here are the tools and technologies I use to bring projects to life:

- **Languages**: JavaScript (Node.js, React, TypeScript), Python (Flask).
- **Frameworks/Libraries**: Express, Redux, Jest, Sequelize, Mongoose, SQLAlchemy.
- **Databases**: MySQL, PostgreSQL, MongoDB.
- **Tools**: Docker, Git, NGINX, AWS, GCP.
- **UI/UX**: Figma, Material UI, styled-components.
- **Data Analysis**: Power BI, Tableau, Excel, Pandas.

## **Development**

This project now uses [Vite](https://vitejs.dev/) with TypeScript and Yarn for a faster developer experience.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer is recommended)
- [Yarn](https://yarnpkg.com/) (Classic)

### Installation

```bash
yarn install
```

### Available Scripts

- `yarn dev` – Start the development server with hot module replacement.
- `yarn build` – Type-check and generate an optimized production build.
- `yarn preview` – Preview the production build locally.
- `yarn test` – Run unit tests with Vitest and Testing Library.
- `yarn deploy` – Build the project and deploy it directly to GitHub Pages (`jaredmabusth.me`).

### Styling ownership

Application code consumes `themeLight` and `themeDark` from `src/styles/theme.ts`.
Keep shared appearance in the theme and use component `sx` for local layout and deliberate exceptions.

| Change | Owner in `src/styles/` |
| --- | --- |
| Brand seeds, neutral ramps, state opacities | `theme.tokens.ts` |
| Semantic light/dark color generation | `theme.colors.ts` |
| MUI palette mapping | `theme.palette.ts` |
| Typography, breakpoints, shape | `theme.base.ts` |
| Component defaults, variants, and mode differences | `theme.components.ts` |
| Page resets, body colors, scrollbars, CSS variables | `theme.global-styles.ts` |
| Chart palette generation and CSS-token mapping | `theme.charts.ts` |

`components/bklit/theme.ts` provides the React hook and compatibility exports for chart consumers; it does not generate another palette. Chart cards and tooltips use the chart palette's explicit background roles.

---

Thank you for visiting my portfolio repository! Feel free to explore the projects and provide feedback or reach out with questions. Let’s build something amazing together.
