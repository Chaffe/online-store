import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice";

// const rootReducer = combineReducers({
//   user: userSlice
// })

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;