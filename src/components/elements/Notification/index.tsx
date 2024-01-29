/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";

export const NotificationSuc = (description?: string) => {
  notification.success({
    className: "bg-green-100 text-green-600 font-family: Inter;",
    message: (
      <span style={{ fontWeight: 600, color: "rgb(22 163 74)" }}>SUCCESS!</span>
    ),
    description: description || `Save Successfully`,
    placement: "bottomRight",
  });
};
export const NotificationDel = () => {
  notification.success({
    className: "bg-green-100 text-green-600 font-family: Inter;",
    message: (
      <span style={{ fontWeight: 600, color: "rgb(22 163 74)" }}>SUCCESS!</span>
    ),
    description: `Deleted Successfully`,
    placement: "bottomRight",
  });
};
export const NotificationError = (description: string) => {
  notification.error({
    className: "bg-red-50 text-red-500 font-family: Inter;",
    message: (
      <span style={{ fontWeight: 600, color: " rgb(239 68 68)" }}>ERROR!</span>
    ),
    description: description,
    placement: "bottomRight",
  });
};
