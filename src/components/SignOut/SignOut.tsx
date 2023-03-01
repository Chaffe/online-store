import React from 'react';
import { MenuItem} from "@chakra-ui/react";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/reducers/authSlice";

const SignOut = () => {
  const dispatch = useAppDispatch();

  const onSignOut = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  }

  return (
    <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
  );
};

export default SignOut;