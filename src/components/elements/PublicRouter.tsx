import { Keys } from "@constants/keys";
import localStorageUtil from "@utils/local-storage.util";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = () => {
  const token = localStorageUtil.getItem(
    Keys.TOKEN_KEY.key,
    Keys.TOKEN_KEY.cryptoKey
  );
  if (token) {
    return <Navigate to="dashboard" />;
  }
  return <Outlet />;
};

export default PublicRouter;
