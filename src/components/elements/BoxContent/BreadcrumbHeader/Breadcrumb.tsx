import React from "react";
import { ReactComponent as ChevronRightIcon } from "@assets/images/icons/chevron-right.svg";
import { ReactComponent as HomeIcon } from "@assets/images/icons/home.svg";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export type BreadcrumbItem = {
  label: string;
  to?: string;
  icon: React.FunctionComponent;
};
export type BreadcrumbProps = {
  items?: BreadcrumbItem[];
};
const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props;
  return (
    <nav
      className={twMerge(
        "bg-sky-900 flex px-5 py-3 text-neutral-50 rounded-lg"
      )}
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-bold text-neutral-50 hover:text-neutral-100 dark:text-gray-400 dark:hover:text-white"
          >
            <HomeIcon className="mr-2.5" color="white" />
            Home
          </Link>
        </li>
        {items?.map((item, index) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRightIcon />
                {(() => {
                  if (!item?.to) {
                    return (
                      <Link
                        to={item?.to || "'"}
                        className="ml-1 text-sm font-bold text-neutral-50 hover:text-neutral-100 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        {item?.label || "-"}
                      </Link>
                    );
                  }
                  return (
                    <span className="ml-1 text-sm font-bold text-neutral-50 md:ml-2 dark:text-gray-400">
                      Flowbite
                    </span>
                  );
                })()}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
