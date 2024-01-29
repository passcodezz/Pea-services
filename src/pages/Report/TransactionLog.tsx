/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProTable from "@elements/ProTable";
import useProTable, { ColumnType } from "@hooks/useProTable";
import { Label, TextInput } from "flowbite-react";
import { useCallback } from "react";
import { temPlateApi } from "@redux/api/template.api";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import _ from "lodash";
import { Translation } from "react-i18next";
import { ReactComponent as IconDots } from "@assets/images/icons/dots-vertical.svg";
import BtnModal from "@elements/Buttons/BtnModal";
import ModalDetailTranSectionLog from "@modules/Report/TransectionLog/ModalDetailTransectionLog";
import ModalConfirmSendMail from "@modules/Report/TransectionLog/ModalConfirmSendMail";
import ProDateTimePicker from "@elements/Inputs/ProDateTimePicker";
import { Dropdown } from "antd";
import SelectMultiStatusSendMail from "@elements/MasterData/SelectMultiStatusSendMail";
import { RootState } from "@redux/store";
import { ProfileState } from "@redux/store/slices/profile.slice";
import SelectUser from "@elements/MasterData/SelectUser";
import { useDispatch, useSelector } from "react-redux";
import { trackingAsync } from "@utils/http.util";
import { notiApi } from "@redux/api/notiApi.api";
import { NotificationError, NotificationSuc } from "@elements/Notification";
import BoxContent from "@elements/BoxContent";
import SummaryStatus from "@modules/Report/TransectionLog/SummeryStatus";
import numeral from "numeral";
import SelectMultiPriorityl from "@elements/MasterData/SelectMultiPriorityl";
import SelectStatusSendMail from "@elements/MasterData/SelectStatusSendMail";
import moment from "moment";
import SelectMultiTransactionGroup from "@elements/MasterData/SelectMultiTransactionGroup";

// const dataSource = [
//   {
//     id: 1,
//     transaction_group: "หนังสือแจ้งค่าบริการ ",
//     priority: "High",
//     from_email: "aaa@company.com",
//     to_email: "customer@company.com",
//     create_date: "09/10/2023 08:30",
//     time_send: "10/10/2023 10:25",
//     status: "success",
//     error_message: "Connection time out",
//     server: "AWS",
//     open_status: true,
//     open_date: "10/10/2023 12:30",
//     open_count: 1,
//     message_id: "REF_123",
//   },
//   {
//     id: 2,
//     transaction_group: "หนังสือแจ้งค่าบริการ ",
//     priority: "High",
//     from_email: "aaa@company.com",
//     to_email: "customer@company.com",
//     create_date: "09/10/2023 08:30",
//     time_send: "10/10/2023 08:30",
//     status: "error",
//     error_message: "Connection time out",
//     server: "AWS",
//     open_status: false,
//     open_date: "",
//     open_count: 0,
//     message_id: "REF_123",
//   },
//   {
//     id: 3,
//     transaction_group: "หนังสือแจ้งค่าบริการ ",
//     priority: "Medium",
//     from_email: "aaa@company.com",
//     to_email: "customer@company.com",
//     create_date: "09/10/2023 08:30",
//     time_send: "10/10/2023 08:30",
//     status: "error",
//     error_message: "Connection time out",
//     server: "AWS",
//     open_status: false,
//     open_date: "",
//     open_count: 0,
//     message_id: "REF_123",
//   },
// ];

const TransactionLog = () => {
  const dispatch = useDispatch();
  const profile: ProfileState = useSelector(
    (state: RootState) => state?.profile
  );

  const onSendEmail = useCallback(
    (id: any) => {
      trackingAsync(
        () =>
          dispatch(
            notiApi.endpoints.resendErrorMessage.initiate({
              transaction_log_id: id,
            }) as any
          ),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              NotificationSuc();
            }
            proTable.onSearch();
          },
          onError: (res) => {
            if (_.size(res?.data?.errors)) {
              _.forEach(res?.data?.errors, ({ description }) =>
                NotificationError(description)
              );
            } else {
              NotificationError(res?.data?.detail || "เกิดข้อผิดพลาด");
            }
          },
        }
      );
    },
    [dispatch]
  );

  const getItems = (value: any, record: any) => {
    const items = [
      {
        key: "view-detail",
        label: (
          <BtnModal
            header="Content detail"
            buttonProps={{
              startIcon: <></>,
              color: "light",
              text: "View detail",
              className: "w-28",
            }}
          >
            <ModalDetailTranSectionLog id={record?.id} />
          </BtnModal>
        ),
      },
    ];
    if (record.status === "error") {
      items.push({
        key: "resend",
        label: (
          <BtnModal
            header=""
            buttonProps={{
              startIcon: <></>,
              color: "light",
              text: "Resend",
              className: "w-28",
            }}
          >
            <ModalConfirmSendMail
              value={record}
              itemKey={value}
              onSendEmail={onSendEmail}
            />
          </BtnModal>
        ),
      });
    }

    return items;
  };

  const columns: ColumnType[] = [
    {
      title: "Date From",
      key: "start_date",
      dataIndex: "start_date",
      sort: true,
      hidden: true,
      inputConfig: {
        name: "start_date",
        type: "text",
        label: "",
        renderItem: ({ control, watch }, key) => {
          const endDate = watch("end_date");
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Date From</Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="start_date"
                  control={control}
                  render={({ field }) => (
                    <ProDateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      disabledDate={(data) => {
                        return (
                          data > moment(endDate) ||
                          data < moment(endDate).subtract(60, "days")
                        );
                      }}
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
      title: "Date To",
      key: "end_date",
      dataIndex: "end_date",
      hidden: true,
      inputConfig: {
        name: "end_date",
        type: "text",
        label: "",
        renderItem: ({ control, watch }, key) => {
          const startDate = watch("start_date");
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Date To</Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <ProDateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      disabledDate={(data) => {
                        return (
                          data < moment(startDate) ||
                          data > moment(startDate).add(60, "days")
                        );
                      }}
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
      title: "ID",
      key: "id",
      dataIndex: "id",
      //เพิ่ม
      inputConfig: {
        name: "id",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">ID</Label>
              <div className="mt-5 flex flex-row gap-4">
                <TextInput
                  {...register("id")}
                  className="w-[80px]"
                  placeholder="ID"
                  type="text"
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
      sort: true,
      render: (value) => {
        return <div className="lg:w-36">{value}</div>;
      },
      //เพิ่ม
      inputConfig: {
        name: "transaction_group",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">
                Transaction Group
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
      title: "priority",
      key: "priority",
      dataIndex: "priority",
      sort: true,
      render: (value) => {
        return (
          <div className="flex items-center">
            {value === 3
              ? "High"
              : value === 2
              ? "Medium"
              : value === 1
              ? "Low"
              : ""}
          </div>
        );
      },
      //เพิ่ม
      inputConfig: {
        name: "priority",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Priority</Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="priority"
                  control={control}
                  defaultValue={[0]}
                  render={({ field }) => (
                    <SelectMultiPriorityl
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="All"
                      className="w-[120px]"
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
      title: "Sender from",
      key: "from_email",
      dataIndex: "from_email",
      render: (value) => {
        return <div className="lg:w-28">{value}</div>;
      },
      sort: true,
      //เพิ่ม
      inputConfig: {
        name: "from_email",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Sender From</Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="from_email"
                  control={control}
                  render={({ field }) => (
                    <SelectUser
                      {...field}
                      placeholder="jese.leos@company.com"
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
      title: "Sent To",
      key: "to_email",
      dataIndex: "to_email",
      sort: true,
      inputConfig: {
        name: "user_id",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return profile?.role === 1 ? (
            <>
              <div key={key} className="flex flex-col">
                <Label className="text-gray-900 text-base">Sent To</Label>
                <div className="mt-5 flex flex-row gap-4">
                  <Controller
                    name="user_id"
                    control={control}
                    render={({ field }) => (
                      <SelectUser
                        {...field}
                        placeholder="jese.leos@company.com"
                      />
                    )}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          );
        },
      },
    },
    {
      title: "CREATED DATE",
      key: "create_date",
      dataIndex: "create_date",
      sort: true,
      render: (value) => {
        return value ? dayjs(value).format("DD/MM/YYYY HH:mm:ss") : "-";
      },
    },
    {
      title: "Sent Date",
      key: "time_send",
      dataIndex: "time_send",
      sort: true,
      render: (value) => {
        return value ? dayjs(value).format("DD/MM/YYYY HH:mm:ss") : "-";
      },
    },
    {
      title: "Sent STATUS",
      key: "status",
      dataIndex: "status",
      sort: true,
      render: (value) => {
        return (
          <div className="flex items-center">
            {value === 2 ? (
              <div className="p-2 w-28 rounded-lg bg-green-200 text-center text-green-500">
                Success
              </div>
            ) : value === 3 ? (
              <div className="p-2 w-28 rounded-lg bg-red-200 text-center text-red-500">
                Error
              </div>
            ) : value === 1 ? (
              <div className="p-2 w-28 rounded-lg bg-amber-200 text-center text-amber-500">
                Processing
              </div>
            ) : value === 4 ? (
              <div className="p-2 w-28 rounded-lg bg-cyan-200 text-center text-cyan-500">
                Wait for send
              </div>
            ) : (
              <div className="p-2 w-28 rounded-lg bg-red-200 text-center text-red-500">
                {value ? value : "Error"}
              </div>
            )}
          </div>
        );
      },
      inputConfig: {
        name: "status",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Sent Status</Label>
              <div className="mt-5 flex flex-row gap-4">
                <Controller
                  name="status"
                  control={control}
                  defaultValue={[0]}
                  render={({ field }) => (
                    <SelectMultiStatusSendMail
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Sent Status"
                      className="w-[150px]"
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
      title: "Error message",
      key: "error_message",
      dataIndex: "error_message",
      render: (value) => {
        return <div className="lg:w-32">{value}</div>;
      },
      sort: true,
    },
    {
      title: "Server ปลายทาง",
      key: "server",
      dataIndex: "server",
      render: (value) => {
        return <div className="lg:w-32">{value}</div>;
      },
      sort: true,
    },
    {
      title: "สถานะการเปิดอ่าน",
      key: "open_status",
      dataIndex: "open_status",
      sort: true,
      render: (value) => {
        return <div className="lg:w-32">{value ? "อ่านแล้ว" : "-"}</div>;
      },
      inputConfig: {
        name: "open_status",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">
                สถานะการเปิดอ่าน
              </Label>
              <div className="mt-5 flex flex-row gap-4">
                <SelectStatusSendMail
                  {...register("open_status")}
                  className="w-[150px]"
                  placeholder="All"
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      title: "Open date",
      key: "open_date",
      dataIndex: "open_date",
      sort: true,
      render: (value) => {
        return (
          <div className="lg:w-32">
            {value ? dayjs(value).format("DD/MM/YYYY HH:mm:ss") : "-"}
          </div>
        );
      },
    },
    {
      title: "จำนวนครั้งที่เปิด",
      key: "open_count",
      dataIndex: "open_count",
      render: (value) => {
        return <div className="lg:w-28">{value}</div>;
      },
      sort: true,
    },
    {
      title: "Ref message ID",
      key: "message_id",
      dataIndex: "message_id",
      sort: true,
      inputConfig: {
        name: "message_id",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Ref Message ID</Label>
              <div className="mt-5 flex flex-row gap-4">
                <TextInput
                  {...register("message_id")}
                  className="w-[160px]"
                  placeholder="ID"
                  type="text"
                />
              </div>
            </div>
          );
        },
      },
    },

    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (value, record) => {
        return (
          <div>
            <Dropdown
              menu={{ items: getItems(value, record) }}
              placement="bottom"
              arrow
              className="w-20 cursor-pointer"
            >
              <IconDots />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const proTable = useProTable(
    temPlateApi.endpoints.searchTransactionLog.initiate,
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
              {t("page.report.pageName")}
            </Label>
          )}
        </Translation>
      </div>

      <ProTable
        {...proTable}
        searchFormProps={{
          searchFooter: ["clear", "search", "export"],
        }}
        itemKeys={["name"]}
        scroll={{
          x: "100vw",
        }}
        renderResult={() => <CardStatus />}
      />
    </>
  );
};

export default TransactionLog;

const CardStatus = () => {
  return (
    <div className="flex flex-col p-4">
      <BoxContent className="px-2 w-full xl:w-3/5 flex flex-col bg-[#F9FAFB]">
        <div className="grid grid-cols-2  lg:grid-cols-5 md:grid-cols-5 gap-2">
          <SummaryStatus
            cardClass="bg-[#EFF1F3] text-[#111928]"
            sumStatus={numeral(40).format("0,0")}
            desc="Total"
          />
          <SummaryStatus
            cardClass="bg-[#FFF4DE] text-[#723B13]"
            sumStatus={numeral(10).format("0,0")}
            desc="Processing"
          />
          <SummaryStatus
            cardClass="bg-[#E6F0FB] text-[#1E429F]"
            sumStatus={numeral(10).format("0,0")}
            desc="Waiting for send"
          />
          <SummaryStatus
            cardClass="bg-[#FFE2E5] text-[#CA0707]"
            sumStatus={numeral(10).format("0,0")}
            desc="Error"
          />
          <SummaryStatus
            cardClass="bg-[#DCFCE7] text-[#046C4E]"
            sumStatus={numeral(10).format("0,0")}
            desc="Success"
          />
        </div>
      </BoxContent>
    </div>
  );
};
