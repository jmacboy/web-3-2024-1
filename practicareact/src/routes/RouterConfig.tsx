import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ClientList from "../pages/ClientList";
import ClientForm from "../pages/ClientForm";
import { Routes } from "./CONSTANTS";

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
  ]);