/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@utils/axios-base-query";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.PUBLIC_API_USER,
  }),
  endpoints: (build) => ({
    login: build.mutation<Authen.Response, Authen.Request>({
      query: (data) => {
        const header: Record<string, any> = {};
        const itemBase64 = window.btoa(data?.email + ":" + data?.password);
        header["Authorization"] = `Basic ${itemBase64}`;
        return {
          url: "/user/login",
          method: "post",
          headers: header,
        };
      },
    }),
    getLogout: build.mutation({
      query: () => {
        return {
          url: "/user/logouts",
          method: "get",
        };
      },
    }),
    resetPassword: build.mutation({
      query: (data) => {
        return {
          url: `/user/request-reset`,
          method: "post",
          data,
        };
      },
    }),
    reqPassword: build.query({
      query: (data) => {
        return {
          url: `/user/users/${data}`,
          method: "get",
        };
      },
    }),
    setPassword: build.mutation({
      query: (data) => {
        return {
          url: `/user/set-password`,
          method: "post",
          data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useReqPasswordQuery,
  useSetPasswordMutation,
  useResetPasswordMutation,
  useGetLogoutMutation,
}: any = authApi;
