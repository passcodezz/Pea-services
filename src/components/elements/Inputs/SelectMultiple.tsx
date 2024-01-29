/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { forwardRef, useCallback, useEffect, useState } from "react";
import { Select, Checkbox } from "antd";
import { twMerge } from "tailwind-merge";

type ProSelectProp = {
  placeholder?: string;
  onChange?: (data: any[]) => void;
  value?: any;
  selectOption?: any[];
  defaultValue?: any[];
  className?: string;
};

const SelectMultiple = forwardRef(
  (
    {
      placeholder,
      onChange,
      value,
      selectOption = [],
      defaultValue,
      className,
      ...props
    }: ProSelectProp,
    ref: any
  ) => {
    const { Option } = Select;

    const [selectedOptions, setSelectedOptions] = useState<any[]>([0]);
    useEffect(() => {
      if (!value) {
        setSelectedOptions([]);
      }
    }, [value]);

    const handleChange = useCallback(
      (value: number[]) => {
        if (value.includes(0)) {
          // If "All" is selected, set selectedOptions to [0] and trigger the onChange callback with [0]
          setSelectedOptions([0]);
          onChange && onChange([0]);
        } else {
          // If "All" is not selected, update selectedOptions and trigger the onChange callback
          setSelectedOptions(value);
          onChange && onChange(value);
        }
      },
      [onChange]
    );
    const allCheckboxChecked = selectedOptions.length === selectOption.length;

    return (
      <Select
        {...props}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        mode="multiple"
        maxTagCount="responsive"
        allowClear
        className={twMerge(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-1 h-10 overflow-y-hidden overscroll-y-contain truncate",
          className ? className : "w-[150px]"
        )}
        optionLabelProp="label"
        ref={ref}
        placeholder={placeholder}
      >
        <Option key="All" value={0} label="All">
          <Checkbox
            checked={
              allCheckboxChecked || value.includes(0)
              // || selectedOptions.includes(0)
            }
          >
            All
          </Checkbox>
        </Option>
        {selectOption.map((item) => (
          <>
            <Option value={item.value} label={item.label}>
              <div className="demo-option-label-item">
                <Checkbox
                  checked={
                    value.includes(item?.value) || value.includes(0)
                    // selectedOptions.includes(item?.value) ||
                    // selectedOptions.includes(0)
                    // allCheckboxChecked
                  }
                />
                <span className="ml-2">{item.label}</span>
              </div>
            </Option>
          </>
        ))}
      </Select>
    );
  }
);

export default SelectMultiple;
