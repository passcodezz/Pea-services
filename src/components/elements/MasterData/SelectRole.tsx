/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProSelect from "@elements/Inputs/ProSelect";
import { Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const options = [
  {
    label: "Admin",
    value: "1",
  },
  {
    label: "User",
    value: "2",
  },
];

export type ProSelectProp = {
  className?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
};

const SelectRole = forwardRef(
  (
    { value, placeholder, disabled, className, ...props }: ProSelectProp,
    ref: Ref<any>
  ) => {
    return (
      <ProSelect
        {...props}
        disabled={disabled}
        ref={ref}
        value={value}
        options={options}
        placeholder={placeholder}
        className={twMerge("", className)}
      />
    );
  }
);

export default SelectRole;
