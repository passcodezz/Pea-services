import { Keys } from "@constants/keys";
import localStorageUtil from "./local-storage.util";

export const getToken = () => {
  return localStorageUtil.getItem(Keys.TOKEN_KEY.key, Keys.TOKEN_KEY.cryptoKey);
};

export const setToken = (data: string) => {
  return localStorageUtil.setItem(
    Keys.TOKEN_KEY.key,
    Keys.TOKEN_KEY.cryptoKey,
    data
  );
};

export const setUser = (data: string) => {
  return localStorageUtil.setItem(
    Keys.USERNAME_KEY.key,
    Keys.USERNAME_KEY.cryptoKey,
    data
  );
};
export const getUser = () => {
  return localStorageUtil.getItem(
    Keys.USERNAME_KEY.key,
    Keys.USERNAME_KEY.cryptoKey
  );
};

export const removeUser = () => {
  return localStorage.removeItem(Keys.USERNAME_KEY.key);
};
