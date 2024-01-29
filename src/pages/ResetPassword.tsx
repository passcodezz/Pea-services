/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { RegExs } from "@constants/regular";
import FormItem from "@elements/FormItem";
import { Button, Card, TextInput } from "flowbite-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Translation } from "react-i18next";
import { useNavigate } from "react-router";
import { trackingAsync } from "@utils/http.util";
import { useResetPasswordMutation } from "@redux/api/auth.api";
import _ from "lodash";
import { message } from "antd";
import { ReactComponent as Exclamation } from "@assets/images/icons/exclamation.svg";

const ResetPassword = () => {
  const { control, handleSubmit } = useForm();
  const router = useNavigate();
  const [onResetReq] = useResetPasswordMutation();
  const [massageErr, setMessageErr] = useState("");
  const onFinish = useCallback(
    (value: any) => {
      trackingAsync(() => onResetReq(value), {
        onSuccess: (res) => {
          if (res?.data?.status === true) {
            message.success("สำเร็จ");
            router("/");
          } else {
            message.error("ไม่สำเร็จ");
          }
        },
        onError: (res) => {
          if (_.size(res?.data?.errors)) {
            _.forEach(res?.data?.errors, ({ description }) =>
              setMessageErr(description)
            );
          }
        },
      });
    },
    [onResetReq, router]
  );
  const handleChange = () => {
    setMessageErr && setMessageErr("");
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4 lg:p-0 ">
      <Card className="w-full max-w-[772px] ">
        <Translation>
          {(t) => (
            <>
              <h1 className="text-gray-900 text-4xl font-semibold">
                {t("page.reset.title")}
              </h1>
              <p className="text-gray-500">{t("page.reset.subtitle")}</p>
            </>
          )}
        </Translation>
        <p
          className={
            massageErr
              ? "m-0  text-sm text-red-600 bg-red-50 border p-2.5 flex "
              : "h-7 "
          }
        >
          {massageErr && <Exclamation className="self-center h-4" />}
          {massageErr}
        </p>

        <div className="flex flex-col mt-0">
          <FormItem
            rules={{
              required: "Please enter Email",
              pattern: {
                value: RegExs.EMAIL,
                message: "The email is invalid format.",
              },
            }}
            label="common.email_name"
            control={control}
            name="email"
            onChange={handleChange}
          >
            <TextInput placeholder="example@company.com" />
          </FormItem>
          {/* <p className=" text-sm text-red-600">{massageErr}</p> */}
          <div className="flex flex-row">
            <Translation>
              {(t) => (
                <Button
                  color="primary"
                  className="mt-4"
                  onClick={handleSubmit(onFinish)}
                >
                  {t("page.reset.text_reset")}
                </Button>
              )}
            </Translation>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
