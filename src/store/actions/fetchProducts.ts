import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/api/axios";
import { IProduct } from "@/models/IProduct";

const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async(_, thunkApi) => {
    try {
      const { data } = await axios.get<IProduct[]>('/products');
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export default fetchProducts;