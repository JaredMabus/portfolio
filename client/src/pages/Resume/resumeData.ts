type ResumeSectionTitleType =
  | "Summary"
  | "Technical Skills"
  | "Professional Experience"
  | "Education";

export interface TechCategoryType {
  category: string;
  items: string[] | [];
}

export interface JobsType {
  employer: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  jobSummary: string;
  content: string[] | [];
}

export interface InstitutionsType {
  name: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ResumeDataType {
  id: number;
  title: ResumeSectionTitleType;
  content?: string | string[] | [];
  jobs?: JobsType[] | [];
  institution?: InstitutionsType[] | [];
  skills?: TechCategoryType[] | [];
}

export const resumeData: ResumeDataType[] = [
  {
    id: 1,
    title: "Summary",
    content:
      "Web developer and data analyst with two years of experience improving and implementing business intelligence solutions. Earned a certificate in Full Stack Web Development from the University of Minnesota Coding Bootcamp. Passionate about building web apps and has proven ability in applying UI design, MVC development, and database management skills to solve business needs.",
  },
  {
    id: 2,
    title: "Technical Skills",
    skills: [
      {
        category: "JavaScript",
        items: [
          "React",
          "Express",
          "Node",
          "TypeScript",
          "Redux",
          "Jest",
          "Mongoose",
          "Sequelize",
        ],
      },
      { category: "Web Development", items: ["HTML", "CSS"] },
      { category: "Python", items: ["SQLAlchemy", "pytest", "poetry"] },
      { category: "UI/Design", items: ["Figma"] },
      { category: "Version Control", items: ["Git"] },
      { category: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"] },
      { category: "Data Visualization", items: ["Power Bi", "Tableau"] },
    ],
  },
  {
    id: 3,
    title: "Professional Experience",
    jobs: [
      {
        employer: "Ameriprise Financial",
        location: "Minneapolis, MN",
        position: "Business Analyst",
        startDate: "10/1/2019",
        endDate: "6/1/2020",
        jobSummary:
          "Contracted with Ameriprise to work on a large department consolidation project and to improve material review workflow processes.",
        content: [
          "Procured web-usage data and designed Excel dashboards to identify web assets with low ROI ",
          "Forecasted future capacity needs by establishing a year-over-year growth rate and workflow KPIs",
          "Developed MS Access application providing a front and back-end solution for department consolidation; greatly reducing material audit time",
          "Collaborated with team leaders to create and standardize process documentation",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Education",
    institution: [
      {
        name: "University of Northern Iowa",
        location: "Cedar Falls, IA",
        degree: "Bachelor of Arts in Economics",
        startDate: "9/1/2016",
        endDate: "12/1/2018",
      },
    ],
  },
];
