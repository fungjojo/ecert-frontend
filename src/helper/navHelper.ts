import App from "../App";
import LoginPage from "../screen/loginPage";

export interface routeProps {
  path: string;
  element: any;
}

const getNavRoutes = () => {
  const routeList = [
    { path: "/", element: App },
    { path: "/login", element: LoginPage },
  ];
  return routeList;
};

export { getNavRoutes };
