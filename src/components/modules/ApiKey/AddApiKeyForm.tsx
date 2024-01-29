/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import FormItem from "@elements/FormItem";
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  ToggleSwitch,
  useTheme,
} from "flowbite-react";
import { useCallback, MutableRefObject, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomModalRef } from "@elements/CustomModal";
import ProTimePicker from "@elements/Inputs/ProTimePicker";
import { RegExs } from "@constants/regular";
import SelectPriority from "@elements/MasterData/SelectPriority";
type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  onSave?: (data: any, modalRef: any) => any;
  massageErr?: string;
  setMessageErr?: (p: string) => void;
};

const AddApiKeyForm = ({
  modalRef,
  onSave,
  massageErr,
  setMessageErr,
}: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectTime = watch("is_enable_send_time");
  const theme = useTheme();
  const onFinish = useCallback(
    (form: any) => {
      const req: any = {
        name: form.name,
        sender_from: form.sender_from,
        from_name: form.from_name,
        priority: form.priority,
        whitelist: [form.whitelist],
        is_enable_send_time: form.is_enable_send_time,
        start_time: form.time[0] ? form.time[0].format("HH:mm") : "",
        end_time: form.time[1] ? form.time[1].format("HH:mm") : "",
        is_enable: form.is_enable,
      };
      onSave && onSave(req, modalRef);
    },
    [modalRef, onSave]
  );
  const handleChange = () => {
    setMessageErr && setMessageErr("");
  };
  useEffect(() => {
    if (!errors.name) {
      // console.log(formState.errors);
      handleChange();
    }
  }, [errors.name, setMessageErr]);
  return (
    <>
      <Modal.Body className="pt-4">
        <FormItem
          name="name"
          control={control}
          onChange={handleChange}
          label="API Key Name"
          required
          CustomClassInput={`${
            massageErr ? theme.theme.textInput.field.input.colors.failure : ""
          }`}
          rules={{
            required: "Please enter API Key Name",
          }}
        >
          <TextInput placeholder="Name of API Key" type="text" />
        </FormItem>
        {massageErr && (
          <p className="mt-[-31px]  text-sm text-red-600">{massageErr}</p>
        )}
        <div className="grid grid-cols-2 gap-8 ">
          <FormItem name="from_name" control={control} label="Sender Name">
            <TextInput placeholder="Sender Name" type="text" />
          </FormItem>

          <FormItem
            name="sender_from"
            control={control}
            label="Sender From"
            rules={{
              pattern: {
                value: RegExs.EMAIL,
                message: "Please enter a valid email address.",
              },
            }}
          >
            <TextInput placeholder="name@company.com" type="text" />
          </FormItem>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <FormItem
            name="priority"
            control={control}
            label="Priority"
            required
            initialValue={3}
          >
            <SelectPriority />
          </FormItem>
          <div className="flex flex-row mt-6 gap-3">
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
              <p className="font-medium text-sm">API Key Status</p>
              <p className="text-xs text-gray-500">
                Enable for active this API Key.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <FormItem
              name="whitelist"
              control={control}
              label="Whitelist IP Address"
            >
              <Textarea placeholder="Write text here ..." rows={3}></Textarea>
            </FormItem>

            <p className="text-xs">
              <span className="font-semibold">Note:</span> You can enter
              multiple whitelist IP addresses by separating them with a comma
              (,). For example, 123.0.0.0,192.0.0.0,...
            </p>
          </div>
          <div className="flex flex-row mt-6 gap-3 ">
            <div className="flex flex-col">
              <FormItem
                control={control}
                initialValue={false}
                valueEvent="onChange"
                name="is_enable_send_time"
              >
                {({ field }) => (
                  <ToggleSwitch
                    label=""
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              </FormItem>
            </div>
            <div className=" w-full">
              <div className="w-full mb-2">
                <p className="font-medium text-sm">Send Time Setting</p>
                <p className="text-xs">Enable for setting send time period.</p>
              </div>

              <div className="w-full">
                <FormItem
                  name="time"
                  control={control}
                  label="Select Time"
                  required={selectTime ? true : false}
                  rules={{
                    required: selectTime ? "Please select Time" : false,
                  }}
                >
                  {({ field }) => (
                    <ProTimePicker
                      disabled={!selectTime}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </FormItem>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t border-gray-200">
        <Button
          color="primary"
          className="mt-4"
          onClick={handleSubmit(onFinish)}
        >
          Add API Key
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddApiKeyForm;
