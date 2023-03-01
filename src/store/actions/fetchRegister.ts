import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/api/axios";
import { IUser } from "@/models/IUser";

interface IFetchRegister {
  email: string,
  password: string,
  fullName: string
}

const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async(params: IFetchRegister) => {
    try {
      const { data } = await axios.post<IUser>('/auth/register', params);
      return data;
    } catch (err) {
      console.log(err);
      // return thunkApi.rejectWithValue(err);
    }
  }
);

export default fetchRegister;