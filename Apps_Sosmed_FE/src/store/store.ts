import { configureStore } from "@reduxjs/toolkit";
import { useSliceUser } from "./Slice/useSliceUser";
import { useSliceThered } from "./Slice/useSliceThered";
import { useSliceUserAll } from "./Slice/useSliceUserAll";

export const Store = configureStore({
  reducer: {
    userStore: useSliceUser.reducer,
    GetThread: useSliceThered.reducer,
    getUserAll: useSliceUserAll.reducer,
  },
});
