/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProTable from "@elements/ProTable";
import useProTable, { ColumnType } from "@hooks/useProTable";
import { Label, TextInput } from "flowbite-react";
import { HiSearch, HiPlus, HiTrash } from "react-icons/hi";
import BtnModal from "@elements/Buttons/BtnModal";
import AddApiKeyForm from "@modules/ApiKey/AddApiKeyForm";
import EditApiKeyForm from "@modules/ApiKey/EditApiKeyForm";
import SelectSendTimeStatus from "@elements/MasterData/SelectSendTimeStatus";
import SelectApiKeyStatus from "@elements/MasterData/SelectApiKeyStatus";
import ModalConfirmDelete from "@elements/CustomModal/ModalConfirmDelete";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { ProfileState } from "@redux/store/slices/profile.slice";
import SelectUser from "@elements/MasterData/SelectUser";
import { Controller } from "react-hook-form";
import { trackingAsync } from "@utils/http.util";
import { apiKeyApi } from "@redux/api/apikey.api";
import _ from "lodash";
import { NotificationSuc, NotificationDel } from "@elements/Notification";
import SelectMultiPriorityl from "@elements/MasterData/SelectMultiPriorityl";
// const dataSource = [
//   {
//     id: 1,
//     name: "API Key for send low priority",
//     priority: "Low",
//     is_enable_send_time: "Enable",
//     is_enable: true,
//     created_by: "jese.leos@company.com",
//     updated_date: "09/10/2023 08:30",
//   },
//   {
//     id: 2,
//     name: "API Key for send Medium priority",
//     priority: "Medium",
//     is_enable_send_time: "Disable",
//     is_enable: true,
//     created_by: "jese.leos@company.com",
//     updated_date: "09/10/2023 08:30",
//   },
//   {
//     id: 3,
//     name: "API Key for send low priority",
//     priority: "Low",
//     is_enable_send_time: "Enable",
//     is_enable: false,
//     created_by: "jese.leos@company.com",
//     updated_date: "09/10/2023 08:30",
//   },
// ];

const ApiKey = () => {
  const profile: ProfileState = useSelector(
    (state: RootState) => state?.profile
  );
  const dispatch = useDispatch();
  const [massageErr, setMessageErr] = useState("");
  const columns: ColumnType[] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sort: true,
      inputConfig: {
        name: "name",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-2xl font-bold">
                All API Key
              </Label>
              <div className="mt-3 flex flex-row gap-4">
                <TextInput
                  {...register("name")}
                  icon={HiSearch}
                  className="w-60"
                  placeholder="Search for Name of API Key"
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      title: "PRIORITY",
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
      title: "SEND TIME STATUS",
      key: "sender_from",
      dataIndex: "is_enable_send_time",
      sort: true,
      render: (value) => {
        return <div className="w-32">{value ? "Enable" : "Disable"}</div>;
      },
      inputConfig: {
        name: "is_enable_send_time",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">
                Send Time Status
              </Label>
              <div className="mt-5 flex flex-row gap-4">
                <SelectSendTimeStatus
                  {...register("is_enable_send_time")}
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
      title: "API KEY",
      key: "api_key",
      dataIndex: "api_key",
      sort: true,
    },
    {
      title: "API KEY STATUS",
      key: "is_enable",
      dataIndex: "is_enable",
      sort: true,
      render: (value) => {
        return (
          <div className="flex items-center w-28">
            {value ? (
              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>
            ) : (
              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
            )}
            {value ? "Active" : "  Inactive"}
          </div>
        );
      },
      inputConfig: {
        name: "is_enable",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Api Key Status</Label>
              <div className="mt-5 flex flex-row gap-4">
                <SelectApiKeyStatus
                  {...register("is_enable")}
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
      title: "CREATE BY",
      key: "create_by",
      dataIndex: "create_by",
      hidden: true,
      inputConfig: {
        name: "create_by",
        type: "text",
        label: "",
        renderItem: ({ control }, key) => {
          return profile?.role === 1 ? (
            <>
              <div key={key} className="flex flex-col">
                <Label className="text-gray-900 text-base">Create by</Label>
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
                  {/* <SelectUser {...register("user_id")} />  */}
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
      title: "CREATE BY",
      key: "create_by",
      dataIndex: "create_by",
      sort: true,
    },
    {
      title: "LAST UPDATE",
      key: "update_date",
      dataIndex: "update_date",
      sort: true,
      render: (value) => {
        return value ? dayjs(value).format("DD/MM/YYYY HH:mm:ss") : "-";
      },
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (value, record) => {
        return (
          <div className="flex justify-center items-center gap-x-3 whitespace-nowrap">
            <BtnModal
              header="Edit API Key"
              buttonProps={{
                color: "primary",
                text: "Edit",
              }}
            >
              <EditApiKeyForm
                massageErr={massageErr}
                setMessageErr={setMessageErr}
                value={record}
                itemKey={value}
                onSave={onSave}
              />
            </BtnModal>
            <BtnModal
              buttonProps={{
                startIcon: <HiTrash className="text-lg" />,
                color: "failure",
                text: "Delete",
              }}
            >
              <ModalConfirmDelete
                onRemove={onRemove}
                itemKey={value}
                text="API Key"
              />
            </BtnModal>
          </div>
        );
      },
    },
  ];

  const proTable = useProTable(apiKeyApi.endpoints.searchApiKey.initiate, {
    initialReq: {
      filter: {
        search: "",
      },
    },
    manual: true,
    columns,
  });

  const onSave = useCallback(
    (formData: any, modalRef: any) => {
      trackingAsync(
        () =>
          dispatch(
            !formData?.api_key_id
              ? (apiKeyApi.endpoints.insertApiKey.initiate(formData) as any)
              : (apiKeyApi.endpoints.updateApiKey.initiate(formData) as any)
          ),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              NotificationSuc();
            }
            modalRef?.current?.onHide();
            proTable.onSearch();
          },
          onError: (res) => {
            if (_.size(res?.data?.errors)) {
              _.forEach(res?.data?.errors, ({ description }) =>
                setMessageErr(description)
              );
            }
          },
        }
      );
    },
    [dispatch]
  );

  const onRemove = useCallback(
    (formData: any) => {
      trackingAsync(
        () =>
          dispatch(apiKeyApi.endpoints.deleteApiKey.initiate(formData) as any),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              NotificationDel();
            }
            proTable?.onSearch();
          },
          onError: () => {
            proTable?.onSearch();
          },
        }
      );
    },
    [dispatch]
  );

  const actions = [
    <BtnModal
      header="Add Api Key"
      buttonProps={{
        className: "capitalize",
        startIcon: <HiPlus />,
        color: "primary",
        text: "btn.add_api_key",
      }}
    >
      <AddApiKeyForm
        massageErr={massageErr}
        setMessageErr={setMessageErr}
        onSave={onSave}
      />
    </BtnModal>,
  ];

  return (
    <ProTable
      {...proTable}
      searchFormProps={{
        searchFooter: ["clear", "search"],
      }}
      actions={actions}
      itemKeys={["id"]}
      scroll={{
        x: "100vw",
      }}
    />
  );
};

export default ApiKey;
