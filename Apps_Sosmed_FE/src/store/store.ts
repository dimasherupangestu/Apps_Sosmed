import { configureStore } from "@reduxjs/toolkit";
import { useSliceUser } from "./Slice/useSliceUser";
import { useSliceThered } from "./Slice/useSliceThered";
import { useSliceUserAll } from "./Slice/useSliceUserAll";
import { useFectTheread } from "./Slice/useFectTheread";

export const Store = configureStore({
  reducer: {
    userStore: useSliceUser.reducer,
    GetThread: useSliceThered.reducer,
    getUserAll: useSliceUserAll.reducer,
    FetchThread: useFectTheread.reducer,
  },
});
