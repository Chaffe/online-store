import React from 'react';
import { MenuItem} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { removeUser } from "../../store/userSlice";

const SignOut = () => {
  const dispatch = useDispatch();

  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        console.log(auth);
      }).catch(console.error);
  }

  return (
    <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
  );
};

export default SignOut;