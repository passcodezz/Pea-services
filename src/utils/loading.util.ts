/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal,Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { createElement } from "react";

const antIcon = createElement(LoadingOutlined, {
  spin: true,
  style: { fontSize: 100 },
});
const wrapper = createElement<any>(Spin, {
  indicator: antIcon,
});
export class LoadingUtil {
  private static instance: LoadingUtil;
  private modal: any;
  public static getInstance(): LoadingUtil {
    if (!LoadingUtil.instance) {
      LoadingUtil.instance = new LoadingUtil();
      LoadingUtil.instance.modal = Modal.info({
        content: wrapper,
        centered: true,
        icon: null,
        width: "auto",
        open: false,
        wrapClassName: "app-loading",
      });
    }
    return LoadingUtil.instance;
  }

  public show() {
    this.modal.update({
      open: true,
    });
  }
  public hidden() {
    this.modal?.destroy();
  }
}

export const reduxApiLoading = {
  onQueryStarted: () => {
    LoadingUtil.getInstance().show();
  },
  transformErrorResponse: (res: any) => {
    LoadingUtil.getInstance().hidden();
    return res;
  },
  transformResponse: (res: any) => {
    LoadingUtil.getInstance().hidden();
    return res;
  },
};
