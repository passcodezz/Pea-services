import Sider from "@elements/Sider";
import { Outlet } from "react-router";
import BaseLayout from "@modules/BaseLayout";
import BaseNavbar from "@elements/BaseNavbar";
import styles from "./index.module.scss";
const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <BaseNavbar />
      <div className="flex flex-row flex-1">
        <Sider />
        <main className={styles.wrapperMain}>
          <BaseLayout.Header />
          <div className="h-full px-2 lg:px-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
