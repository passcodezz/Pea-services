/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export interface SiderState {
  collapsed: boolean;
}

const initialState: SiderState = {
  collapsed: false,
};

export const appSider = createSlice({
  name: "appsider",
  initialState,
  reducers: {
    onSider: (state) => {
      state.collapsed = !state.collapsed;
      return state;
    },
  },
});

export const { onSider } = appSider.actions;

export default appSider.reducer;
