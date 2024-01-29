/* eslint-disable @typescript-eslint/no-explicit-any */
import ProSelect from "@elements/Inputs/ProSelect";
import { Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type Option = {
  value?: number;
  label?: string;
};

const options: Option[] = [
  {
    label: "High",
    value: 3,
  },
  {
    label: "Medium",
    value: 2,
  },
  {
    label: "Low",
    value: 1,
  },
];

export type ProSelectProp = {
  className?: string;
  placeholder?: string;
  value?: string;
};

const SelectPriority = forwardRef(
  (
    { value, placeholder, className, ...props }: ProSelectProp,
    ref: Ref<any>
  ) => {
    return (
      <ProSelect
        {...props}
        ref={ref}
        value={value}
        options={options}
        placeholder={placeholder}
        className={twMerge("", className)}
      />
    );
  }
);

export default SelectPriority;
