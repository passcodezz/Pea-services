import {
  Card,
  CardProps,
  DeepPartial,
  FlowbiteCardTheme,
} from "flowbite-react";
const theme: DeepPartial<FlowbiteCardTheme> = {
  root: {
    base: "flex rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800  overflow-hidden",
    children: "flex h-full flex-col p-4",
  },
};
type BoxContentProps = {
  cardProps?: CardProps;
  title?: string;
} & CardProps;
const BoxContent = ({ children, title, ...props }: BoxContentProps) => {
  return (
    <Card theme={theme} {...props}>
      {title && (
        <h4 className="text-gray-900 text-xl font-semibold">
          <p>{title}</p>
        </h4>
      )}
      {children}
    </Card>
  );
};

export default BoxContent;
