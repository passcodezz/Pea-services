/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../utils/axios-base-query";
import moment from "moment";
export const temPlateApi = createApi({
  reducerPath: "temPlateApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.PUBLIC_API_MANAGEMENT,
  }),
  endpoints: (build) => ({
    searchEmailTemplates: build.mutation({
      query: (data) => {
        if (!data?.is_enable) {
          delete data?.is_enable;
        } else {
          data["is_enable"] = data?.is_enable === "true";
        }

        if (!data?.name) {
          delete data?.name;
        }

        return {
          url: "/mmservice/templates",
          method: "post",
          data,
        };
      },
    }),
    insertEmailTemplate: build.mutation({
      query: (data) => ({
        url: "/mmservice/template",
        method: "post",
        data,
      }),
    }),
    getEmailTemplateById: build.query({
      query: (template_id) => {
        return {
          url: `/mmservice/template/${template_id}`,
          method: "get",
        };
      },
    }),
    updateEmailTemplate: build.mutation({
      query: (data: any) => {
        const url = `/mmservice/template/${data?.id}`;
        delete data["id"];
        return {
          url,
          method: "put",
          data,
        };
      },
    }),
    deleteEmailTemplate: build.mutation({
      query: (template_id) => {
        return {
          url: `/mmservice/template/${template_id}`,
          method: "delete",
        };
      },
    }),
    getAttachFile: build.mutation({
      query: (file_id) => {
        return {
          url: `/mmservice/attach/${file_id}`,
          method: "get",
        };
      },
    }),

    upLodeAttachFile: build.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("file", data.file);

        return {
          url: "/mmservice/attach",
          method: "post",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    deleteAttachFile: build.mutation({
      query: (file_id) => {
        return {
          url: `/mmservice/attach/${file_id}`,
          method: "delete",
        };
      },
    }),

    searchTransactionLog: build.mutation({
      query: (data) => {
        if (!data?.id) {
          delete data?.id;
        }
        if (!data?.message_id) {
          delete data?.message_id;
        }
        if (!data?.from_email) {
          delete data?.from_email;
        }
        if (!data?.open_status) {
          delete data?.open_status;
        }

        if (Array.isArray(data?.status) && data?.status.length === 0) {
          delete data?.status;
        }

        delete data?.priority;
        delete data?.transaction_group;

        // if (
        //   Array.isArray(data?.priority) &&
        //   data?.priority.length === 0
        // ) {
        //   delete data?.priority;
        // }

        // if (
        //   Array.isArray(data?.transaction_group) &&
        //   data?.transaction_group.length === 0
        // ) {
        //   delete data?.transaction_group;
        // }
        return {
          url: "/mmservice/transaction-logs",
          method: "post",
          data,
        };
      },
    }),
    searchTransactionEmail: build.mutation({
      query: (data) => {
        delete data?.sort;
        delete data?.sort_field;
        delete data?.page;
        delete data?.size;
        if (
          Array.isArray(data?.transaction_group) &&
          data?.transaction_group.length === 0
        ) {
          delete data?.transaction_group;
        }
        const req = {
          start_time: data?.start_time
            ? moment(data?.start_time).format("YYYY-MM-DDTHH:mm:ss")
            : moment()
                .subtract(30, "days")
                .startOf("day")
                .format("YYYY-MM-DDTHH:mm:ss"),
          end_time: data?.end_time
            ? moment(data?.end_time).format("YYYY-MM-DDTHH:mm:ss")
            : moment().startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
          transaction_group: data?.transaction_group,
        };
        return {
          url: "/mmservice/transaction/email",
          method: "post",
          data: req,
        };
      },
    }),
    getTransactionGroup: build.query({
      query: () => {
        return {
          url: "/mmservice/transaction-group/lists",
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useSearchUsersMutation,
  useGetAttachFileMutation,
  useGetEmailTemplateByIdQuery,
  useGetTransactionGroupQuery,
}: any = temPlateApi;
