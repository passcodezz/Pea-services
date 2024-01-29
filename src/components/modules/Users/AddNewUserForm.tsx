/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RegExs } from "@constants/regular";
import { CustomModalRef } from "@elements/CustomModal";
import FormItem from "@elements/FormItem";
import SelectRole from "@elements/MasterData/SelectRole";
import {
  Button,
  Modal,
  TextInput,
  ToggleSwitch,
  useTheme,
} from "flowbite-react";
import { MutableRefObject, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  onSave?: (data: any, modalRef: any) => any;
  massageErr?: string;
  setMessageErr?: any;
};

const AddNewUserForm = ({
  modalRef,
  onSave,
  massageErr,
  setMessageErr,
}: Props) => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const onFinish = useCallback(
    (form: any) => {
      onSave && onSave(form, modalRef);
    },
    [modalRef, onSave]
  );

  useEffect(() => {
    if (!errors.email) {
      // console.log(formState.errors);
      setMessageErr && setMessageErr("");
    }
  }, [errors.email, setMessageErr]);

  return (
    <>
      <Modal.Body className="pt-4">
        <FormItem
          name="email"
          control={control}
          label="Email"
          required
          CustomClassInput={`${
            massageErr ? theme.theme.textInput.field.input.colors.failure : ""
          }`}
          rules={{
            required: "Please enter Email",
            pattern: {
              value: RegExs.EMAIL,
              message: "The email is invalid format.",
            },
          }}
        >
          <TextInput placeholder="name@company.com" type="text" />
        </FormItem>

        {errors.email && setMessageErr && setMessageErr("")}

        {massageErr && (
          <p className="mt-[-31px]  text-sm text-red-600">{massageErr}</p>
        )}
        <FormItem
          name="role"
          control={control}
          label="Role"
          // initialValue={1}
          required
          rules={{
            required: "Please select Role",
          }}
        >
          <SelectRole placeholder="Select Role" />
        </FormItem>
        <FormItem
          name="department_name"
          control={control}
          label="Department"
          rules={{
            maxLength: {
              value: 255,
              message: "Your Department must be at up to 255 character",
            },
          }}
        >
          <TextInput placeholder="Department" type="text" />
        </FormItem>
        <div className="flex flex-row gap-3">
          <FormItem
            control={control}
            initialValue={true}
            valueEvent="onChange"
            name="is_enable"
          >
            {({ field }) => (
              <ToggleSwitch
                label=""
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          </FormItem>
          <div className="flex flex-col w-full">
            <p className="font-medium text-sm">Active</p>
            <p className="text-xs text-gray-500">
              Enable for active this user.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t border-gray-200">
        <Button onClick={handleSubmit(onFinish)} color="primary">
          Add User
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddNewUserForm;
