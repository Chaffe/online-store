import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from "@/store/reducers/userSlice";
import productsSlice from "@/store/reducers/productsSlice";

const rootReducer = combineReducers({
  user: userSlice,
  products: productsSlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']