import Dashboard from "../pages/dashboard";
import Login from "../pages/login";

export const app_routes = [
  {
    path: "/login",
    onLogged: false,
    universal: false,
    fallback: "/",
    Component: Login,
    exact: true,
  },
  {
    path: "/",
    onLogged: true,
    universal: false,
    fallback: "/login",
    Component: Dashboard,
    exact: false,
  },
];