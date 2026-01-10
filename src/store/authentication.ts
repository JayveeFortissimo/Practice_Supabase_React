import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface States {
  access_token: string;
  isLoading: boolean;
}

const initialState: States = {
  access_token: "",
  isLoading: true,
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
