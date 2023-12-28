import { ReactNode } from "react";
import Survey from "../views/survey/Survey";
import Report from "../views/report/Report";
import {
    Home,
    People,
  } from "@mui/icons-material";
interface IRoute {
    id: number;
    name: string;
    path: string;
    icon?: ReactNode;
    page: ReactNode;
  }

export const navbarRoutes: IRoute[] = [
    {
      id: 1,
      name: "Anketler",
      path: "/survey",
      icon: <Home />,
      page: <Survey />,
    },
    {
      id: 2,
      name: "Raporlar",
      path: "/report",
      icon: <People />,
      page: <Report />,
    },
  ];