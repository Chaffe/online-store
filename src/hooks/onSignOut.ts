import { logout } from "@/store/reducers/authSlice";
import { AppDispatch } from "@/store";

const onSignOut = (dispatch: AppDispatch) => {
  dispatch(logout());
  localStorage.removeItem('token');
}

export default onSignOut;