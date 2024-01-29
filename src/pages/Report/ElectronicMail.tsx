/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProTable from "@elements/ProTable";
import useProTable, { ColumnType } from "@hooks/useProTable";
import { Label } from "flowbite-react";
import { temPlateApi } from "@redux/api/template.api";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@redux/store";
// import { ProfileState } from "@redux/store/slices/profile.slice";
// import { useCallback } from "react";
import _ from "lodash";
import { Translation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import ProDateTimePicker from "@elements/Inputs/ProDateTimePicker";
import SelectMultiTransactionGroup from "@elements/MasterData/SelectMultiTransactionGroup";
import moment from "moment";

const ElectronicMail = () => {
  const { watch } = useForm();
  const startDate = watch("start_time");
  const endDate = watch("end_time");
  const currentDate = moment().startOf("day");
  const newDate = moment().subtract(30, "days").startOf("day");
  const columns: ColumnType[] = [
    {
      // title: "Name",
      key: "name_total",
      dataIndex: "name_total",
      // sort: true,
      hidden: true,
      // render: (value) => {
      //   return <div >{value ? "รวมทั้งหมด" : "รวมทั้งหมด"}</div>;
      // },
      // inputConfig: {
      //   name: "name_total",
      //   type: "text",
      //   label: "",
      //   renderItem: ({ control }, key) => {
      //     return (
      //       <div key={key} className="flex flex-col">
      //         <Label className="text-gray-900 text-base">Date From</Label>
      //         <div className="mt-5 flex flex-row gap-4"></div>
      //       </div>
      //     );
      //   },
      // },
    },
    {
      key: "sum_total",
      dataIndex: "sum_total",
      // sort: true,
      hidden: true,
    },
    {
      key: "sum_processing",
      dataIndex: "sum_processing",
      hidden: true,
      // render: (value) => {
      //   // const sumProcessingValue = dataSource.reduce((acc, item) => acc + parseInt(item.processing, 10), 0);
      //   return (
      //     <div>{value}</div>
      //   );
      // },
    },
    {
      key: "sum_waiting_for_send",
      dataIndex: "sum_waiting_for_send",
      hidden: true,
    },
    {
      key: "sum_error",
      dataIndex: "sum_error",
      hidden: true,
    },
    {
      key: "sum_success",
      dataIndex: "sum_success",
      hidden: true,
    },
    {
      key: "sum_open",
      dataIndex: "sum_open",
      hidden: true,
    },
    {
      key: "sum_not_open",
      dataIndex: "sum_not_open",
      hidden: true,
    },

    {
      title: "Date From",
      key: "start_time",
      dataIndex: "start_time",
      hidden: true,
      inputConfig: {
        name: "start_time",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Date From</Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="start_time"
                  control={control}
                  rules={{ required: "This field is required" }}
                  defaultValue={newDate}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col">
                      <ProDateTimePicker
                        value={field.value}
                        className="w-full"
                        disabledDate={(data) => {
                          return (
                            data > moment(endDate) ||
                            data < moment(endDate).subtract(60, "days")
                          );
                        }}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <div style={{ color: "red" }}>
                          {fieldState.error.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      title: "Date To",
      key: "end_time",
      dataIndex: "end_time",
      hidden: true,
      inputConfig: {
        name: "end_time",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Date To</Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="end_time"
                  control={control}
                  defaultValue={currentDate}
                  rules={{ required: "This field is required" }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col">
                      <ProDateTimePicker
                        // disabled={!startDate}
                        value={field.value}
                        className="w-full"
                        disabledDate={(data) => {
                          return (
                            data < moment(startDate) ||
                            data > moment(startDate).add(60, "days")
                          );
                        }}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <div style={{ color: "red" }}>
                          {fieldState.error.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      title: "Transaction group",
      key: "transaction_group",
      dataIndex: "transaction_group",
      showSum: true,
      inputConfig: {
        name: "transaction_group",
        type: "text",
        label: "",
        //filter จะ search ทุกครั้งที่เลือกเสร็จ (เลือก 1 filter ก็ หมุนหาเลย) Default = All
        renderItem: ({ control }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">
                Transaction group
              </Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="transaction_group"
                  control={control}
                  defaultValue={[0]}
                  render={({ field }) => (
                    <SelectMultiTransactionGroup
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Transaction group"
                    />
                  )}
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      title: "Total",
      key: "total_transaction",
      dataIndex: "total_transaction",
      // sort: true,
      showSum: true,
    },
    {
      title: "Processing",
      key: "processing",
      dataIndex: "processing",
      showSum: true,
    },
    {
      title: "Waiting for send",
      key: "waiting_for_send",
      dataIndex: "waiting_for_send",
      showSum: true,
    },
    {
      title: "Error",
      key: "error",
      dataIndex: "error",
      showSum: true,
    },
    {
      title: "Success",
      key: "success",
      dataIndex: "success",
      showSum: true,
    },
    {
      title: "อ่านแล้ว",
      key: "open",
      dataIndex: "open",
      showSum: true,
    },
    {
      title: "ยังไม่ได้อ่าน",
      key: "not_open",
      dataIndex: "not_open",
      showSum: true,
    },
  ];

  const dataSourceSum = [
    {
      // id: 1,
      name_total: "รวมทั้งหมด ",
      sum_total: "100",
      sum_processing: "20",
      sum_waiting_for_send: "10",
      sum_error: "10",
      sum_success: "70",
      sum_open: "10",
      sum_not_open: "60",
    },
  ];
  const proTable = useProTable(
    temPlateApi.endpoints.searchTransactionEmail.initiate,
    {
      initialReq: {
        filter: {},
      },
      manual: true,
      columns,
    }
  );

  return (
    <>
      <div className="m-4">
        <Translation>
          {(t) => (
            <Label className="text-gray-900 text-2xl font-bold">
              {t("page.report.pageNameSummary")}
            </Label>
          )}
        </Translation>
      </div>
      <ProTable
        {...proTable}
        searchFormProps={{
          searchFooter: ["clear", "search", "export"],
        }}
        itemKeys={["id"]}
        scroll={{
          x: "100vw",
        }}
        dataSum={true}
        dataSourceSum={dataSourceSum}
      />
    </>
  );
};

export default ElectronicMail;
