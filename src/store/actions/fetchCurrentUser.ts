import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/api/axios";
import { IUser } from "@/models/IUser";

const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async () => {
    try {
      const { data } = await axios.get<IUser>('/auth/me');
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export default fetchCurrentUser;