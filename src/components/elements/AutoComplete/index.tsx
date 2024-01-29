/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useTheme } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import _ from "lodash";

type ItemsType = { label: string; value: any };
export type AutoCompleteProps = {
  onChange?: (value: any) => void;
  value?: any;
  defaultValue?: any;
  options?: ItemsType[];
  placeholder?: string;
};
const AutoComplete = ({
  onChange,
  value,
  defaultValue,
  options,
  placeholder,
}: AutoCompleteProps) => {
  const [query, setQuery] = useState("");
  const theme = useTheme();
  const filteredPeople: any =
    query === ""
      ? options
      : _.filter(options, (item: ItemsType) =>
          item.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div>
      <Combobox defaultValue={defaultValue} value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className={twMerge(
              "relative w-full cursor-default overflow-hidden",
              theme.theme.textInput.field.input.base,
              theme.theme.textInput.field.input.withAddon.off,
              theme.theme.textInput.field.input.colors.auto
            )}
            displayValue={(item: any) => {
              return _.find(options, { value: item })?.label || "";
            }}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-[3]">
              {filteredPeople?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople?.map((item: ItemsType) => (
                  <Combobox.Option
                    key={item.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-2 ${
                        active ? "bg-primary-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
export default AutoComplete;
