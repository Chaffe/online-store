import React from 'react';
import Link from "next/link";
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
} from '@chakra-ui/react';
import NavigationMenu from "./NavigationMenu";


const Navigation = () => {
  return (
    <Flex justify="center" pt="6" pb="6">
      <Breadcrumb separator="">
        <BreadcrumbItem isCurrentPage>
          <Link href="/">Home</Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <NavigationMenu />
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};

export default Navigation;