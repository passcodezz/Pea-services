/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  FunctionComponent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "flowbite-react";
import FormItem from "@elements/FormItem";
import { ColumnType } from "@hooks/useProTable";
import { useTranslation } from "react-i18next";
import { ReactComponent as DownLodeIcon } from "@assets/images/icons/download.svg";
const INPUTS: Record<string, FunctionComponent> = {
  text: TextInput,
};
// type SearchFormRef = {};
type SearchFooterType = "clear" | "search" | "export";
type Props = {
  columns: ColumnType[];
} & SearchFormProps;
export type SearchFormProps = {
  searchFooter?: SearchFooterType[];
  searchTitle?: string;
  onSearch?: (...arg: any) => void;
  onClear?: () => void;
};

const SearchForm = forwardRef(
  (
    {
      columns,
      searchFooter = ["clear", "search"],
      searchTitle,
      onSearch,
      onClear,
    }: Props,
    ref: any
    // ref: Ref<SearchFormRef>
  ) => {
    const form = useForm();
    const { control, setValue, resetField, reset, handleSubmit, getValues } =
      form;
    const formItems: ColumnType[] = useMemo(() => {
      return columns?.filter(({ inputConfig }) => !!inputConfig);
    }, [columns]);
    const { t } = useTranslation();

    const onSubmit = useCallback(
      (formData: any) => {
        onSearch && onSearch(formData);
      },
      [onSearch]
    );

    const handleOnClear = useCallback(() => {
      reset();
      onClear && onClear();
      // onSearch && onSearch(null, { isClear: true });
    }, [onClear, reset]);

    useImperativeHandle(
      ref,
      () => ({
        onSubmit,
        setValue,
        resetField,
        reset,
        getValues,
      }),
      []
    );

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 px-4">
          {searchTitle && (
            <div className="text-gray-900 text-2xl font-bold">
              {searchTitle}
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap gap-3">
              {formItems?.map((item, index) => {
                if (item?.inputConfig?.renderItem) {
                  return item?.inputConfig?.renderItem(form, index);
                }
                if (!item?.inputConfig?.type) return <></>;
                const Component: any = INPUTS[item?.inputConfig?.type || ""];
                return (
                  <FormItem
                    label={item?.title || item?.inputConfig?.label}
                    control={control}
                    key={index}
                    name={item?.inputConfig?.name || ""}
                    className={item?.inputConfig?.className}
                  >
                    <Component {...item?.inputConfig?.props} />
                  </FormItem>
                );
              })}
              {searchFooter?.length > 0 && (
                <div className="flex flex-row justify-end gap-2 mt-11">
                  {searchFooter?.includes("search") && (
                    <Button
                      color="primary"
                      className="w-[100px] h-10 capitalize"
                      type="submit"
                    >
                      {t("btn.search")}
                    </Button>
                  )}
                  {searchFooter?.includes("clear") && (
                    <Button
                      color="light"
                      className="w-[100px] h-10 capitalize bg-[#1b69fd1a] text-[#1B69FD]"
                      type="reset"
                      onClick={handleOnClear}
                    >
                      {t("btn.clear")}
                    </Button>
                  )}
                  {searchFooter?.includes("export") && (
                    <Button
                      color="primary"
                      className="w-[100px] h-10 capitalize"
                      type="reset"
                      onClick={() => alert("Export Coming Soon...")}
                    >
                      <DownLodeIcon />
                      <span> Export</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default SearchForm;
