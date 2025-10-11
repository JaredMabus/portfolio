import React from "react";

// ICONS
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiMongodb, SiMysql, SiPostgresql, SiTypescript } from "react-icons/si";
// PROJECT IMAGES
import LifterIcon from "@/assets/images/projects/workout-app/LifterIcon.svg";
import HeroSection from "@/assets/images/projects/workout-app/hero-section.svg";
import LiftIconText from "@/assets/images/projects/workout-app/LiftIconText.svg";

export interface ProjectData {
  id: number;
  title: string;
  desc: string;
  url: string;
  githubUrl: string | null;
  designUrl: string | null;
  docUrl: null;
  img: any;
  titleImg?: any;
  techStack: React.ElementType[];
  icon?: string | null;
}

export const projectData: ProjectData[] = [
  {
    id: 1,
    title: "Workout App",
    desc: "Single-page weight lifting app providing the ability to track progress, plan a routine, and get insight into workout patterns and metrics",
    techStack: [FaReact, FaNodeJs, SiMongodb, SiTypescript],
    url: "http://liftx.tech",
    githubUrl: "https://github.com/JaredMabus/workout-app",
    designUrl:
      "https://www.figma.com/file/gI9GyUSB9m8SmKCgO88ykB/workout-app?type=design&node-id=2919%3A2781&t=ELC1aTzAyshfiuQs-1",
    docUrl: null,
    img: HeroSection,
    titleImg: LiftIconText,
    icon: LifterIcon,
  },
  {
    id: 2,
    title: "Workout App",
    desc: "Single-page weight lifting app providing the ability to track progress, plan a routine, and get insight into workout patterns and metrics",
    techStack: [FaReact, FaNodeJs, SiMongodb, SiTypescript],
    url: "http://liftx.tech",
    githubUrl: "https://github.com/JaredMabus/workout-app",
    designUrl:
      "https://www.figma.com/file/gI9GyUSB9m8SmKCgO88ykB/workout-app?type=design&node-id=2919%3A2781&t=ELC1aTzAyshfiuQs-1",
    docUrl: null,
    img: HeroSection,
    titleImg: LiftIconText,
    icon: LifterIcon,
  },
];
