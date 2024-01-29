/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoadingUtil } from "./loading.util";

export const trackingAsync = async (
  funAsync: () => Promise<any>,
  config?: HttpUtilType.TrackAsyncConfig
) => {
  try {
    LoadingUtil.getInstance().show();
    const res = await funAsync();
    if (!res?.error) {
      config?.onSuccess && config?.onSuccess(res);
    } else {
      config?.onError && config?.onError(res?.error);
    }
    LoadingUtil.getInstance().hidden();
    return res;
  } catch (error) {
    config?.onError && config?.onError(error);
    LoadingUtil.getInstance().hidden();
  }
};
