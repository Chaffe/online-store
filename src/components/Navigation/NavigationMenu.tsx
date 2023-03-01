import React, {useEffect} from 'react';
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import fetchCurrentUser from "@/store/actions/fetchCurrentUser";
import SignOut from "../SignOut/SignOut";
import ArrowDown from '../../assets/icons/arrow-down.svg';

const NavigationMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [])

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Image src={ArrowDown} alt="arrow-down" width={20} height={20} />}
      >
        {user ? user.fullName : "Anonymous"}
      </MenuButton>
      <MenuList>
        {user
          ? <SignOut />
          : <>
              <Link href="/sign-in"><MenuItem>Login</MenuItem></Link>
              <Link href="/sign-up"><MenuItem>Sign Up</MenuItem></Link>
            </>
        }
      </MenuList>
    </Menu>
  );
};

export default NavigationMenu;