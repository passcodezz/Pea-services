/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from "lodash";
import { ChangeEventHandler, useCallback, useMemo, useRef } from "react";
import numeral from "numeral";
type UseNumberInputConfig = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  format?: string;
};
const useNumberInput = (config: UseNumberInputConfig) => {
  const { onChange, value, format = "0,0" } = config;
  const isFirst = useRef<boolean>();
  const newValue = useMemo(() => {
    let formatValue = value;
    if (!isFirst.current) {
      isFirst.current = true;
      formatValue = numeral(formatValue).format(format);
    }
    return formatValue;
  }, [value, format]);
  const handleOnChange = useCallback(
    (e: any) => {
      if (_.size(e?.target?.value)) {
        e.target.value = _.replace(e.target.value, /\D/g, "");
        if (e.target.value)
          e.target.value = numeral(e.target.value).format(format);
      }
      onChange && onChange(e);
    },
    [onChange, format]
  );

  return {
    onChange: handleOnChange,
    value: newValue,
  };
};
export default useNumberInput;
