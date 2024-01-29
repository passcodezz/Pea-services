/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../utils/axios-base-query";
export const dashboardServiceApi = createApi({
  reducerPath: "dashboardServiceApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.PUBLIC_API_DASHBOARD,
  }),
  endpoints: (build) => ({
    transactionSum: build.mutation({
      query: (data) => ({
        url: "/dashboardservice/transaction/summary",
        method: "post",
        data,
      }),
    }),
    transactionTop5: build.mutation({
      query: (data) => ({
        url: "/dashboardservice/transaction/top5",
        method: "post",
        data,
      }),
    }),
    transactionUsage: build.query({
      query: (data) => ({
        url: "/dashboardservice/transaction/usage",
        method: "get",
        data,
      }),
    }),
    transactionYear: build.mutation({
      query: (data) => ({
        url: "/dashboardservice/transaction/year",
        method: "post",
        data,
      }),
    }),
  }),
});

export const {
  useTransactionTop5Mutation,
  useTransactionSumMutation,
  useTransactionUsageQuery,
  useTransactionYearMutation,
} = dashboardServiceApi;
