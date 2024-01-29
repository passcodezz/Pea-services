/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RegExs } from "@constants/regular";
import FormItem from "@elements/FormItem";
import Password from "@elements/Inputs/Password";
import ContentCard from "@elements/ContentCard";
import { Button } from "flowbite-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Translation } from "react-i18next";

type Props = { onSave?: (data: any) => void };

const SettingPassword = ({ onSave }: Props) => {
  const { control, handleSubmit } = useForm();

  const handdleOnSave = useCallback(
    (form: any) => {
      const req: any = {
        old_password: form.old_password,
        new_password: form.new_password,
      };

      onSave && onSave(req);
    },
    [onSave]
  );

  return (
    <form className="w-full" onSubmit={handleSubmit(handdleOnSave)}>
      <ContentCard
        headerProps={{
          title: "Change Password",
        }}
        footerProp={{
          action: (
            <Translation>
              {(t) => (
                <Button color="primary" className="mt-2" type="submit">
                  {t("page.profile.button_save")}
                </Button>
              )}
            </Translation>
          ),
        }}
      >
        <div className="flex flex-col p-8">
          <FormItem
            rules={{
              required: "Please enter Current Password",
            }}
            label="common.current_password"
            control={control}
            name="old_password"
          >
            <Password />
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
            name="confirm_password"
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
        </div>
      </ContentCard>
    </form>
  );
};

export default SettingPassword;
