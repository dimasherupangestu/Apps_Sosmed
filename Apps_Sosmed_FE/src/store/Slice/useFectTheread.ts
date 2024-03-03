import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../types/TypeData";

const data: Thread[] = [];
const initialState = {
  data,
};

export const useFectTheread = createSlice({
  name: "fectThread",
  initialState,
  reducers: {
    Fetch_Thread: (state, action) => {
      state.data = action.payload.data;
    },
  },
});
export const { Fetch_Thread } = useFectTheread.actions;
export default useFectTheread.reducer;
