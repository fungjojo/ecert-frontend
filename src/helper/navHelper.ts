import App from "../App";
import { AccountType } from "../dataModel/constants";
import HomePage from "../screen/homePage";
import LoginPage from "../screen/loginPage";
import VerifyPage from "../screen/verifyPage";

export interface routeProps {
  path: string;
  element: any;
}

const getNavRoutes = () => {
  const routeList = [
    { path: "/", element: App },
    { path: "/login", element: LoginPage },
    { path: "/home", element: HomePage },
    { path: "/verify", element: VerifyPage },
  ];
  return routeList;
};

const getNavRouteByAccountType = (accountType: string) => {
  switch (accountType) {
    case AccountType.company:
      return "/verify";
    case AccountType.uni:
      return "/home";
    default:
      return "/home";
  }
};

export { getNavRoutes, getNavRouteByAccountType };
