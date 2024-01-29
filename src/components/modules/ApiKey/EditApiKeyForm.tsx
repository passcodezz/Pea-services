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
import { RegExs } from "@constants/regular";
import ProTimePicker from "@elements/Inputs/ProTimePicker";
import moment from "moment";
import SelectPriority from "@elements/MasterData/SelectPriority";
import Password from "@elements/Inputs/Password";
import { ReactComponent as Copy } from "@assets/images/icons/copy.svg";
import { message } from "antd";

type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  value?: any;
  itemKey?: string | number;
  onSave?: (data: any, modalRef: any) => any;
  massageErr?: string;
  setMessageErr?: (p: string) => void;
};

const EditApiKeyForm = ({
  modalRef,
  value,
  itemKey,
  onSave,
  massageErr,
  setMessageErr,
}: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const selectTime = watch("is_enable_send_time");
  const theme = useTheme();

  const handleCopyApiKey = useCallback((form: any) => {
    const apiKeyInput = document.createElement("input");
    apiKeyInput.setAttribute("value", form.api_key);
    document.body.appendChild(apiKeyInput);
    apiKeyInput.select();
    document.execCommand("copy");
    document.body.removeChild(apiKeyInput);
    message.success("Copy Success");
  }, []);

  const handleCopySecretKey = useCallback((form: any) => {
    const secretKeyInput = document.createElement("input");
    secretKeyInput.setAttribute("value", form.secret_key);
    document.body.appendChild(secretKeyInput);
    secretKeyInput.select();
    document.execCommand("copy");
    document.body.removeChild(secretKeyInput);
    message.success("Copy Success");
  }, []);
  useEffect(() => {
    if (value) {
      if (value.start_time || value.end_time) {
        const form = {
          ...value,
          time: [
            value.start_time && moment(value.start_time, "HH:mm"),
            value.end_time && moment(value.end_time, "HH:mm"),
          ],
        };
        reset(form);
      } else {
        const form = {
          ...value,
        };
        reset(form);
      }
    }
  }, [value, reset]);

  const onFinish = useCallback(
    (form: any) => {
      const req: any = {
        api_key_id: itemKey,
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
    [itemKey, modalRef, onSave]
  );
  const handleChange = () => {
    setMessageErr && setMessageErr("");
  };

  useEffect(() => {
    if (!errors.api_key) {
      // console.log(formState.errors);
      handleChange();
    }
  }, [errors.api_key, setMessageErr]);
  return (
    <>
      <Modal.Body className="pt-4">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex">
            <div className="w-full">
              <FormItem
                name="api_key"
                control={control}
                label="API Key"
                CustomClassInput="text-sm bg-stone-100 text-neutral-400"
              >
                <TextInput placeholder="API Key" type="text" readOnly />
              </FormItem>
            </div>
            <span
              className="border-2 h-10 flex px-4 mt-7 bg-gray-50 text-black rounded cursor-pointer hover:bg-gray-200"
              onClick={handleSubmit(handleCopyApiKey)}
            >
              <Copy className="mr-2 mt-[2px] h-full max-[435px]:h-[12px]" />
              <span className="mt-2 text-sm">Copy</span>
            </span>
          </div>

          <div className="flex">
            <div className="w-full">
              <FormItem
                name="secret_key"
                control={control}
                label="Secret Key"
                CustomClassInput="bg-stone-100"
              >
                <Password
                  className="bg-stone-100 text-neutral-400"
                  placeholder="Secret Key"
                  readOnly
                />
              </FormItem>
            </div>
            <span
              className="border-2 h-10 flex px-4 mt-7 bg-gray-50 text-black rounded cursor-pointer hover:bg-gray-200"
              onClick={handleSubmit(handleCopySecretKey)}
              // disabled={!apiKeyRef.current} // ปุ่มจะไม่สามารถคลิกได้หาก API Key ว่าง
            >
              <Copy className="mr-2 mt-[2px] h-full max-[435px]:h-[12px]" />
              <span className="mt-2 text-sm">Copy</span>
            </span>
          </div>
        </div>
        <FormItem
          name="name"
          control={control}
          label="API Key Name"
          onChange={handleChange}
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
        <div className="grid grid-cols-2 gap-8  ">
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
              initialValue={false}
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
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};

export default EditApiKeyForm;
