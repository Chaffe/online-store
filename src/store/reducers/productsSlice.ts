import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/models/IProduct";
import { products } from "@/pages/api/products.json";

export type ProductsJSON = typeof products;

interface ProductsState {
  products: IProduct[],
  isLoading: boolean,
  error: string
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addAllProductsAction(state, action: PayloadAction<ProductsJSON>) {
      state.products = action.payload;
    },
    addProductAction(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
    editProductAction(state, action: PayloadAction<IProduct>) {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return {
            id: action.payload.id,
            title: action.payload.title,
            price: action.payload.price
          }
        } else {
          return product
        }
      });
    },
    removeProductAction(state, action: PayloadAction<string>) {
      state.products = state.products.filter(({ id }) => id !== action.payload)
    }
  }
});

export const { addAllProductsAction, addProductAction, editProductAction, removeProductAction } = productsSlice.actions;
export default productsSlice.reducer;