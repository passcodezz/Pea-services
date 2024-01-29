import { Keys } from "@constants/keys";
import localStorageUtil from "@utils/local-storage.util";
import { Navigate } from "react-router-dom";

const NotMatch = () => {
  const token = localStorageUtil.getItem(
    Keys.TOKEN_KEY.key,
    Keys.TOKEN_KEY.cryptoKey
  );
  if (token) return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
};

export default NotMatch;
