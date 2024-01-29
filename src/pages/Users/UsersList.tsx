/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProTable from "@elements/ProTable";
import EditUserForm from "@modules/Users/EditUserForm";
import { Label, TextInput } from "flowbite-react";
import { HiSearch, HiPlus, HiTrash } from "react-icons/hi";
import BtnModal from "@elements/Buttons/BtnModal";
import AddNewUserForm from "@modules/Users/AddNewUserForm";
import ModalConfirmDelete from "@elements/CustomModal/ModalConfirmDelete";
import { useCallback, useState } from "react";
import { userApi } from "@redux/api/user.api";
import useProTable, { ColumnType } from "@hooks/useProTable";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { ProfileState } from "@redux/store/slices/profile.slice";
import { trackingAsync } from "@utils/http.util";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { NotificationSuc, NotificationDel } from "@elements/Notification";

const Profile = () => {
  const [massageErr, setMessageErr] = useState("");
  const profile: ProfileState = useSelector(
    (state: RootState) => state?.profile
  );
  const dispatch = useDispatch();

  const columns: ColumnType[] = [
    {
      title: "EMAIL",
      key: "email",
      dataIndex: "email",
      sort: true,
      inputConfig: {
        name: "username",
        type: "text",
        label: "",
        renderItem: ({ register }, key) => {
          return (
            <div key={key} className="flex flex-col">
              <Label className="text-gray-900 text-2xl font-bold">
                All Users
              </Label>
              <div className="mt-3 flex flex-row gap-4">
                <TextInput
                  {...register("email")}
                  icon={HiSearch}
                  className="w-96"
                  placeholder="Search for user"
                />
              </div>
            </div>
          );
        },
      },
    },
    {
      title: "ROLE",
      key: "role",
      dataIndex: "role",
      sort: true,
      render: (value) => {
        return (
          <div className="flex items-center">
            {value == 1 ? "Admin" : "  User"}
          </div>
        );
      },
    },
    {
      title: "DEPARTMENT",
      key: "department_name",
      dataIndex: "department_name",
      sort: true,
    },

    {
      title: "STATUS",
      key: "is_enable",
      dataIndex: "is_enable",
      sort: true,
      render: (value) => {
        return (
          <div className="flex items-center">
            {value ? (
              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>
            ) : (
              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
            )}
            {value ? "Active" : "  Inactive"}
          </div>
        );
      },
    },
    {
      title: "Create by",
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
      //* ในการ update , delete ต้องมี Role เป็น Admin (1) เท่านั้น
      title: "",
      key: "id",
      dataIndex: "id",
      render: (value, record) => {
        return profile?.role === 1 ? (
          <>
            <div className="flex justify-center items-center gap-x-3 whitespace-nowrap">
              <BtnModal
                header="Edit user"
                buttonProps={{
                  color: "primary",
                  text: "Edit",
                }}
              >
                <EditUserForm value={record} itemKey={value} onSave={onSave} />
              </BtnModal>
              {/* //* ไม่สามารถลบ user ที่มี role admin ได้ : เพื่ม 09/10/2023 */}
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
                  text="User"
                />
              </BtnModal>
            </div>
          </>
        ) : (
          <></>
        );
      },
    },
  ];

  const onSave = useCallback(
    (formData: any, modalRef: any) => {
      trackingAsync(
        () =>
          dispatch(
            !formData?.user_id
              ? (userApi.endpoints.insertUser.initiate(formData) as any)
              : (userApi.endpoints.updateUser.initiate(formData) as any)
          ),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              // alert("บันทึกข้อมูลสำเร็จ");
              NotificationSuc();
              //     router("/users/list");
            }
            modalRef?.current?.onHide();
            proTable.onSearch();
            setMessageErr("");
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
    (id: any) => {
      trackingAsync(
        () => dispatch(userApi.endpoints.deleteUser.initiate(id) as any),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              // alert("ลบข้อมูลสำเร็จ");
              NotificationDel();
              // router("/users/list");
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
      header="Add new user"
      buttonProps={{
        className: "capitalize",
        startIcon: <HiPlus />,
        color: "primary",
        text: "btn.add_user",
      }}
    >
      <AddNewUserForm
        massageErr={massageErr}
        setMessageErr={setMessageErr}
        onSave={onSave}
      />
    </BtnModal>,
  ];

  const proTable = useProTable(userApi.endpoints.searchUsers.initiate, {
    initialReq: {
      filter: {
        email: "",
      },
    },
    manual: true,
    columns,
  });

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
      // dataSource={dataSource}
    />
  );
};

export default Profile;
