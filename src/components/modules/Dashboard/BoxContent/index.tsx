import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
} & PropsWithChildren;

const BoxContent = ({ className, children }: Props) => {
  return (
    <div
      className={twMerge(
        "bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(238,238,238,0.50)] border border-gray-[#F8F9FA]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BoxContent;
