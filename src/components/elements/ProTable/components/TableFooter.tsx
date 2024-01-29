import Pagination from "@elements/Pagination";

type Props = {
  onPageChange?: (page: number) => void;
  currentPage: number;
  total_pages: number;
  total_elements: number;
  pageSize: number;
  dataSize: number;
};

const TableFooter = ({
  onPageChange,
  currentPage,
  pageSize,
  total_pages,
  total_elements,
  dataSize,
}: Props) => {
  return (
    <Pagination
      pageSize={pageSize}
      dataSize={dataSize}
      total_pages={total_pages}
      total_elements={total_elements}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
};

export default TableFooter;
