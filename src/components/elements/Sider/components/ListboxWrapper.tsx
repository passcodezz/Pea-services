import { RootState } from "@store/index";
import React from "react";
import { useSelector } from "react-redux";
type ListboxWrapperProps = {
  children: React.ReactNode;
};

const ListboxWrapper = ({ children }: ListboxWrapperProps) => {
  const collapsed = useSelector<RootState>((state) => state.appSider.collapsed);
  return (
    <div className="flex flex-row">
      <div
        className="relative w-0 overflow-hidden data-[open=true]:w-sider lg:w-sider transition-all"
        data-open={!!collapsed}
      >
        <div className="w-sider h-full py-5 bg-white shadow justify-start items-start inline-flex px-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ListboxWrapper;
