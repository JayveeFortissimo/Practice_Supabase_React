import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const userAuthentication = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {},
});

export default userAuthentication.reducer;

export const {} = userAuthentication.actions;
