import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from "@/store/reducers/authSlice";
import ProductsSlice from "@/store/reducers/productsSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  products: ProductsSlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']