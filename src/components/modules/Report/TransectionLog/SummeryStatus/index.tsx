/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  cardClass?: string;
  desc?: ReactNode;
  sumStatus?: any;
};

const SummaryStatus = ({ sumStatus, desc, cardClass }: Props) => {
  return (
    <div
      className={twMerge(
        "rounded-2xl flex flex-col p-5 gap-2.5 xl:w-32 text-center",
        cardClass
      )}
    >
      <div className="text-base font-semibold">{sumStatus}</div>
      <div className=" text-xs font-medium">{desc}</div>
    </div>
  );
};

export default SummaryStatus;
