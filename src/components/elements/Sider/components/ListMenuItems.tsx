/* eslint-disable @typescript-eslint/no-explicit-any */
// import { SiderMenuItem, siderMenu } from "@constants/SiderMenu";
import { Sidebar } from "flowbite-react";
import MenuItem from "./MenuItem";
import MenuCollapse from "./MenuCollapse";
import { useTranslation } from "react-i18next";
import { RootState } from "@redux/store";
import { ProfileState } from "@redux/store/slices/profile.slice";
import { useSelector } from "react-redux";
import {
  HiChartPie,
  HiUsers,
  HiSwitchHorizontal,
  HiMail,
  HiDocument,
} from "react-icons/hi";

export type SiderMenuItem = {
  icon?: React.FunctionComponent;
  label?: string;
  path?: string;
  children?: SiderMenuItem[];
  permission?: number;
};

const ListMenuItems = () => {
  const { t } = useTranslation();
  const profile: ProfileState = useSelector(
    (state: RootState) => state?.profile
  );
  const siderMenu: SiderMenuItem[] = [
    {
      icon: HiChartPie,
      label: "/dashboard",
      path: "/dashboard",
    },
    {
      icon: HiDocument,
      label: "/report",
      children: [
        {
          label: "/report/transaction-log",
          path: "/report/transaction-log",
        },
        {
          label: "/report/electronic-mail",
          path: "/report/electronic-mail",
        },
      ],
    },
    {
      icon: HiUsers,
      label: "/users",
      children:
        profile?.role !== 1
          ? [
              {
                label: "/users/profile",
                path: "/users/profile",
              },
            ]
          : [
              {
                label: "/users/list",
                path: "/users/list",
              },
              {
                label: "/users/profile",
                path: "/users/profile",
              },
            ],
    },
    {
      icon: HiSwitchHorizontal,
      label: "/api-key",
      path: "/api-key",
    },
    {
      icon: HiMail,
      label: "/template",
      path: "/template",
    },
  ];
  return (
    <Sidebar.ItemGroup>
      {siderMenu.map((menu: SiderMenuItem, idx: number) => {
        if (!menu?.children?.length) {
          return (
            <MenuItem key={idx} to={menu?.path} icon={menu.icon}>
              {t(`menu.${menu?.label}`)}
            </MenuItem>
          );
        }
        return (
          <MenuCollapse
            key={idx}
            label={t(`menu.${menu?.label}`)}
            icon={menu.icon}
            root={menu?.path}
            items={menu?.children}
          />
        );
      })}
    </Sidebar.ItemGroup>
  );
};

export default ListMenuItems;
