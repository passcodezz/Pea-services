import { Sidebar } from "flowbite-react";
import { SidebarCollapseProps } from "flowbite-react/lib/esm/components/Sidebar/SidebarCollapse";
import MenuItem from "./MenuItem";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SiderMenuItem } from "./ListMenuItems";

type MenuCollapseProps = {
  items: SiderMenuItem[];
  root?: string;
  autoClose?: boolean;
};

const MenuCollapse = ({
  items,
  root,
  autoClose,
  ...props
}: SidebarCollapseProps & MenuCollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const handleOnClickMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  useEffect(() => {
    if (items?.length && autoClose) {
      setIsOpen(location?.pathname?.search(root || "") > -1);
    }
    return () => {};
  }, [location.pathname, root, items, autoClose]);

  return (
    <Sidebar.Collapse {...props} onClick={handleOnClickMenu} open={isOpen}>
      {items?.map((menu) => {
        return (
          <MenuItem key={menu?.path} to={menu?.path} icon={menu.icon}>
            {t(`menu.${menu?.label}`)}
          </MenuItem>
        );
      })}
    </Sidebar.Collapse>
  );
};

export default MenuCollapse;
