/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  cardClass?: string;
  iconClass?: string;
  desc?: ReactNode;
  icon: any;
  sumStatus?: any;
};

const SummaryStatus = ({
  icon,
  sumStatus,
  desc,
  cardClass,
  iconClass,
}: Props) => {
  return (
    <div
      className={twMerge("rounded-2xl flex flex-col p-5 gap-2.5", cardClass)}
    >
      <div
        className={twMerge(
          "w-10 h-10 rounded-full flex flex-col justify-center items-center p-1 text-xl",
          iconClass
        )}
      >
        {icon}
      </div>
      <div className="w-60 text-greys-blue-grey-900 text-2xl font-semibold ">
        {sumStatus}
      </div>
      <div className="w-40 text-slate-600 text-base font-medium">{desc}</div>
    </div>
  );
};

export default SummaryStatus;
