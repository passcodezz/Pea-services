/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme } from "flowbite-react";
import { forwardRef, useCallback, useState } from "react";
import { ReactComponent as EyeIcon } from "@assets/images/icons/eye.svg";
import { ReactComponent as EyeSlashIcon } from "@assets/images/icons/eye-slash.svg";
import { twJoin, twMerge } from "tailwind-merge";
type Props = {
  value?: any;
  onChange?: (e: any) => void;
  name?: any;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
};

const Password = forwardRef(
  ({ readOnly, className, ...props }: Props, ref: any) => {
    const [isPassword, setIsPassword] = useState(true);
    const onPassword = useCallback(() => setIsPassword((prev) => !prev), []);
    const theme = useTheme();
    return (
      <div className={theme.theme.textInput.base}>
        <div className={theme.theme.textInput.field.base}>
          <div
            data-testid="right-icon"
            className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-auto z-50"
          >
            {isPassword ? (
              <EyeSlashIcon
                className={twMerge(
                  "cursor-pointer",
                  theme.theme.textInput.field.rightIcon.svg
                )}
                onClick={onPassword}
              />
            ) : (
              <EyeIcon
                className={twMerge(
                  "cursor-pointer",
                  theme.theme.textInput.field.rightIcon.svg
                )}
                onClick={onPassword}
              />
            )}
          </div>
          <input
            {...props}
            ref={ref}
            readOnly={readOnly}
            type={isPassword ? "password" : "text"}
            className={twJoin(
              theme.theme.textInput.field.input.base,
              theme.theme.textInput.field.input.colors.gray,
              theme.theme.textInput.field.input.withAddon.off,
              theme.theme.textInput.field.input.withRightIcon.on,
              theme.theme.textInput.field.input.sizes.md,
              className
            )}
          />
        </div>
      </div>
    );
  }
);

export default Password;
