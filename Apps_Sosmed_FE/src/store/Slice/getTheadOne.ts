import { createSlice } from "@reduxjs/toolkit";
import { ThreadOne } from "../../types/TypeData";

const data: ThreadOne = {
  id: 0,
  content: "",
  image: "",
  likes: [],
  islike: false,
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
    },
    UpdateLike: (state, action) => {
      state.data.islike = action.payload;
      state.data.likes = action.payload;
    },
  },
});

export const { GET_THREAD_One, UpdateLike } = useSliceTheredOne.actions;
export default useSliceTheredOne.reducer;
