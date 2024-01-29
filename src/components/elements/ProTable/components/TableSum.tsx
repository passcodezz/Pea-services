/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ColumnType } from "@hooks/useProTable";
import { Table } from "flowbite-react";
import { twMerge } from "tailwind-merge";

type Props<T> = {
  columns: ColumnType[];
  dataSource?: T[];
  itemKeys: string[];
  classNames?: string;
};

const TableSum = <T extends Record<string, any>>({
  columns,
  dataSource,
  itemKeys,
  classNames,
}: Props<T>) => {
  return (
    <Table.Body className="divide-y">
      {dataSource?.map((row: T, index) => {
        const rowKey = itemKeys?.map((key) => row[key])?.join("_") || index;
        return (
          <Table.Row key={rowKey}>
            {columns?.map(({ dataIndex, cellProps, key, render }) => {
              return (
                <Table.Cell
                  key={key}
                  className={twMerge(
                    "whitespace-nowrap font-medium text-gray-900 dark:text-white",
                    cellProps?.className,
                    "overflow-hidden max-w-[250px]",
                    "truncate",
                    classNames
                  )}
                >
                  {(() => {
                    if (render) {
                      return render(row[dataIndex], row);
                    }
                    return row[dataIndex];
                  })()}
                </Table.Cell>
              );
            })}
          </Table.Row>
        );
      })}
    </Table.Body>

  );
};

export default TableSum;
