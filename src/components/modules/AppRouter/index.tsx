/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import _ from "lodash";
import { useLayoutEffect } from "react";
import localStorageUtil from "@utils/local-storage.util";
import { Keys } from "@constants/keys";
import { useDispatch } from "react-redux";
import { setProfile } from "@redux/store/slices/profile.slice";
import MainLayout from "@layouts/MainLayout";
import PublicRouter from "@elements/PublicRouter";
import RedirectMain from "@elements/RedirectMain";
import LoginPage from "@pages/LoginPage";
import SetPassword from "@pages/SetPassword";
import ResetPassword from "@pages/ResetPassword";
import SuccessPassword from "@pages/SuccessPassword";
import Dashboard from "@pages/Dashboard";
import ApiKey from "@pages/ApiKey";
import { useGetSelfDataQuery } from "@redux/api/user.api";
import UsersList from "@pages/Users/UsersList";
import Profile from "@pages/Users/Profile";
import Template from "@pages/Template";
import CreateTemplate from "@pages/Template/CreateTemplate";
import EditTemplate from "@pages/Template/EditTemplate";
import NotMatch from "@elements/NotMatch";
import ElectronicMail from "@pages/Report/ElectronicMail";
import TransactionLog from "@pages/Report/TransactionLog";
import PrivateRouter from "@elements/PrivateRouter";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RedirectMain />} />
      <Route element={<PublicRouter />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/setpassword" element={<SetPassword />}></Route>
      <Route path="/success-password" element={<SuccessPassword />}></Route>

      <Route element={<MainLayout />}>
        <Route element={<PrivateRouter />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="api-key" element={<ApiKey />} />
        </Route>
        {/* <Route element={<PrivateRouter />}> */}

        <Route path="/users" element={<PrivateRouter />}>
          <Route index path="list" element={<UsersList />} />
          <Route index path="profile" element={<Profile />} />
        </Route>

        <Route element={<PrivateRouter />}>
          <Route index path="template" element={<Template />} />
          <Route index path="create-template" element={<CreateTemplate />} />
          <Route index path="edit-template/:id" element={<EditTemplate />} />
        </Route>

        <Route path="/report" element={<PrivateRouter />}>
          <Route index path="transaction-log" element={<TransactionLog />} />
          <Route index path="electronic-mail" element={<ElectronicMail />} />
        </Route>
      </Route>

      {/* <Route element={<BasicLayout />}>
        <Route path="not-permission" element={<NotPermission />} />
      </Route> */}

      <Route path="*" element={<NotMatch />} />
    </Route>
  )
);
const AppRouter = () => {
  const dispatch = useDispatch();

  const token = localStorageUtil.getItem(
    Keys.TOKEN_KEY.key,
    Keys.TOKEN_KEY.cryptoKey
  );

  const { data, isLoading } = useGetSelfDataQuery(null, {
    skip: !token,
  });

  useLayoutEffect(() => {
    dispatch(setProfile(data as any));
    return () => {};
  }, [data, dispatch]);

  return !isLoading ? <RouterProvider router={router} /> : <></>;
};
export default AppRouter;
