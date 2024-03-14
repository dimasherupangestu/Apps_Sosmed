import { createSlice } from "@reduxjs/toolkit";
import { ThreadOne } from "../../types/TypeData";

const data: ThreadOne = {
  id: 0,
  content: "",
  image: "",
  likes: 0,
  isLike: false,
  replies: [],
  created_at: "",
  author: {
    id: 0,
    name: "",
    username: "",
    picture: "",
  },
};
const initialState = {
  data,
};

export const useSliceTheredOne = createSlice({
  name: "sliceTheredOne",
  initialState,
  reducers: {
    GET_THREAD_One: (state, action) => {
      state.data = action.payload.data;
      console.log("tes", action.payload.data);
    },
  },
});

export const { GET_THREAD_One } = useSliceTheredOne.actions;
export default useSliceTheredOne.reducer;
