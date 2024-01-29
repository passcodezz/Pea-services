import { Sidebar } from "flowbite-react";
import ListMenuItems from "./components/ListMenuItems";
import { RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { onSider } from "@store/slices/app-sider.slice";
const Sider = () => {
  const collapsed = useSelector<RootState>((state) => state.appSider.collapsed);
  const dispatch = useDispatch();
  return (
    <>
      {!collapsed && (
        <div
          onClick={() => dispatch(onSider())}
          className="absolute top-0 bottom-0 right-0 left-0 z-[9] flex lg:hidden bg-gray-300 opacity-50"
        />
      )}
      <Sidebar collapsed={collapsed as boolean}>
        <Sidebar.Items>
          <ListMenuItems />
          <Sidebar.ItemGroup />
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default Sider;
