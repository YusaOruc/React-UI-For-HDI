import { ReactNode } from "react";
import Survey from "../views/survey/Survey";
import { Home, People } from "@mui/icons-material";
import FillSurvey from "../views/fillSurvey/FillSurvey";
import User from "../views/user/User";
import UserSurveyResult from "../views/userSurveyResult/UserSurveyResult";
interface IRoute {
  id: number;
  name: string;
  path: string;
  icon?: ReactNode;
  page: ReactNode;
  role: RoleEnum;
}

export enum RoleEnum {
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
    name: "Kullanıcı Tanımla",
    path: "/user",
    icon: <Home />,
    page: <User />,
    role: RoleEnum.Anketor,
  },
  {
    id: 3,
    name: "Ankete Katıl",
    path: "/fillSurvey",
    icon: <Home />,
    page: <FillSurvey />,
    role: RoleEnum.StandardUser,
  },
  {
    id: 4,
    name: "Kullanıcı Anket Sonuçları",
    path: "/userSurveyResult",
    icon: <Home />,
    page: <UserSurveyResult />,
    role: RoleEnum.Reporting,
  },
];

export function useRoutePermissionCheck() {
  const role = sessionStorage.getItem("role");
  var routes = navbarRoutes.filter((t) => t.role === role);
  return routes;
}
