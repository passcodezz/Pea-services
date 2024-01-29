/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Avatar, Label, Navbar } from "flowbite-react";
import { ReactComponent as BarsSolidIcon } from "@assets/images/icons/bars-solid.svg";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { onSider } from "@store/slices/app-sider.slice";
import { Keys } from "@constants/keys";
import { Link } from "react-router-dom";
import { useGetLogoutMutation } from "@redux/api/auth.api";
import { Dropdown, Divider, Space } from "antd";
import { RootState } from "@redux/store";
import { ProfileState } from "@redux/store/slices/profile.slice";
import { useSelector } from "react-redux";
import ModalConfirmLogOut from "@elements/CustomModal/ModalConfirmLogOut";

const BaseNavbar: FC = () => {
  const [onLogoutReq] = useGetLogoutMutation();

  const profile: ProfileState = useSelector(
    (state: RootState) => state?.profile
  );

  const handleOnLogout = useCallback(() => {
    onLogoutReq();
    localStorage.removeItem(Keys.TOKEN_KEY.key);
    window.location.href = "/";
  }, [onLogoutReq]);

  const getItems = (profile: any) => {
    return [
      {
        key: "email",
        label: (
          <div>
            <Space className="mb-1 text-black">{profile?.email}</Space>
            <Divider style={{ margin: 0 }} />
          </div>
        ),
      },
      {
        key: "profile",
        label: (
          <Link to="/users/profile">
            <div>
              <Space className="mb-1 text-gray-500">Profile</Space>
              <Divider style={{ margin: 0 }} />
            </div>
          </Link>
        ),
      },
      {
        key: "logout",
        label: <ModalConfirmLogOut onLogOut={handleOnLogout} />,
      },
    ];
  };

  const dispatch = useDispatch();
  return (
    <Navbar fluid border>
      <Navbar.Brand>
        <button onClick={() => dispatch(onSider())}>
          <BarsSolidIcon className="w-6 h-6 text-gray-800 dark:text-white ml-1" />
        </button>
        <Label className="ml-6 self-center whitespace-nowrap text-xl font-semibold">
          PEA Enoti
        </Label>
      </Navbar.Brand>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <Dropdown
            menu={{ items: getItems(profile) }}
            placement="bottomRight"
            overlayClassName="moreMenu"
          >
            <Avatar
              alt="avatar of Jese"
              rounded
              className="cursor-pointer"
            ></Avatar>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
};

export default BaseNavbar;
