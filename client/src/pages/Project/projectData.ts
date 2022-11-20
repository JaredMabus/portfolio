import CodeQuiz from "../../assets/images/CodeQuiz.svg";
import EmployeeCMS from "../../assets/images/EmployeeCMS.svg";
import JATE from "../../assets/images/JATE.svg";
import SocialNetwork from "../../assets/images/SocialNetwork.svg";
// import WeatherApp from "../../assets/images/WeatherApp.svg";
import NoteTaker from "../../assets/images/NoteTaker.svg";
import FindingFido from "../../assets/images/FindingFido.svg";

export interface ProjectData {
  id: number;
  title: string;
  desc: string;
  url: string;
  githubUrl: string | null;
  designUrl: string | null;
  docUrl: null;
  img: any;
  techStack: string[] | [];
}

export const projectData: ProjectData[] = [
  {
    id: 1,
    title: "Finding Fido",
    desc: "Finding Fido is a web application that utilizes the Petfinder API.",
    url: "https://hoffh-5334.github.io/finding-fido/",
    githubUrl: "https://github.com/hoffh-5334/finding-fido",
    designUrl: null,
    docUrl: null,
    img: FindingFido,
    techStack: [],
  },
  {
    id: 2,
    title: "Code Quiz",
    desc: "This project is a code quiz webpage.",
    techStack: [],
    url: "https://jaredmabus.github.io/code-quiz/",
    githubUrl: "https://github.com/JaredMabus/code-quiz",
    designUrl: null,
    docUrl: null,
    img: CodeQuiz,
  },
  {
    id: 3,
    title: "PWA Text Editor",
    desc: "Just Another Text Editor (JATE) is a Progressive Web App where the user can edit a text like file within the browser.",
    techStack: [],
    url: "",
    githubUrl: "https://github.com/JaredMabus/pwa-text-editor",
    designUrl: null,
    docUrl: null,
    img: JATE,
  },
  {
    id: 4,
    title: "Social Network",
    desc: "The social network API application allows users to create an account, add friends, post their thoughts, and share reactions to other user's thoughts.",
    techStack: [],
    url: "",
    githubUrl: "https://github.com/JaredMabus/social-network",
    designUrl: null,
    docUrl: null,
    img: SocialNetwork,
  },
  {
    id: 5,
    title: "Note Taker App",
    desc: "This is a note taking app that uses a node express backend. It allows the user to create, save, and delete their notes.",
    techStack: [],
    url: "",
    githubUrl: "https://github.com/JaredMabus/note-taker",
    designUrl: null,
    docUrl: null,
    img: NoteTaker,
  },
  {
    id: 6,
    title: "Employee CMS",
    desc: "The Employee Tracker is a Node commandline Content Management System (CMS) designed to perform CRUD operations on a MySQL database.",
    techStack: [],
    url: "https://drive.google.com/file/d/12e9tAMqjX3jBSh-r9TSmuSXCx9sTQVOc/view",
    githubUrl: "https://github.com/JaredMabus/employee-tracker",
    designUrl: null,
    docUrl: null,
    img: EmployeeCMS,
  },
];
