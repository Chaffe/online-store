import axios from "@/api/axios";
import { addProductAction } from "@/store/reducers/productsSlice";
import getImageUrl from "@/hooks/getImageUrl";
import { AppDispatch } from "@/store";

const addProduct = async (
  dispatch: AppDispatch,
  onClose: any,
  title: string,
  price: number,
  imageUrl: string
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

    const { data } = await axios.post('/products', requestData);

    if (data) {
      dispatch(addProductAction({
        _id: data._id,
        ...requestData
      }))
    }
  } catch (err) {
    console.log(err);
  }

  onClose();
}

export default addProduct;