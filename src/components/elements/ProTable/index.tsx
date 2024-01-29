/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table } from "flowbite-react";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import SearchForm, { SearchFormProps } from "./components/SearchForm";
import { ColumnType, PaginationType } from "@hooks/useProTable";
import { ReactElement } from "react";
import TableFooter from "./components/TableFooter";
import _ from "lodash";
import { ReactComponent as NoDataIcon } from "@assets/images/icons/no-data.svg";
import { useTranslation } from "react-i18next";
// import TableSum from "./components/TableSum";
export type TableScroll = {
  x?: number | string;
  y?: number | string;
};
export type ProTableProps = {
  columns: ColumnType[];
  // dataSource: T[];
  dataSource: any[];
  dataSourceSum?: any[];
  itemKeys: string[];
  className?: string;
  actions?: ReactElement[];
  hiddenSearch?: boolean;
  searchFormProps?: SearchFormProps;
  pagination: PaginationType;
  onPageChange?: (page: number) => void;
  scroll?: TableScroll;
  onSearch?: (...arg: any) => void;
  onSortData: (colName: string, sortOrder: string) => void;
  renderResult?: (data?: any) => React.ReactElement;
  dataSum?: boolean;
  searchFormRef?: React.ForwardedRef<any>;
  onClear?: () => void;
};

const ProTable = (props: ProTableProps) => {
  const {
    columns,
    dataSource,
    // dataSourceSum,
    itemKeys,
    className,
    actions,
    hiddenSearch,
    searchFormProps,
    pagination,
    onPageChange,
    scroll,
    onSearch,
    onSortData,
    renderResult,
    searchFormRef,
    onClear,
    // dataSum,
  } = props;
  const columnIsDisplays = _.filter(columns, ({ hidden }) => !hidden);
  // const columnIsSum = _.filter(columns, ({ showSum }) => !showSum);
  const { t } = useTranslation();
  const scrollStyle: Record<string, number | string> = {};

  if (scroll?.x) {
    scrollStyle["maxWidth"] = scroll?.x;
    scrollStyle["overflowX"] = "auto";
  }
  if (scroll?.y) {
    scrollStyle["maxHeight"] = scroll?.y;
    scrollStyle["overflowY"] = "auto";
  }

  return (
    <div
      className={`flex flex-col gap-2 h-full ${renderResult && "lg:h-[900px]"}`}
    >
      {!!actions?.length && (
        <div className="flex flex-row justify-end mr-8 ">{actions}</div>
      )}

      {!hiddenSearch && (
        <SearchForm
          {...searchFormProps}
          columns={columns}
          onSearch={onSearch}
          onClear={onClear}
          ref={searchFormRef}
        />
      )}

      {renderResult && renderResult()}

      {dataSource?.length === 0 && (
        <div className="flex flex-col items-center bg-gray-100 h-full justify-center">
          <NoDataIcon />
          <b className="mt-6">{t("common.no_data")}</b>
          <span
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: t("common.no_data_sub"),
            }}
          />
        </div>
      )}

      {dataSource?.length > 0 && (
        <>
          <div className="flex flex-col mt-6" style={scrollStyle}>
            <Table className={className}>
              <TableHeader columns={columnIsDisplays} onSortData={onSortData} />
              <TableBody
                itemKeys={itemKeys}
                columns={columnIsDisplays}
                dataSource={dataSource}
              />
              {/* {dataSum && (
                <TableSum
                  itemKeys={itemKeys}
                  columns={columnIsSum}
                  dataSource={dataSourceSum!}
                  classNames=" bg-gray-100"
                />
              )} */}
            </Table>
          </div>
          {/* {dataSum && (
            <div className="flex flex-col mt-6" style={scrollStyle}>
              <Table className="">
                <TableBody
                  itemKeys={itemKeys}
                  columns={columnIsDisplays}
                  dataSource={dataSource}
                />
              </Table>
            </div>
          )} */}
          <div>
            <TableFooter
              dataSize={dataSource?.length}
              pageSize={pagination.size}
              currentPage={pagination.page}
              total_pages={pagination.total_pages}
              total_elements={pagination.total_elements}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProTable;
