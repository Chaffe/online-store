import fetchRegister from "@/store/actions/fetchRegister";
import { AppDispatch } from "@/store";

type TSignUpSubmit = (dispatch: AppDispatch, email: string, password: string, fullName: string) => void;

const onRegisterSubmit: TSignUpSubmit = async (dispatch, email, password, fullName) => {
  const responseData = {
    email,
    password,
    fullName
  };

  // TODO: Type payload
  const { payload }: any = await dispatch(fetchRegister(responseData));

  if (payload) {
    localStorage.setItem('token', payload.token);
  }
}

export default onRegisterSubmit;