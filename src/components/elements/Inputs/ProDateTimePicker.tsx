/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DatePicker } from "antd";
import { useCallback } from "react";
import { RangePickerProps } from "antd/lib/date-picker/generatePicker";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
// import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

type Props = {
  onChange?: (time: string | null, timeString: string) => void;
  value?: any;
  className?: string;
} & RangePickerProps<any>;

const ProDateTimePicker = ({ onChange, value, className, ...props }: Props) => {
  // const [valueDate, setValueDate] = useState(value);
  const handleOnChange = useCallback(
    (
      value: any
      //  dateString: string
    ) => {
      // setValueDate(value);
      onChange && onChange(value ? value : null, value);
      // onChange &&
      //   onChange(
      //     value ? dayjs(value).format("YYYY-MM-DDTHH:mm:ss") : null,
      //     value
      //   );
    },
    [onChange]
  );

  // useEffect(() => {
  //   if (!value) {
  //     setValueDate("");
  //   }
  // }, [value]);

  return (
    <DatePicker
      {...(props as any)}
      // value={valueDate}
      value={value ? moment(value) : null}
      showTime={{
        defaultValue: moment("00:00:00", "HH:mm:ss"),
      }}
      format="DD/MM/YYYY HH:mm:ss"
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

export default ProDateTimePicker;
