/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ContentCard from "@elements/ContentCard";
import FormItem from "@elements/FormItem";
import { Button, TextInput } from "flowbite-react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Translation } from "react-i18next";
import { useGetSelfDataQuery } from "@redux/api/user.api";
import SelectRole from "@elements/MasterData/SelectRole";

type Props = { onSave?: (data: any) => void };

const SettingProfile = ({ onSave }: Props) => {
  const { control, handleSubmit, reset } = useForm();

  const { currentData } = useGetSelfDataQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (currentData) {
      reset(currentData);
    }
  }, [currentData, reset]);

  const handdleOnSave = useCallback(
    (form: any) => {
      const req: any = {
        department_name: form.department_name,
      };
      onSave && onSave(req);
    },
    [onSave]
  );

  return (
    <form className="w-full" onSubmit={handleSubmit(handdleOnSave)}>
      <ContentCard
        headerProps={{
          title: "Account information",
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
          <FormItem label="common.email" control={control} name="email">
            <TextInput disabled />
          </FormItem>

          <FormItem label="common.role" control={control} name="role">
            <SelectRole disabled={true} />
          </FormItem>

          <FormItem
            label="common.department"
            control={control}
            name="department_name"
          >
            <TextInput type="text" />
          </FormItem>
        </div>
      </ContentCard>
    </form>
  );
};

export default SettingProfile;
