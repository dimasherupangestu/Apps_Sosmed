import { createSlice } from "@reduxjs/toolkit";

export const useSliceUserAll = createSlice({
  name: "sliceUser",
  initialState: {
    id: 0,
    name: "",
    username: "",
    picture: "",
    cover_photo: "",
    bio: "",
    created_at: "",
    following: [],
    follower: [],
  },
  reducers: {
    updateAll: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.picture = action.payload.picture;
      state.cover_photo = action.payload.cover_photo;
      state.bio = action.payload.bio;
      state.created_at = action.payload.created_at;
      state.following = action.payload.following;
      state.follower = action.payload.follower;
    },
  },
});

export const { updateAll } = useSliceUserAll.actions;
export default useSliceUserAll.reducer;
