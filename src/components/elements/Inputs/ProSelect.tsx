/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Select, SelectProps } from "flowbite-react";
import { forwardRef } from "react";

export type Option = {
  value?: any;
  label?: string;
};

export type ProSelectProp = {
  className?: string;
  placeholder?: string;
  options?: Option[];
} & SelectProps;

const ProSelect = forwardRef(
  ({ placeholder, options, ...props }: ProSelectProp, ref: any) => {
    return (
      <Select {...props} ref={ref}>
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((data: Option) => (
          <option key={data.value} value={data.value}>
            {data.label}
          </option>
        ))}
      </Select>
    );
  }
);

export default ProSelect;
