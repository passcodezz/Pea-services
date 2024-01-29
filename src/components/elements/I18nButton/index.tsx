import { Button, ButtonProps } from "flowbite-react";
import { TFunction } from "i18next";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export type I18nButtonProps = {
  text?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  children?: (t: TFunction) => ReactElement;
} & ButtonProps;

const I18nButton = ({
  children,
  text,
  startIcon,
  endIcon,
  ...props
}: I18nButtonProps) => {
  const { t } = useTranslation();
  if (children)
    return (
      <Button {...props}>
        <div className="flex items-center gap-x-2">
          {startIcon && startIcon}
          {children(t)}
          {endIcon && endIcon}
        </div>
      </Button>
    );
  return (
    <Button {...props}>
      <div className="flex items-center gap-x-2">
        {startIcon && startIcon}
        {t(text || "")}
        {endIcon && endIcon}
      </div>
    </Button>
  );
};

export default I18nButton;
