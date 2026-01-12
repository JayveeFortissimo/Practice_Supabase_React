import { configureStore } from "@reduxjs/toolkit";
import userAuthentication from "./authentication";
import createBlog from "./blogs";

export const store = configureStore({
  reducer: { userAuthentication, createBlog },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
