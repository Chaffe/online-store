import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/models/IUser";

interface UserState {
  user: IUser | null,
  isLoading: boolean,
  error: string
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.isLoading = false;
          state.error = '';
          state.user = action.payload
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.user = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.user = null;
        }
      )
  }
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;