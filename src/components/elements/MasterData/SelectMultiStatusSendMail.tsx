/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { forwardRef, Ref } from "react";
import SelectMultiple from "@elements/Inputs/SelectMultiple";
type ProSelectProp = {
  onChange?: (data: any[]) => void;
  value?: any[];
  placeholder?: string;
  className?: string;
};

const selectOption = [
  // { value: 0, label: "All" },
  { value: 1, label: "Processing" },
  { value: 2, label: "Success" },
  { value: 3, label: "Error" },
  { value: 4, label: "Wait for send" },
];

const SelectMultiStatusSendMail = forwardRef(
  (
    { placeholder, onChange, value, className, ...props }: ProSelectProp,
    ref: Ref<any>
  ) => {
    return (
      <SelectMultiple
        {...props}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        selectOption={selectOption}
        className={className}
      />
    );
  }
);

export default SelectMultiStatusSendMail;
