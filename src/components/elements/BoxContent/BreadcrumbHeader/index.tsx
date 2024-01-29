import Breadcrumb, { BreadcrumbProps } from "./Breadcrumb";
export type BreadcrumbHeaderProps = {
  title?: string;
  subTitle?: string;
} & BreadcrumbProps;
const BreadcrumbHeader = (props: BreadcrumbHeaderProps) => {
  const { title, subTitle, items } = props;
  return (
    <div className="p-5 bg-blue-800 rounded-tl-lg rounded-tr-lg shadow border-b-2 border-blue-800 justify-between items-center inline-flex">
      <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-1 inline-flex">
        <div className="self-stretch text-neutral-100 text-xl font-700 ">
          {title || "-"}
        </div>
        <div className="self-stretch text-primary-4 text-sm font-700">
          {subTitle || "-"}
        </div>
      </div>
      <Breadcrumb items={items} />
    </div>
  );
};

export default BreadcrumbHeader;
