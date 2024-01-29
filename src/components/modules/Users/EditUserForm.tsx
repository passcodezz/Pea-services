/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CustomModalRef } from "@elements/CustomModal";
import FormItem from "@elements/FormItem";
import SelectRole from "@elements/MasterData/SelectRole";
import { Button, Modal, TextInput, ToggleSwitch } from "flowbite-react";
import { MutableRefObject, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  value?: any;
  itemKey?: string | number;
  onSave?: (data: any, modalRef: any) => any;
};

const EditUserForm = ({ modalRef, onSave, value, itemKey }: Props) => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (value) {
      reset(value);
    }
  }, [value, reset]);

  const onFinish = useCallback(
    (form: any) => {
      const req: any = {
        user_id: itemKey,
        department_name: form.department_name,
        is_enable: form?.is_enable,
      };

      onSave && onSave(req, modalRef);
    },
    [itemKey, modalRef, onSave]
  );

  return (
    <>
      <Modal.Body className="pt-4">
        <FormItem
          className="hidden"
          name="is_enable"
          control={control}
          label="isEnable"
        >
          <TextInput disabled />
        </FormItem>
        <FormItem name="email" control={control} label="Email">
          <TextInput disabled />
        </FormItem>
        <FormItem
          name="role"
          control={control}
          label="Role"
          rules={{
            required: "Please select Role",
          }}
        >
          <SelectRole disabled={true} />
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
          <TextInput type="text" />
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
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};

export default EditUserForm;
