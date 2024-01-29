/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AlertTokenExpire from "@elements/AlertCommonContent/AlertTokenExpire";
import { Modal } from "antd";
import { createElement } from "react";
type Config = {
  onOk?: (modal?: any) => void;
  onCancel?: (modal?: any) => void;
};

const tokenExpire = (config: Config) => {
  const modal = Modal.confirm({
    centered: true,
    icon: null,
    width: "479px",
    open: false,
    wrapClassName: "custom-modal",
  });
  modal.update({
    content: createElement(AlertTokenExpire, { ...config, modal }),
  });
  return modal;
};

const AlertUtil = {
  tokenExpire,
};
export default AlertUtil;
