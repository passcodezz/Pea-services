/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from "react-i18next";
import { Link, useMatches } from "react-router-dom";
const Header = () => {
  let matches = useMatches();
  const { t } = useTranslation();
  matches = matches?.filter(({ pathname }) => pathname !== "/");
  return (
    <nav
      className="w-full p-4 flex-col justify-start items-start gap-4 inline-flex sticky top-0 bg-white z-[5]"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </Link>
        </li>
        {matches.map((data: any, index) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {index != matches?.length - 1 && (
                  <Link
                    to={data?.pathname}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {t(`page.${data?.pathname}`)}
                  </Link>
                )}
                {index === matches?.length - 1 && (
                  <span className="ml-1 text-sm font-medium text-gray-700  md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    {t(data.params.id ? "Edit" : `page.${data?.pathname}`)}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Header;
