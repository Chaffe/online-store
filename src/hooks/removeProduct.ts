import axios from "@/api/axios";
import {removeProductAction} from "@/store/reducers/productsSlice";
import { AppDispatch } from "@/store";

const removeProduct = async (dispatch: AppDispatch, _id: string) => {
  try {
    const { data } = await axios.delete(`products/${_id}`)

    if (data.success) {
      dispatch(removeProductAction(_id));
    }
  } catch (err) {
    console.log(err);
  }
}

export default removeProduct;