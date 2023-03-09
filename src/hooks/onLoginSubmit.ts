import fetchLogin from "@/store/actions/fetchLogin";
import { AppDispatch } from "@/store";

type TSignInSubmit = (dispatch: AppDispatch, email: string, password: string) => void;

const onLoginSubmit: TSignInSubmit = async (dispatch, email, password) => {
  const responseData = {
    email,
    password
  };

  // TODO: Type payload
  const { payload }: any = await dispatch(fetchLogin(responseData));

  if (payload) {
    localStorage.setItem('token', payload.token);
  }
};

export default onLoginSubmit;