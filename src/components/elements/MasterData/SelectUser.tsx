/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useGetEmailQuery } from "@redux/api/user.api";
import AutoComplete, { AutoCompleteProps } from "@elements/AutoComplete";
import _ from "lodash";

const SelectUser = (props: AutoCompleteProps) => {
  const data: any = useGetEmailQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <AutoComplete
      value={props?.value}
      placeholder={props?.placeholder}
      options={_.map(data?.data?.datas, (data) => ({
        value: data?.id,
        label: data?.email,
      }))}
      onChange={props?.onChange}
    />
  );
};

export default SelectUser;
