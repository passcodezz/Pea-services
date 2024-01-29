/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "flowbite-react";
import ReactPaginate from "react-paginate";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type Props = {
  onPageChange?: (page: number) => void;
  currentPage: number;
  total_pages: number;
  total_elements: number;
  pageSize: number;
  dataSize: number;
};
const Pagination = ({
  pageSize,
  total_pages,
  total_elements,
  currentPage,
  onPageChange,
  dataSize,
}: Props) => {
  const pageCount = total_pages;
  const theme = useTheme();
  const handlePageClick = (event: any) => {
    onPageChange && onPageChange(event);
  };
  // console.log(currentPage);

  return (
    <div className="flex flex-row justify-between items-center px-8 py-4 w-full">
      {!!total_pages && (
        <PageSize
          total_pages={total_pages}
          currentPage={currentPage}
          pageSize={pageSize}
          dataSize={dataSize}
          total_elements={total_elements}
        />
      )}
      <ReactPaginate
        forcePage={currentPage}
        breakLabel="..."
        containerClassName={theme.theme.pagination.pages.base}
        pageClassName={theme.theme.pagination.pages.selector.base}
        pageLinkClassName="h-9 w-full flex flex-1 justify-center items-center"
        previousLinkClassName="h-9 w-full flex flex-1 justify-center items-center"
        nextLinkClassName="h-9 w-full flex flex-1 justify-center items-center"
        breakLinkClassName="h-9 w-full flex flex-1 justify-center items-center"
        breakClassName={theme.theme.pagination.pages.selector.base}
        previousClassName={theme.theme.pagination.pages.previous.base}
        nextClassName={theme.theme.pagination.pages.next.base}
        onPageChange={handlePageClick}
        activeLinkClassName={theme.theme.pagination.pages.selector.active}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<HiOutlineChevronLeft />}
        nextLabel={<HiOutlineChevronRight />}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;

type PageSizeProps = {
  currentPage: number;
  total_pages: number;
  total_elements: number;
  pageSize: number;
  dataSize: number;
};
const PageSize = ({
  total_elements,
  currentPage,
  dataSize,
  pageSize,
}: PageSizeProps) => {
  const showStart = currentPage * pageSize + 1;
  const showEnd = showStart + dataSize - 1;
  return (
    <div>
      <span className="text-gray-500 text-sm font-normal  leading-tight">
        Showing{" "}
      </span>
      <span className="text-gray-900 text-sm font-semibold  leading-tight">
        {/* {`1-${currentPage * pageSize}`} */}
        {`${showStart} - ${showEnd}`}
      </span>
      <span className="text-gray-500 text-sm font-normal  leading-tight">
        {" "}
        of{" "}
      </span>
      <span className="text-gray-900 text-sm font-semibold  leading-tight">
        {total_elements}
      </span>
    </div>
  );
};
