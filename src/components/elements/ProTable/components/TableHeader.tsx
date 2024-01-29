/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { ColumnType } from "@hooks/useProTable";
import { Table } from "flowbite-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactComponent as SortIcon } from "@assets/images/icons/sort-svgrepo.svg";

type Props = {
  columns: ColumnType[];
  onSortData: (colName: string, sortOrder: string) => void;
};

const TableHeader = ({ columns, onSortData }: Props) => {
  const [sortOrder, setSortOrder] = useState(false);
  const handleSorting = (colName: string) => {
    setSortOrder(!sortOrder);
    onSortData(colName, sortOrder ? "A" : "D");
  };

  return (
    <Table.Head>
      {columns?.map(({ title, key, headerClassName, sort }) => {
        return (
          <Table.HeadCell
            className={twMerge(
              sort ? "cursor-pointer hover:bg-gray-200 w-32" : "",
              headerClassName
            )}
            key={key}
            onClick={() => handleSorting(key)}
          >
            <div
              // className="flex items-center"
              className={twMerge("flex items-center", headerClassName)}
            >
              {title} {sort && <SortIcon className="ml-3" />}
            </div>
          </Table.HeadCell>
        );
      })}
    </Table.Head>
  );
};

export default TableHeader;
