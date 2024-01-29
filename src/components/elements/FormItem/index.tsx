/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "@hookform/error-message";
import { Label, useTheme } from "flowbite-react";
import _ from "lodash";
import { ChangeEventHandler, ReactElement, cloneElement } from "react";
import {
  Control,
  RegisterOptions,
  UseControllerReturn,
  useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
type RenderItem = (form: UseControllerReturn) => ReactElement;
type FormItemProps = {
  children: ReactElement | RenderItem;
  label?: string;
  control: Control;
  name: string;
  rules?: RegisterOptions;
  valuePropName?: string;
  valueEvent?: string;
  initialValue?: any;
  dependencies?: string[];
  className?: string;
  required?: boolean;
  CustomClassInput?: string;
  onChange?: () => void;
};

const FormItem = (props: FormItemProps) => {
  const theme = useTheme();
  const {
    name,
    control,
    rules,
    children,
    initialValue = "",
    valueEvent = "onChange",
    valuePropName = "target.value",
    label,
    className,
    required,
    CustomClassInput,
    onChange,
  } = props;
  const controller = useController({
    name,
    control,
    rules,
    defaultValue: initialValue,
  });
  const { field, formState } = controller;
  const handleTrigger = (e: ChangeEventHandler) => {
    field.onChange(_.get(e, valuePropName));
    if (onChange) {
      onChange(); // Call the onChange prop
    }
  };
  const { t } = useTranslation();
  return (
    <div className={className ? className : "flex flex-col"}>
      <div className="flex flex-col gap-2">
        {label && (
          <div className="flex flex-row gap-2">
            <Label
              aria-required
              className="capitalize"
              htmlFor={name}
              value={t(label)}
            />
            {required && <Label className="text-red-700" value="*" />}
          </div>
        )}
        <div>
          {(() => {
            if (typeof children === "object") {
              return cloneElement(children, {
                name: field.name,
                value: field?.value,
                ref: field?.ref,

                class: twMerge(
                  theme.theme.textInput.field.input.sizes.md,
                  theme.theme.textInput.field.base,
                  theme.theme.textInput.field.input.base,
                  theme.theme.textInput.field.input.withAddon.off,
                  formState?.errors[field.name]
                    ? theme.theme.textInput.field.input.colors.failure
                    : theme.theme.textInput.field.input.colors.gray,
                  CustomClassInput
                ),

                [valueEvent]: handleTrigger,
              });
            }
            return (children as any)(controller);
          })()}
        </div>
      </div>
      <div className="h-9">
        <ErrorMessage
          errors={formState?.errors}
          name={name}
          render={({ message }) => (
            <p className="text-sm text-red-600 mb-[0.5rem] m-1">{message}</p>
          )}
        />
      </div>
    </div>
  );
};

export default FormItem;
