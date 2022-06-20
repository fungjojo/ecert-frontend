import App from "../App";
import { AccountType } from "../dataModel/constants";
import HomePage from "../screen/homePage";
import LoginPage from "../screen/loginPage";
import VerifyPage from "../screen/verifyPage";

export interface routeProps {
  path: string;
  element: any;
}

const PATH = {
  root: "/",
  login: "/login",
  home: "/home",
  verify: "/verify",
};

const getNavRoutes = () => {
  const routeList = [
    { path: PATH.root, element: App },
    { path: PATH.login, element: LoginPage },
    { path: PATH.home, element: HomePage },
    { path: PATH.verify, element: VerifyPage },
  ];
  return routeList;
};

const getNavRouteByAccountType = (accountType: string) => {
  switch (accountType) {
    case AccountType.company:
      return PATH.verify;
    case AccountType.uni:
      return PATH.home;
    default:
      // return PATH.home;
      return PATH.verify;
  }
};

const getNavRouteByLoginState = (isLoggedIn: boolean, accountType: string) => {
  if (!isLoggedIn) {
    return PATH.login;
  }

  return getNavRouteByAccountType(accountType);
};

export {
  PATH,
  getNavRoutes,
  getNavRouteByAccountType,
  getNavRouteByLoginState,
};
