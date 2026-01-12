import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface States {
  access_token: string;
  isLoading: boolean;
  user_id: string;
}

const initialState: States = {
  access_token: "",
  isLoading: true,
  user_id:""
};

export const userAuthentication = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    setAccesToken: (state, action: PayloadAction<{accessToken:string, userId:string}>) => {
      state.access_token = action.payload.accessToken;
      state.user_id = action.payload.userId;
    },
  },
});

export default userAuthentication.reducer;

export const { setAccesToken } = userAuthentication.actions;
