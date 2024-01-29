import { Navigate, RouteObject } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import UsersList from "@pages/Users/UsersList";
import Profile from "@pages/Users/Profile";
const users: RouteObject[] = [
  {
    element: <MainLayout />,
    path: "/users",
    children: [
      {
        path: "",
        element: <Navigate to="list" />,
      },
      {
        path: "list",
        element: <UsersList />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

export default users;
