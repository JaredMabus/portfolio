import React from "react";

// ICONS
import { FaReact, FaNodeJs, FaChrome } from "react-icons/fa";
import {
  SiMongodb,
  SiTypescript,
  SiRedux,
  SiExpress,
  SiFastapi,
} from "react-icons/si";

// APP ICONS
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import ColorizeRoundedIcon from "@mui/icons-material/ColorizeRounded";

// PROJECT IMAGES
import HeroSection from "@/assets/images/projects/workout-app/hero-section.svg";
import RoutineBuilderImg from "@/assets/images/projects/workout-app/routine-builder.jpg";
import WorkoutAnalyticsImg from "@/assets/images/projects/workout-app/workout-analytics.jpg";
import M3InterfaceImg from "@/assets/images/projects/workout-app/m3-interface.jpg";
import SoundKlipsImg from "@/assets/images/projects/soundklips/soundklips.png";
import LyriksImg from "@/assets/images/projects/lyriks/lyriks-preview.jpg";
import ColorPickerImg from "@/assets/images/projects/color-picker/color-picker-preview.jpg";

export type ProjectCategory = "All" | "Full-Stack" | "Web App" | "Developer Tool";
export type ProjectStatus = "Live" | "In Development" | "Open Source";

export interface TechItem {
  name: string;
  icon?: React.ElementType;
}

export interface GalleryItem {
  title: string;
  tag?: string;
  image: string;
}

export interface ProjectData {
  id: number;
  title: string;
  subtitle?: string;
  desc: string;
  category: "Full-Stack" | "Web App" | "Developer Tool";
  status: ProjectStatus;
  featured?: boolean;
  highlights?: string[];
  url: string;
  githubUrl: string | null;
  designUrl: string | null;
  docUrl: string | null;
  img: string;
  icon?: React.ElementType;
  techStack: TechItem[];
  gallery?: GalleryItem[];
}

export const projectData: ProjectData[] = [
  {
    id: 1,
    title: "liftx",
    icon: FitnessCenterOutlinedIcon,
    subtitle: "Strength Training & Fitness Application",
    desc: "Single-page strength training and fitness application providing progressive overload tracking, customizable routine planning, and workout metric visualizations.",
    category: "Full-Stack",
    status: "Live",
    featured: true,
    highlights: [
      "Dynamic routine builder with set, rep, cadence, and volume tracking",
      "Interactive data visualizations for muscle split frequency and progression",
      "Responsive M3 interface with real-time state synchronization",
    ],
    techStack: [
      { name: "React", icon: FaReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Node.js", icon: FaNodeJs },
      { name: "MongoDB", icon: SiMongodb },
    ],
    url: "http://liftx.tech",
    githubUrl: "https://github.com/JaredMabus/workout-app",
    designUrl:
      "https://www.figma.com/file/gI9GyUSB9m8SmKCgO88ykB/workout-app?type=design&node-id=2919%3A2781&t=ELC1aTzAyshfiuQs-1",
    docUrl: null,
    img: HeroSection,
    gallery: [
      {
        title: "Dynamic Routine Builder",
        tag: "Routine Builder",
        image: RoutineBuilderImg,
      },
      {
        title: "Workout Data Visualizations",
        tag: "Analytics & Split Frequency",
        image: WorkoutAnalyticsImg,
      },
      {
        title: "Responsive Material 3 UI",
        tag: "Live Sync & Dashboard",
        image: M3InterfaceImg,
      },
    ],
  },
  {
    id: 2,
    title: "SoundKlips",
    icon: GraphicEqRoundedIcon,
    subtitle: "Audio Clip & Sample Sharing Platform",
    desc: "Full-stack audio sharing platform for music creators and sound designers to upload, tag, stream, and discover audio snippets with waveform audio player integration.",
    category: "Full-Stack",
    status: "Live",
    highlights: [
      "Custom waveform visualizer and audio playback controls",
      "Tag-based audio discovery with categorization and filtering",
      "RESTful API architecture handling media streaming and storage",
    ],
    techStack: [
      { name: "React", icon: FaReact },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
    ],
    url: "https://github.com/JaredMabus/soundklips",
    githubUrl: "https://github.com/JaredMabus/soundklips",
    designUrl: null,
    docUrl: null,
    img: SoundKlipsImg,
  },
  {
    id: 3,
    title: "Lyriks",
    icon: LibraryMusicRoundedIcon,
    subtitle: "Music & Lyric Exploration Platform",
    desc: "Sleek music discovery application enabling listeners to search tracks, explore synchronized artist lyrics, and preview trending releases across multiple genres.",
    category: "Web App",
    status: "Live",
    highlights: [
      "Synchronized real-time lyric display alongside audio streams",
      "Genre exploration and artist spotlight search engine",
      "Redux global state management for persistent audio queue",
    ],
    techStack: [
      { name: "React", icon: FaReact },
      { name: "Redux", icon: SiRedux },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Node.js", icon: FaNodeJs },
    ],
    url: "https://github.com/JaredMabus/lyriks",
    githubUrl: "https://github.com/JaredMabus/lyriks",
    designUrl: null,
    docUrl: null,
    img: LyriksImg,
  },
  {
    id: 4,
    title: "Screen Color Picker",
    icon: ColorizeRoundedIcon,
    subtitle: "Dev-Mode Eyedropper & Palette Tool",
    desc: "Lightweight developer browser extension for sampling on-screen color values with a pixel-magnification loupe, palette history, and instant HEX/RGB/HSL clipboard copying.",
    category: "Developer Tool",
    status: "Live",
    highlights: [
      "Pixel-level zoom loupe using native browser screen capture APIs",
      "Multi-format copying with automatic HEX, RGB, and HSL conversions",
      "WCAG color contrast ratio checker for accessible UI design",
    ],
    techStack: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Chrome API", icon: FaChrome },
      { name: "Canvas API", icon: FaChrome },
      { name: "React", icon: FaReact },
    ],
    url: "https://github.com/JaredMabus/color-picker-chrome-ext",
    githubUrl: "https://github.com/JaredMabus/color-picker-chrome-ext",
    designUrl: null,
    docUrl: null,
    img: ColorPickerImg,
  },
];
