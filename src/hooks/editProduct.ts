import axios from "@/api/axios";
import {editProductAction} from "@/store/reducers/productsSlice";
import getImageUrl from "@/hooks/getImageUrl";
import { AppDispatch } from "@/store";

const editProduct = async (
  dispatch: AppDispatch,
  onClose: () => void,
  title: string,
  price: number,
  imageUrl: string,
  _id?: string,
) => {
  try {
    const requestData = imageUrl.length > 0 ? {
      title,
      price,
      imageUrl: getImageUrl(imageUrl)
    } : {
      title,
      price,
    }

    const { data } = await axios.patch(`products/${_id}`, requestData);

    if (data.success) {
      dispatch(editProductAction({
        _id,
        ...requestData
      }))
    }
  } catch (err) {
    console.log(err);
  }

  onClose();
}

export default editProduct;