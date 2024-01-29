/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DatePicker } from "antd";
import { useCallback } from "react";
import { RangePickerProps } from "antd/lib/date-picker/generatePicker";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import { twMerge } from "tailwind-merge";

type Props = {
  onChange?: (time: string | null, timeString: string) => void;
  value?: any;
  className?: string;
} & RangePickerProps<any>;

const ProDatePicker = ({ onChange, value, className, ...props }: Props) => {
  const handleOnChange = useCallback(
    (value: any) => {
      onChange && onChange(value ? value : null, value);
    },
    [onChange]
  );

  return (
    <DatePicker
      {...(props as any)}
      value={value}
      format="DD/MM/YYYY"
      locale={th_TH}
      placeholder="Enter Date"
      onChange={handleOnChange}
      className={twMerge(
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2",
        className
      )}
    />
  );
};

export default ProDatePicker;
