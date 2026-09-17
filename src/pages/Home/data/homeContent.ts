import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import specialtyKpiData from "./specialtyKpiData.json";

export const pillars = [
  {
    icon: CodeOutlinedIcon,
    title: "Full-Stack Engineering",
    description:
      "Developing resilient client-server architectures with React, TypeScript, Node/Express, and modern REST APIs designed for scale.",
    tags: ["React 18", "TypeScript", "Node.js", "Express", "REST APIs"],
    dimensions: ["Frontend Arch", "Backend APIs"],
  },
  {
    icon: BarChartOutlinedIcon,
    title: "Data & Visual Analytics",
    description:
      "Transforming complex, multidimensional datasets into interactive dashboards, custom chart components, and actionable intelligence.",
    tags: ["Data Viz", "SQL", "Python", "ETL Pipelines", "BI Solutions"],
    dimensions: ["Data & SQL", "Data Viz"],
  },
  {
    icon: DesignServicesOutlinedIcon,
    title: "UI/UX & Design Systems",
    description:
      "Crafting cohesive Material 3 design tokens, fluid micro-interactions, responsive layouts, and accessible component libraries.",
    tags: ["Material 3", "Responsive UI", "Micro-animations", "Figma"],
    dimensions: ["Design Systems", "UI Motion"],
  },
];

export const specialtyRadarData = specialtyKpiData.radar.data;
export const specialtySeriesKeys = specialtyKpiData.domains.map(
  (domain) => domain.key
);

export const highlights = [
  { label: "3+ Years Experience", icon: AutoAwesomeOutlinedIcon },
  { label: "Full-Stack Web Dev Bootcamp", icon: SchoolOutlinedIcon },
];

export { specialtyKpiData };
