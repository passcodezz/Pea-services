/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Label } from "flowbite-react";
import { Translation } from "react-i18next";
import { useCallback } from "react";
import SettingProfile from "@modules/Users/Profile/SettingProfile";
import SettingPassword from "@modules/Users/Profile/SettingPassword";
import { trackingAsync } from "@utils/http.util";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { userApi } from "@redux/api/user.api";
import { NotificationSuc } from "@elements/Notification";

const Profile = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const onSaveProfile = useCallback(
    (form: any) => {
      trackingAsync(
        () => dispatch(userApi.endpoints.updateSelfData.initiate(form) as any),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              NotificationSuc();
              router("/users/profile");
            }
          },
        }
      );
    },
    [dispatch, router]
  );

  const onSavePassword = useCallback(
    (form: any) => {
      trackingAsync(
        () =>
          dispatch(userApi.endpoints.changePasswordSelf.initiate(form) as any),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              NotificationSuc();
              router("/users/profile");
            }
          },
        }
      );
    },
    [dispatch, router]
  );

  return (
    <div className="h-screen">
      <div className="m-4">
        <Translation>
          {(t) => (
            <Label className="text-gray-900 text-2xl font-bold">
              {t("page.profile.pageName")}
            </Label>
          )}
        </Translation>
      </div>
      <div className="grid grid-cols-2 gap-8 m-8">
        <SettingProfile onSave={onSaveProfile} />
        <SettingPassword onSave={onSavePassword} />
      </div>
    </div>
  );
};

export default Profile;
