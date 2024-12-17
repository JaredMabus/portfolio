
export interface NavDataType {
    id: number;
    name: string;
    url: string;
}



export const navData: NavDataType[] = [
    {
        id: 0,
        name: "About Me",
        url: "/",
    },
    {
        id: 1,
        name: "Projects",
        url: "/projects",
    },
    // {
    //     id: 2,
    //     name: "Contact",
    //     url: "/contact",
    // },
    {
        id: 3,
        name: "Resume",
        url: "/resume",
    },
]