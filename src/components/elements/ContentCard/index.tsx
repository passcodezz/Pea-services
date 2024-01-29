import {
  Card,
  CardProps,
  DeepPartial,
  FlowbiteCardTheme,
} from "flowbite-react";

const theme: DeepPartial<FlowbiteCardTheme> = {
  root: {
    base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800  overflow-hidden",
    children: "flex h-full flex-col justify-center",
  },
};

type BreadcrumbHeaderProps = {
  title?: string;
};

type BreadcrumbFooterProps = {
  action?: React.ReactElement;
};

type BoxContentProps = {
  cardProps?: CardProps;
  headerProps?: BreadcrumbHeaderProps;
  footerProp?: BreadcrumbFooterProps;
} & CardProps;
const ContentCard = ({
  children,
  headerProps,
  footerProp,
  ...props
}: BoxContentProps) => {
  return (
    <Card theme={theme} {...props}>
      {headerProps && (
        <div className="p-5 rounded-tl-lg rounded-tr-lg shadow items-center inline-flex">
          <h1 className="text-gray-900 text-2xl font-semibold">
            {headerProps.title}
          </h1>
        </div>
      )}
      {children}
      {footerProp && (
        <div className="items-center inline-flex border-t py-5 px-10 shadow">
          {footerProp.action}
        </div>
      )}
    </Card>
  );
};

export default ContentCard;
