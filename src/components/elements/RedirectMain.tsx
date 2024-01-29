import { Keys } from "@constants/keys";
import localStorageUtil from "@utils/local-storage.util";
import { Navigate } from "react-router-dom";

const RedirectMain = () => {
  const token = localStorageUtil.getItem(
    Keys.TOKEN_KEY.key,
    Keys.TOKEN_KEY.cryptoKey
  );
  return <Navigate to={token ? "/dashboard" : "/login"} />;
};

export default RedirectMain;
