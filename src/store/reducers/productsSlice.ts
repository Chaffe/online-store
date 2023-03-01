import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/models/IProduct";
import fetchProducts from "@/store/actions/fetchProducts";

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
    addProductAction(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
    editProductAction(state, action: PayloadAction<IProduct>) {
      state.products = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return {
            _id: action.payload._id,
            title: action.payload.title,
            price: action.payload.price,
            imageUrl: action.payload?.imageUrl
          }
        } else {
          return product
        }
      });
    },
    removeProductAction(state, action: PayloadAction<string>) {
      state.products = state.products.filter(({ _id }) => _id !== action.payload)
    }
  },
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, action: PayloadAction<IProduct[]>) => {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload
    },
    [fetchProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { addProductAction, editProductAction, removeProductAction } = productsSlice.actions;

export default productsSlice.reducer;