/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from "@reduxjs/toolkit";
export interface ProfileState extends Profile.Data {}

export const profile = createSlice({
  name: "profile",
  initialState: null as any,
  reducers: {
    setProfile: (_: any, param: any) => {
      return param?.payload;
    },
  },
});

export const { setProfile } = profile.actions;

export default profile.reducer;
