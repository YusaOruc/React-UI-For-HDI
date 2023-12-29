import { ReactNode } from "react";
import Survey from "../views/survey/Survey";
import Report from "../views/report/Report";
import { Home, People } from "@mui/icons-material";
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
  Report = "Report",
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
    role: RoleEnum.Report,
  },
];

export function useRoutePermissionCheck() {
  const role = sessionStorage.getItem("role");
  var routes = navbarRoutes.filter((t) => t.role === role);
  return routes;
}
