import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  access_token: "",
};

export const userAuthentication = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    setAccesToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
      console.log(state.access_token);
    },
  },
});

export default userAuthentication.reducer;

export const { setAccesToken } = userAuthentication.actions;
