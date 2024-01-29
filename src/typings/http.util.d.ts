/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace HttpUtilType {
  type TrackAsyncConfig = {
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
  };
}