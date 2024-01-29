/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useDispatch } from "react-redux";
import { UseFormReturn } from "react-hook-form";
import { TableCellProps } from "flowbite-react";
import {
  ComponentProps,
  useLayoutEffect,
  useRef,
  ReactElement,
  useCallback,
  useState,
} from "react";

export type PaginationType = {
  last?: true;
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
};

export type InputType = {
  type?: string;
  name: string;
  hidden?: boolean;
  label?: string;
  className?: string;
  props?: ComponentProps<"input">;
  renderItem?: (
    form: UseFormReturn,
    key?: string | number | any
  ) => ReactElement;
};

export type ColumnType = {
  dataIndex: string;
  key: string;
  title?: string;
  inputConfig?: InputType;
  hidden?: boolean;
  showSum?: boolean;
  headerClassName?: string;
  bodyClassName?: string;
  cellProps?: TableCellProps;
  sort?: boolean;
  render?: (data: any, row: any) => ReactElement | string;
};
type SearchConfigType = {
  isClear?: boolean;
};
type UseProTableReturnType<T> = {
  dataSource: T[];
  pagination: PaginationType;
  onSearch: (params?: any) => void;
  loading?: boolean;
  searchFormRef: any;
  columns: ColumnType[];
  onPageChange: (page: number) => void;
  onSortData: (colName: string, sortOrder: string) => void;
  onClear: () => void;
};

type onSortData = (colName: string, sortOrder: string) => void;

type UseProTableConfigType = {
  initialReq?: any;
  manual?: boolean;
  columns: ColumnType[];
};

type SortingType = {
  colName?: string | undefined;
  sortOrder?: string | undefined;
};

const useProTable = <T extends Object>(
  apiFunc?: any,
  config?: UseProTableConfigType
): UseProTableReturnType<T> => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const searchFormRef = useRef<any>();
  const initPagination: PaginationType = {
    page: 0,
    size: 10,
    total_elements: 0,
    total_pages: 0,
  };
  const initSortData: SortingType = {
    sortOrder: "D",
    colName: "update_date",
  };
  const sorting = useRef(initSortData);
  const pagination = useRef(initPagination);

  useLayoutEffect(() => {
    if (config?.manual) {
      onSearch();
    }
    return () => {};
  }, [config?.manual]);

  const onPageChange = useCallback((p: any) => {
    pagination.current.page = p.selected;
    onSearch();
  }, []);

  const onSortData: onSortData = useCallback(
    (colName: string, sortOrder: string) => {
      sorting.current.colName = colName;
      sorting.current.sortOrder = sortOrder;
      onSearch();
    },
    []
  );

  const onClear = useCallback(async () => {
    pagination.current = initPagination;
    sorting.current = initSortData;
    // searchFormRef.current.reset(),
    onSearch();
  }, [initPagination, initSortData]);

  const onSearch = useCallback(
    async (config?: SearchConfigType) => {
      try {
        setIsLoading(true);
        if (config?.isClear) {
          pagination.current = initPagination;
          sorting.current = initSortData;
        }
        const { page, size } = pagination.current;
        const { colName, sortOrder } = sorting.current;
        const res = await dispatch(
          apiFunc({
            page: page,
            size: size,
            sort: sortOrder,
            sort_field: colName,
            ...searchFormRef.current.getValues(),
          })
        );

        if (res.data.status === true) {
          setDataSource(res?.data);
        }
        // if (res.data.status !== true) {
        //   console.log(res);
        // }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
    [apiFunc, dispatch, initPagination, initSortData]
  );

  const returnData: UseProTableReturnType<T> = {
    columns: config?.columns || [],
    dataSource: dataSource?.datas,
    pagination: { ...pagination.current, ...dataSource?.page },
    loading: isLoading,
    searchFormRef: searchFormRef,
    onClear,
    onSearch,
    onPageChange,
    onSortData,
  };
  return returnData;
};

export default useProTable;
