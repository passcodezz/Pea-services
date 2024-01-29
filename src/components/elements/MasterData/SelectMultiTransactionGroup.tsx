/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { forwardRef, Ref } from "react";
import SelectMultiple from "@elements/Inputs/SelectMultiple";
import { useGetTransactionGroupQuery } from "@redux/api/template.api";
import _ from "lodash";
type ProSelectProp = {
  onChange?: (data: any[]) => void;
  value?: any[];
  placeholder?: string;
  defaultValue?: any[];
};


const SelectMultiTransactionGroup = forwardRef(
  (
    { placeholder, onChange, value, defaultValue, ...props }: ProSelectProp,
    ref: Ref<any>
  ) => {
    const data: any = useGetTransactionGroupQuery(null, {
      refetchOnMountOrArgChange: true,
    });


    return (
      <SelectMultiple
        {...props}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        selectOption={_.map(data?.data?.datas, (data) => ({
          value: data?.value,
          label: data?.label,
        }))}
        defaultValue={defaultValue}
      />
    );
  }
);

export default SelectMultiTransactionGroup;
