/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import { Table } from "flowbite-react";
import numeral from "numeral";
const Top5Table = ({ dataSource }: { dataSource?: any[] }) => {
  return (
    <div className="w-full h-full  overflow-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell align="center">Number of transaction</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {dataSource?.map((row, index) => {
            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{numeral(index + 1).format("00")}</Table.Cell>
                <Table.Cell>{row?.name}</Table.Cell>
                <Table.Cell align="center">
                  {numeral(row?.number_of_transaction).format("0,0")}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
export default Top5Table;
