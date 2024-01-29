import { Sidebar } from "flowbite-react";
import { useLinkClickHandler, useLocation } from "react-router-dom";

type MenuItemProps = {
  to?: string;
  children?: string;
  icon?: React.FunctionComponent;
};

const MenuItem = ({ to, children, icon }: MenuItemProps) => {
  const clickHandler = useLinkClickHandler(to || "");
  const location = useLocation();
  return (
    <Sidebar.Item
      href={to}
      active={location?.pathname === to}
      onClick={clickHandler}
      icon={icon}
    >
      {children}
    </Sidebar.Item>
  );
};
export default MenuItem;
