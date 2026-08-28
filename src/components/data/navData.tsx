import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

export interface NavDataType {
  id: number;
  name: string;
  url: string;
  icon?: any;
}

export const navData: NavDataType[] = [
  {
    id: 0,
    name: "About Me",
    url: "/",
    icon: <AccountBoxOutlinedIcon />,
  },
  {
    id: 1,
    name: "Projects",
    url: "/projects",
    icon: <DesignServicesOutlinedIcon />,
  },
  {
    id: 2,
    name: "Resume",
    url: "/resume",
    icon: <ArticleOutlinedIcon />,
  },
  {
    id: 3,
    name: "Data",
    url: "/data",
    icon: <BarChartOutlinedIcon />,
  },
];
