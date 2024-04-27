import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ClientList from "../pages/clients/ClientList";
import ClientForm from "../pages/clients/ClientForm";
import { Routes } from "./CONSTANTS";
import LoginForm from "../pages/auth/LoginForm";

export const routerConfig = createBrowserRouter([
    {
      path: Routes.HOME,
      element: <HomePage/>,
    },
    {
      path: Routes.CLIENTS.LIST,
      element: <ClientList/>,
    },
    {
      path: Routes.CLIENTS.CREATE,
      element: <ClientForm/>,
    },
    {
      path: Routes.CLIENTS.EDIT,
      element: <ClientForm/>,
    },
    {
      path: Routes.AUTH.LOGIN,
      element: <LoginForm/>,
    },
  ]);