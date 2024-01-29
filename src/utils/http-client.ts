/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import localStorageUtil from "./local-storage.util";
import { checkError } from "./axios-base-query";
import { Keys } from "@constants/keys";

const defaultHeader: any = {};
const httpClient = axios.create();
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    checkError(error?.response);
    return Promise.reject(error);
  }
);
httpClient.interceptors.request.use(async (config) => {
  const token = localStorageUtil.getItem(
    Keys.TOKEN_KEY.key,
    Keys.TOKEN_KEY.cryptoKey
  );
  if (token) {
    defaultHeader["Authorization"] = `Bearer ${token}`;
  }
  config.headers = {
    "Content-Type": "application/json",
    ...defaultHeader,
    ...config.headers,
  };
  return config;
});
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default httpClient;
