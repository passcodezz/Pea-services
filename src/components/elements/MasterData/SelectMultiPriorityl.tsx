/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { forwardRef, Ref } from "react";
import SelectMultiple from "@elements/Inputs/SelectMultiple";

type ProSelectProp = {
  onChange?: (data: any[]) => void;
  value?: any[];
  placeholder?: string;
  defaultValue?: any[];
  className?: string;
};

const selectOption = [
  //   { value: 0, label: "All" },
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
];

const SelectMultiPriorityl = forwardRef(
  (
    {
      placeholder,
      onChange,
      value,
      defaultValue,
      className,
      ...props
    }: ProSelectProp,
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
        defaultValue={defaultValue}
        className={className}
      />
    );
  }
);

export default SelectMultiPriorityl;
