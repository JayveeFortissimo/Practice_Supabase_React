import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState = {
   acces_token:"",
};

export const userAuthentication = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    setAccesToken: (state,action:PayloadAction<string>) =>{
      state.acces_token = action.payload;
      console.log(state.acces_token);
    }
  },
});

export default userAuthentication.reducer;

export const {setAccesToken} = userAuthentication.actions;
