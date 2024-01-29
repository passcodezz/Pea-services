import { RouteObject } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import Template from "@pages/Template";
import CreateTemplate from "@pages/Template/CreateTemplate";
import EditTemplate from "@pages/Template/EditTemplate";

const template: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "template",
        element: <Template />,
      },
      {
        path: "create-template",
        element: <CreateTemplate />,
      },
      {
        path: "edit-template",
        element: <EditTemplate />,
      },
    ],
  },
];

export default template;
