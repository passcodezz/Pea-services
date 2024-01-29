import { configureStore } from "@reduxjs/toolkit";
import appSiderReducer from "./slices/app-sider.slice";
import profileReducer from "./slices/profile.slice";
import { authApi } from "@redux/api/auth.api";
import { apiKeyApi } from "@redux/api/apikey.api";
import { temPlateApi } from "@redux/api/template.api";
import { userApi } from "@redux/api/user.api";
import { notiApi } from "@redux/api/notiApi.api";
import { dashboardServiceApi } from "@redux/api/dashboardService.api";

export const store = configureStore({
  reducer: {
    appSider: appSiderReducer,
    profile: profileReducer,
    [authApi.reducerPath]: authApi.reducer,
    [apiKeyApi.reducerPath]: apiKeyApi.reducer,
    [temPlateApi.reducerPath]: temPlateApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [notiApi.reducerPath]: notiApi.reducer,
    [dashboardServiceApi.reducerPath]: dashboardServiceApi.reducer,
  },
  // preloadedState: preloadedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      apiKeyApi.middleware,
      temPlateApi.middleware,
      userApi.middleware,
      notiApi.middleware,
      dashboardServiceApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
