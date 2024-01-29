/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { TimePicker } from "antd";
import { useCallback, useState } from "react";
import { RangePickerProps } from "antd/lib/date-picker/generatePicker";

type Props = {
  onChange?: (time: string | null, timeString: string) => void;
  value?: string | null;
} & RangePickerProps<any>;

const format = "HH:mm";
const ProTimePicker = ({ onChange, value, ...props }: Props) => {
  const { RangePicker } = TimePicker;
  const [valueTime, setValueTime] = useState(value);

  const handleOnChange = useCallback(
    (time: any) => {
      setValueTime(time);
      onChange && onChange(time[0] && time[1] !== "" ? time : null, time);
    },
    [onChange]
  );

  return (
    <RangePicker
      {...props}
      value={valueTime ? valueTime : value}
      style={{ width: "100%" }}
      size="large"
      format={format}
      onChange={handleOnChange}
    />
  );
};

export default ProTimePicker;
