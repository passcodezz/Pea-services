/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge";
import { Ref, forwardRef } from "react";
import ProSelect from "@elements/Inputs/ProSelect";

export type Option = {
  value?: boolean;
  label?: string;
};

const options: Option[] = [
  {
    label: "Enable",
    value: true,
  },
  {
    label: "Disable",
    value: false,
  },
];

type ProSelectProp = {
  className?: string;
  placeholder?: string;
};

const SelectSendTimeStatus = forwardRef(
  ({ placeholder, className, ...props }: ProSelectProp, ref: Ref<any>) => {
    return (
      <ProSelect
        {...props}
        ref={ref}
        options={options}
        placeholder={placeholder}
        className={twMerge("", className)}
      />
    );
  }
);

export default SelectSendTimeStatus;
