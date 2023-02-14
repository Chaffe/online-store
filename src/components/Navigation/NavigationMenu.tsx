import React from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import SignOut from "../SignOut/SignOut";
import ArrowDown from '../../assets/icons/arrow-down.svg';

const NavigationMenu = () => {
  const { isAuth, email } = useAuth();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Image src={ArrowDown} alt="arrow-down" width={20} height={20} />}
      >
        {isAuth ? email : "Anonymous"}
      </MenuButton>
      <MenuList>
        {isAuth
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