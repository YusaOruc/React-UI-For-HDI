import { ReactNode } from "react";
import Survey from "../views/survey/Survey";
import Report from "../views/report/Report";
import { Home, People } from "@mui/icons-material";
import FillSurvey from "../views/fillSurvey/FillSurvey";
import User from "../views/user/User";
interface IRoute {
  id: number;
  name: string;
  path: string;
  icon?: ReactNode;
  page: ReactNode;
  role: RoleEnum;
}

enum RoleEnum {
  Anketor = "Anketor",
  StandardUser = "StandardUser",
  Reporting = "Reporting",
}
const navbarRoutes: IRoute[] = [
  {
    id: 1,
    name: "Anketler",
    path: "/survey",
    icon: <Home />,
    page: <Survey />,
    role: RoleEnum.Anketor,
  },
  {
    id: 2,
    name: "Raporlar",
    path: "/report",
    icon: <People />,
    page: <Report />,
    role: RoleEnum.Reporting,
  },
  {
    id: 3,
    name: "Ankete Katıl",
    path: "/fillSurvey",
    icon: <Home />,
    page: <FillSurvey />,
    role: RoleEnum.Anketor,
  },
  {
    id: 4,
    name: "Kullanıcı Tanımla",
    path: "/user",
    icon: <Home />,
    page: <User />,
    role: RoleEnum.Anketor,
  },
];

export function useRoutePermissionCheck() {
  const role = sessionStorage.getItem("role");
  var routes = navbarRoutes.filter((t) => t.role === role);
  return routes;
}
