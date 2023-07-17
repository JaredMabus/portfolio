import CodeQuiz from "../../assets/images/CodeQuiz.svg";
import EmployeeCMS from "../../assets/images/EmployeeCMS.svg";
import JATE from "../../assets/images/JATE.svg";
import SocialNetwork from "../../assets/images/SocialNetwork.svg";
import NoteTaker from "../../assets/images/NoteTaker.svg";
import FindingFido from "../../assets/images/FindingFido.svg";
import WorkoutApp from "../../assets/images/workoutApp.svg";
import soundklipsImage from "../../assets/images/soundklips.png";
// ICONS
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiMongodb, SiMysql, SiPostgresql, SiTypescript } from "react-icons/si";
// PROJECT ICONS
import LifterIcon from "../../assets/images/LifterIcon.svg";
import React from "react";
import HeroSection from "../../assets/images/hero-section.svg";
import LiftIconText from "../../assets/images/LiftIconText.svg";

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
  techStack: string[] | [] | React.FC[];
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
    title: "Soundklips",
    desc: "Single-page audio sample sharing and management website. This project aims to provide a platform to find and share audio files.",
    techStack: [FaReact, FaPython, SiPostgresql],
    url: "",
    githubUrl: "https://github.com/JaredMabus/soundklips-proj",
    designUrl: null,
    docUrl: null,
    img: soundklipsImage,
  },
  // {
  //   id: 3,
  //   title: "PWA Text Editor",
  //   desc: "Just Another Text Editor (JATE) is a Progressive Web App where the user can edit a text like file within the browser.",
  //   techStack: [],
  //   url: "",
  //   githubUrl: "https://github.com/JaredMabus/pwa-text-editor",
  //   designUrl: null,
  //   docUrl: null,
  //   img: JATE,
  // },
  // {
  //   id: 4,
  //   title: "Social Network",
  //   desc: "The social network API application allows users to create an account, add friends, post their thoughts, and share reactions to other user's thoughts.",
  //   techStack: [],
  //   url: "",
  //   githubUrl: "https://github.com/JaredMabus/social-network",
  //   designUrl: null,
  //   docUrl: null,
  //   img: SocialNetwork,
  // },
  // {
  //   id: 5,
  //   title: "Note Taker App",
  //   desc: "This is a note taking app that uses a node express backend. It allows the user to create, save, and delete their notes.",
  //   techStack: [],
  //   url: "",
  //   githubUrl: "https://github.com/JaredMabus/note-taker",
  //   designUrl: null,
  //   docUrl: null,
  //   img: NoteTaker,
  // },
  // {
  //   id: 6,
  //   title: "Employee CMS",
  //   desc: "The Employee Tracker is a Node commandline Content Management System (CMS) designed to perform CRUD operations on a MySQL database.",
  //   techStack: [],
  //   url: "https://drive.google.com/file/d/12e9tAMqjX3jBSh-r9TSmuSXCx9sTQVOc/view",
  //   githubUrl: "https://github.com/JaredMabus/employee-tracker",
  //   designUrl: null,
  //   docUrl: null,
  //   img: EmployeeCMS,
  // },
];
