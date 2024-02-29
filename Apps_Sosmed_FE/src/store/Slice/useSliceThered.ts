import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../types/TypeData";

const data: Thread[] = [];
const initialState = {
  data,
};

export const useSliceThered = createSlice({
  name: "sliceThered",
  initialState,
  reducers: {
    GET_THREAD: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { GET_THREAD } = useSliceThered.actions;
export default useSliceThered.reducer;
