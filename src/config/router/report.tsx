import { RouteObject } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import ElectronicMail from "@pages/Report/ElectronicMail";
import TransactionLog from "@pages/Report/TransactionLog";

const report: RouteObject[] = [
  {
    element: <MainLayout />,
    path: "/report",
    children: [
      {
        path: "transaction-log",
        element: <TransactionLog />,
      },
      {
        path: "electronic-mail",
        element: <ElectronicMail />,
      },
    ],
  },
];

export default report;