/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProTable from "@elements/ProTable";
import useProTable, { ColumnType } from "@hooks/useProTable";
import { Label, TextInput } from "flowbite-react";
import { HiSearch, HiPlus } from "react-icons/hi";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import I18nButton from "@elements/I18nButton";
import { Link } from "react-router-dom";
import BtnModal from "@elements/Buttons/BtnModal";
import ModalConfirmDelete from "@elements/CustomModal/ModalConfirmDelete";
import { useCallback } from "react";
import SelectActive from "@elements/MasterData/SelectApiKeyStatus";
import { temPlateApi } from "@redux/api/template.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { ProfileState } from "@redux/store/slices/profile.slice";
import SelectUser from "@elements/MasterData/SelectUser";
import { Controller } from "react-hook-form";
import { trackingAsync } from "@utils/http.util";
import dayjs from "dayjs";
import _ from "lodash";
import { NotificationDel } from "@elements/Notification";

const actions = [
  <Link to="/create-template">
    <I18nButton
      startIcon={<HiPlus className="text-lg" />}
      color="primary"
      text="btn.add_template"
    />
  </Link>,
];

const Template = () => {
  const profile: ProfileState = useSelector(
    (state: RootState) => state?.profile
  );
  const dispatch = useDispatch();

  const onRemove = useCallback(
    (id: any) => {
      trackingAsync(
        () =>
          dispatch(
            temPlateApi.endpoints.deleteEmailTemplate.initiate(id) as any
          ),
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

  const columns: ColumnType[] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      headerClassName: "lg:w-48",
      sort: true,
      inputConfig: {
        name: "name",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-2xl font-bold">
                All Template
              </Label>
              <div className="mt-3 flex flex-row gap-4">
                <TextInput
                  {...register("name")}
                  icon={HiSearch}
                  className="w-60"
                  placeholder="Search by Name of template"
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      title: "Template STATUS",
      key: "is_enable",
      dataIndex: "is_enable",
      sort: true,
      render: (value) => {
        return (
          <div className="flex items-center w-32">
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
        //filter จะ search ทุกครั้งที่เลือกเสร็จ (เลือก 1 filter ก็ หมุนหาเลย) Default = All
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-base">Template Status</Label>
              <div className="mt-5 flex flex-row gap-4">
                <SelectActive
                  {...register("is_enable")}
                  className="w-[163px]"
                  placeholder="All"
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      //*  Search CREATE BY - เห็นเฉพาะ Admin  // user ทั่วไปไม่เห็น
      title: "CREATE BY",
      key: "user_id",
      dataIndex: "user_id",
      hidden: true,
      inputConfig: {
        name: "user_id",
        type: "text",
        label: "",
        //* Create by: เป็น Auto complete เวลาพิมพ์ระบบจะ suggest รายชื่อของ user
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
                  {/* <SelectUser
                    {...register("user_id")}
                  /> */}
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
      headerClassName: "lg:w-48",
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
      headerClassName: "lg:w-28",
      render: (value) => {
        return (
          <div className="flex gap-x-3 whitespace-nowrap justify-center">
            <Link to={`/edit-template/${value}`}>
              <I18nButton
                startIcon={<HiOutlinePencilAlt className="text-lg" />}
                color="primary"
                text="Edit"
              />
            </Link>
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
                text="Template"
              />
            </BtnModal>
          </div>
        );
      },
    },
  ];

  const proTable = useProTable(
    temPlateApi.endpoints.searchEmailTemplates.initiate,
    {
      initialReq: {
        filter: {},
      },
      manual: true,
      columns,
    }
  );

  return (
    <ProTable
      {...proTable}
      searchFormProps={{
        searchFooter: ["clear", "search"],
      }}
      actions={actions}
      itemKeys={["name"]}
      scroll={{
        x: "100vw",
      }}
    />
  );
};

export default Template;
