import React from 'react';
import { MenuItem } from "@chakra-ui/react";
import { useAppDispatch } from "@/hooks/redux";
import onSignOut from "@/hooks/onSignOut";

const SignOut = () => {
  const dispatch = useAppDispatch();

  return (
    <MenuItem onClick={() => onSignOut(dispatch)}>Sign Out</MenuItem>
  );
};

export default SignOut;