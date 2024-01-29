import { createBrowserRouter } from "react-router-dom";
import main from "./main";
import users from "./users";
import template from "./template";
import report from "./report";
export const routeObject = [...main, ...users, ...template, ...report];
const router = createBrowserRouter(routeObject);
export default router;
