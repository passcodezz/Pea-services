/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import _ from "lodash";
import localStorageUtil from "./local-storage.util";
import { Keys } from "@constants/keys";
import { NotificationError } from "@elements/Notification";
import AlertUtil from "./alert.util";
type BaseRequestConfig = { url: string };
const BaseHeader = (): AxiosRequestConfig["headers"] => {
  const defaultHeader: Record<string, any> = {};
  const token = localStorageUtil.getItem(
    Keys.TOKEN_KEY.key,
    Keys.TOKEN_KEY.cryptoKey
  );
  if (token) {
    defaultHeader["Authorization"] = `Bearer ${token}`;
  }
  return defaultHeader;
};
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<BaseRequestConfig & AxiosRequestConfig, unknown, unknown> =>
  async ({ url, headers, ...args }) => {
    try {
      const result = await axios({
        ...args,
        url: baseUrl + url,
        headers: {
          "Content-Type": "application/json",
          ...BaseHeader(),
          ...headers,
        },
      });
      return { data: result?.data };
    } catch (axiosError) {
      const { response }: any = axiosError as AxiosError;
      checkError(response);
      return {
        error: {
          status: response?.status,
          data: response?.data || response?.data?.message,
        },
      };
    }
  };

export default axiosBaseQuery;
export function checkError(response: any) {
  // console.log(response);
  if (
    _.get(response, "status") === 401 &&
    (_.get(response, "data.errors[0].code") === "ERR_US_0004" ||
      _.get(response, "data.errors[0].code") === "ERR_MS_0004")
  ) {
    localStorage.clear();
    return AlertUtil.tokenExpire({
      onOk: () => {
        window.location.href = "/login";
      },
    });
  } else if (
    _.get(response, "status") === 401 &&
    (_.get(response, "data.errors[0].code") !== "ERR_US_0004" ||
      _.get(response, "data.errors[0].code") !== "ERR_MS_0004")
  ) {
    const description = response?.data?.errors[0].description;
    NotificationError(description || "กรุณาติดต่อผู้ดูแลระบบ");
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    return response;
  }
  if (_.size(response?.data?.errors)) {
    _.forEach(response?.data?.errors, ({ description }) =>
      NotificationError(description || "เกิดข้อผิดพลาด")
    );
  } else {
    const description = response?.data?.description;
    NotificationError(description || "เกิดข้อผิดพลาด");
  }
}
