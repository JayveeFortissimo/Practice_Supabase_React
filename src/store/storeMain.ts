import { configureStore } from "@reduxjs/toolkit";
import userAuthentication from "./authentication";

export const store = configureStore({
  reducer: { userAuthentication },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
