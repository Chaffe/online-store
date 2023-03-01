import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/api/axios";
import { IUser } from "@/models/IUser";

export interface IFetchLogin {
  email: string,
  password: string
}

const fetchLogin = createAsyncThunk(
  'user/fetchUser',
  async (params: IFetchLogin) => {
    try {
      const { data } = await axios.post<IUser>('/auth/login', params);
      return data;
    } catch (err) {
      console.log(err);
      // return thunkApi.rejectWithValue(err);
    }
  }
);

export default fetchLogin;