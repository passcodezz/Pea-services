import { FlowbitePaginationTheme } from "flowbite-react";

const pagination: FlowbitePaginationTheme = {
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
    },
  },
  pages: {
    base: "inline-flex items-center -space-x-px mb-0",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-gray-300 bg-white flex px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-r-lg border border-gray-300 bg-white flex px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    selector: {
      base: "text-sm w-12 border border-gray-300 bg-white flex leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      active: "bg-primary-100 text-primary-600 hover:bg-primary-100 text-sm",
      disabled: "opacity-50 cursor-normal",
    },
  },
};
export default pagination;
