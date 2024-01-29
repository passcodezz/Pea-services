/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import FormItem from "@elements/FormItem";
import { setToken, setUser, removeUser, getUser } from "@utils/auth.util";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Translation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Password from "@elements/Inputs/Password";
import { RegExs } from "@constants/regular";
import { useCallback, useEffect, useState } from "react";
import { useLoginMutation } from "@redux/api/auth.api";
import { trackingAsync } from "@utils/http.util";
import { useDispatch } from "react-redux";
import { setProfile } from "@redux/store/slices/profile.slice";
import _ from "lodash";
import { Checkbox, message } from "antd";
import { ReactComponent as Exclamation } from "@assets/images/icons/exclamation.svg";
const LoginPage = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [error, setError] = useState<any>("");
  const router = useNavigate();
  const [onLoginReq] = useLoginMutation();
  const dispatch = useDispatch();
  const rememberUser = (value: any) => {
    if (value?.remember) {
      setUser(value);
    } else {
      removeUser();
    }
  };

  const onFinish = useCallback(
    (value: any) => {
      trackingAsync(() => onLoginReq(value), {
        onSuccess: (res) => {
          if (res?.data?.status === true) {
            message.success("เข้าสู่ระบบสำเร็จ");
            setToken(res?.data?.access_token);
            rememberUser(value);
            dispatch(setProfile(res?.data));
            router("/dashboard");
          } else {
            message.error(res?.data?.error || "เข้าสู่ระบบไม่สำเร็จ");
          }
        },
        onError: (res) => {
          if (_.size(res?.data?.errors)) {
            _.forEach(res?.data?.errors, ({ description }) =>
              setError(description)
            );
          }
        },
      });
    },
    [dispatch, router]
  );

  useEffect(() => {
    const member = getUser();
    if (member) {
      setValue("email", member.email);
      setValue("password", member.password);
      setValue("remember", true);
    }
    return () => {};
  }, []);

  const handleChange = () => {
    setError && setError("");
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4 lg:p-0 ">
      <Card className="w-full max-w-[772px]  p-4">
        <Translation>
          {(t) => (
            <h1 className="text-gray-900 text-4xl font-semibold mb-1">
              {t("page.login.title")}
            </h1>
          )}
        </Translation>

        <p
          className={
            error
              ? "m-0  text-sm text-red-600 bg-red-50 border p-2.5 flex "
              : "h-7 "
          }
        >
          {error && <Exclamation className="self-center h-4" />}
          {error}
        </p>

        <div className="flex flex-col mt-0">
          <FormItem
            label="common.email"
            control={control}
            name="email"
            onChange={handleChange}
            rules={{
              required: "Please enter Email",
              pattern: {
                value: RegExs.EMAIL,
                message: "The email is invalid format.",
              },
            }}
          >
            <TextInput type="email" placeholder="Email" />
          </FormItem>
          <FormItem
            rules={{
              required: "Please enter Password",
              pattern: {
                value: RegExs.PASSWORD_ENG,
                message: "The password is invalid format.",
              },
            }}
            label="common.password"
            control={control}
            onChange={handleChange}
            name="password"
          >
            <Password placeholder="Password" />
          </FormItem>

          <div className="flex flex-row justify-between">
            <div className="flex items-center  gap-2  ">
              <FormItem
                className="flex items-center justify-center"
                control={control}
                name="remember"
              >
                {({ field }) => (
                  <Checkbox
                    checked={field.value}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </FormItem>
              <Label className="text-sm font-normal">Remember me</Label>
            </div>

            <Link to="/reset-password">
              <p className="text-blue-700 border-b-2 border-blue-700">
                Reset Password?
              </p>
            </Link>
          </div>

          <div className="flex flex-row">
            <Translation>
              {(t) => (
                <Button
                  color="primary"
                  className="mt-4"
                  onClick={handleSubmit(onFinish)}
                >
                  {t("page.login.text_login")}
                </Button>
              )}
            </Translation>
          </div>
        </div>
      </Card>
    </div>

    // <div className="h-screen w-screen flex flex-col justify-center items-center p-4 lg:p-0 ">
    //   <Card className="w-full max-w-[772px]  p-4">
    //     <Translation>
    //       {(t) => (
    //         <h1 className="text-gray-900 text-4xl font-semibold">
    //           {t("page.login.title")}
    //         </h1>
    //       )}
    //     </Translation>

    //     {/* {errors.email && setError} */}

    //     {error && <p className="m-0 ml-2 text-sm text-red-600">{error}</p>}

    //     <div className="flex flex-col mt-4">
    //       <FormItem
    //         label="common.email"
    //         control={control}
    //         name="email"
    //         rules={{
    //           required: "Please enter Email",
    //           pattern: {
    //             value: RegExs.EMAIL,
    //             message: "The email is invalid format.",
    //           },
    //         }}
    //       >
    //         <TextInput type="email" placeholder="Email" />
    //       </FormItem>
    //       <FormItem
    //         rules={{
    //           required: "Please enter Password",
    //           pattern: {
    //             value: RegExs.PASSWORD_ENG,
    //             message: "The password is invalid format.",
    //           },
    //         }}
    //         label="common.password"
    //         control={control}
    //         name="password"
    //       >
    //         <Password placeholder="Password" />
    //       </FormItem>

    //       {errors.password && setError && setError("")}
    //       {/* <p className="mb-2 text-sm text-red-600">{error}</p> */}

    //       <div className="flex flex-row justify-between">
    //         <div className="flex items-center  gap-2  ">
    //           <FormItem
    //             className="flex items-center justify-center"
    //             control={control}
    //             name="remember"
    //           >
    //             {({ field }) => (
    //               <Checkbox
    //                 checked={field.value}
    //                 value={field.value}
    //                 onChange={field.onChange}
    //               />
    //             )}
    //           </FormItem>
    //           <Label className="text-sm font-normal">Remember me</Label>
    //         </div>

    //         <Link to="/reset-password">
    //           <p className="text-blue-700 border-b-2 border-blue-700">
    //             Reset Password?
    //           </p>
    //         </Link>
    //       </div>

    //       <div className="flex flex-row">
    //         <Translation>
    //           {(t) => (
    //             <Button
    //               color="primary"
    //               className="mt-4"
    //               onClick={handleSubmit(onFinish)}
    //             >
    //               {t("page.login.text_login")}
    //             </Button>
    //           )}
    //         </Translation>
    //       </div>
    //     </div>
    //   </Card>
    // </div>
  );
};

export default LoginPage;
