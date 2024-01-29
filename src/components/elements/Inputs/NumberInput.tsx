/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useNumberInput from "@hooks/userNumberInput";
import { TextInput, TextInputProps } from "flowbite-react";
import { Ref, forwardRef } from "react";

type Props = {} & TextInputProps;

const NumberInput = (props: Props, ref: Ref<any>) => {
  const { onChange, value } = props;
  const numberHook = useNumberInput({ onChange, value });
  return <TextInput {...props} {...numberHook} ref={ref} />;
};

export default forwardRef(NumberInput);
