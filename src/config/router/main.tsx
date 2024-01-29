import { Navigate, RouteObject } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import MainLayout from "@layouts/MainLayout";
import Dashboard from "@pages/Dashboard";
import ResetPassword from "@pages/ResetPassword";
import SetPassword from "@pages/SetPassword";
import SuccessPassword from "@pages/SuccessPassword";
import ApiKey from "@pages/ApiKey";

const main: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/setpassword",
    element: <SetPassword />,
  },
  {
    path: "/success-password",
    element: <SuccessPassword />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "api-key",
        element: <ApiKey />,
      },
    ],
  },
];

export default main;
