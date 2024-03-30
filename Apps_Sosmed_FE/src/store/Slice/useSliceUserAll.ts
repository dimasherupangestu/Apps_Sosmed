import { createSlice } from "@reduxjs/toolkit";

interface UserAll {
  id: number;
  username: string;
  name: string;
  picture: string;
  bio: string;
  following?: any[];
  follower?: any[];
}
const data: UserAll[] = [];
const initialState = {
  data,
};
export const useSliceUserAll = createSlice({
  name: "sliceUsers",
  initialState,
  reducers: {
    Get_Users: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { Get_Users } = useSliceUserAll.actions;
export default useSliceUserAll.reducer;
