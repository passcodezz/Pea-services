/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ColumnType } from "@hooks/useProTable";
import { Table } from "flowbite-react";
import { twMerge } from "tailwind-merge";

type Props<T> = {
  columns: ColumnType[];
  dataSource: T[];
  itemKeys: string[];
};

const TableBody = <T extends Record<string, any>>({
  columns,
  dataSource,
  itemKeys,
}: Props<T>) => {
  return (
    <Table.Body className="divide-y">
      {dataSource?.map((row: T, index) => {
        const rowKey = itemKeys?.map((key) => row[key])?.join("_") || index;
        return (
          <Table.Row key={rowKey}>
            {columns?.map(({ dataIndex, cellProps, key, render }) => {
              const cellContent = render
                ? render(row[dataIndex], row)
                : row[dataIndex];
              const truncatedContent =
                typeof cellContent === "string" && cellContent.length > 30 // Set your desired length
                  ? `${cellContent.slice(0, 30)}...`
                  : cellContent;
              return (
                <Table.Cell
                  key={key}
                  className={twMerge(
                    "whitespace-nowrap font-medium text-gray-900 dark:text-white",
                    cellProps?.className,
                    "overflow-hidden max-w-[250px]", 
                    "truncate"
                  )}
                  title={
                    cellContent !== truncatedContent ? cellContent : undefined
                  }
                  style={{
                    position: "relative",
                  }}
                >
                  {truncatedContent}
                </Table.Cell>
              );
            })}
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

export default TableBody;
