/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RegExs } from "@constants/regular";
import FormItem from "@elements/FormItem";
import Password from "@elements/Inputs/Password";
import { Button, Card, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Translation } from "react-i18next";
import { useNavigate } from "react-router";
import { authApi, useReqPasswordQuery } from "@redux/api/auth.api";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { trackingAsync } from "@utils/http.util";
import _ from "lodash";
import { message } from "antd";

type ErrorType = {
  data: {
    errors: { description: string }[];
  };
};

const SetPassword = () => {
  const { control, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const uuid = queryParams.get("u");
  const { currentData, isLoading, error } = useReqPasswordQuery(uuid, {
    skip: !uuid,
  });
  const errorData = error as ErrorType;
  useEffect(() => {
    if (!isLoading && !currentData?.email) {
      if (_.size(errorData.data.errors)) {
        _.forEach(errorData.data.errors, ({ description }) =>
          message.error(description)
        );
      }
      return navigate("/");
    } else {
      setValue("email", currentData?.email);
      setValue("set_password_token", uuid);
    }

    return () => {};
  }, [currentData, isLoading]);

  const onFinish = useCallback((form: any) => {
    // console.log(form);
    const req: any = {
      email: form?.email,
      set_password_token: form?.set_password_token,
      new_password: form?.new_password,
    };
    trackingAsync(
      () => dispatch(authApi.endpoints.setPassword.initiate(req) as any),
      {
        onSuccess: (res) => {
          if (res?.data?.status === true) {
            message.success("บันทึกข้อมูลสำเร็จ");
            navigate("/success-password");
          } else {
            message.error("บันทึกข้อมูลไม่สำเร็จ");
          }
        },
      }
    );
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4 lg:p-0 ">
      <Card className="w-full max-w-[772px]">
        <Translation>
          {(t) => (
            <h1 className="text-gray-900 text-4xl font-semibold">
              {t("page.set_pw.title")}
            </h1>
          )}
        </Translation>
        <FormItem
          className="hidden"
          label="set_password_token"
          control={control}
          name="set_password_token"
        >
          <TextInput />
        </FormItem>
        <div className="flex flex-col mt-10">
          <FormItem
            rules={{
              required: "Please enter Email",
              pattern: {
                value: RegExs.EMAIL,
                message: "The email is invalid format.",
              },
            }}
            label="common.email"
            control={control}
            name="email"
          >
            <TextInput readOnly placeholder="nuttaphorn@company.com" />
          </FormItem>
          <FormItem
            rules={{
              required: "Please enter Password",
              validate: {
                UPPERCASE_CHAR: (value) =>
                  (value && RegExs.UPPERCASE_CHAR.test(value)) ||
                  "At least one uppercase character",
                LOWERCASE_CHAR: (value) =>
                  (value && RegExs.LOWERCASE_CHAR.test(value)) ||
                  "At least one lowercase character",
                digits: (value) =>
                  (value && RegExs.DIGIT.test(value)) ||
                  "At least 1 number (0-9)",
                SPECIAL_CHAR: (value) =>
                  (value && RegExs.SPECIAL_CHAR.test(value)) ||
                  "Inclusion of at least one special character (!@#$%^&*)",
              },
              maxLength: {
                value: 20,
                message:
                  "Your password must be at least 8 characters (and up to 20 characters).",
              },
              minLength: {
                value: 8,
                message:
                  "Your password must be at least 8 characters (and up to 20 characters).",
              },
            }}
            label="common.new_password"
            control={control}
            name="new_password"
          >
            <Password />
          </FormItem>
          <FormItem
            rules={{
              required: "Please enter Confirm Password",
              validate: (value, formValues) => {
                return (
                  value === formValues?.new_password ||
                  "Password doesn't match, Please re-enter your password again. "
                );
              },
            }}
            label="common.confirm_password"
            control={control}
            name="confirmPassword"
          >
            <Password />
          </FormItem>
          <div className="h-[172px] ml-2">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              Password requirements:
            </h3>
            <ul className="text-sm max-w-md space-y-1 ml-3 text-gray-500 list-disc list-inside dark:text-gray-400">
              <li>At least 8 characters (and up to 20 characters)</li>
              <li>At least one uppercase character</li>
              <li>At least one lowercase character</li>
              <li>At least 1 number (0-9)</li>
              <li>Inclusion of at least one special character (!@#$%^&*)</li>
            </ul>
          </div>
          <div className="flex flex-row">
            <Translation>
              {(t) => (
                <Button
                  color="primary"
                  className="mt-2"
                  onClick={handleSubmit(onFinish)}
                >
                  {t("page.set_pw.text_set_pw")}
                </Button>
              )}
            </Translation>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SetPassword;
