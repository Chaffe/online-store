import React, { FC } from 'react';
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  GridItem,
  Text,
  Flex,
  Image,
  Avatar,
  Box,
  Heading,
  useDisclosure
} from "@chakra-ui/react";

import { useAppDispatch } from "@/hooks/redux";
import editProduct from "@/hooks/editProduct";
import removeProduct from "@/hooks/removeProduct";
import ProductModal from "@/components/ProductModal/ProductModal";
import { IProduct } from "@/models/IProduct";

interface IProductCard {
  product: IProduct
}

const ProductCard: FC<IProductCard> = (
  {
    product: {
      _id,
      title,
      price,
      imageUrl ,
      user
    },
  }
) => {
  const dispatch = useAppDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <GridItem w='100%' h="100%">
      {_id &&
          <Card h="100%" justifyContent="space-between">
              <Link href={_id}>
                  <CardBody>
                      <Image
                          src={imageUrl}
                          alt="Product"
                          borderRadius="lg"
                      />
                      <Text align="center">{title}</Text>
                      <Text align="center">{price}$</Text>
                  </CardBody>
              </Link>
              <CardFooter>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    {user &&
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={user.fullName} src={user.avatarUrl} />

                            <Box>
                                <Heading size='sm'>{user.fullName}</Heading>
                            </Box>
                        </Flex>
                    }
                      <Flex w="100%" gap='5'>
                          <Button onClick={onOpen}>Edit</Button>
                          <Button onClick={() => removeProduct(dispatch, _id)}>Delete</Button>
                      </Flex>
                  </Flex>
              </CardFooter>
          </Card>
      }
      <ProductModal onModalSubmit={editProduct} _id={_id} onClose={onClose} isOpen={isOpen} />
    </GridItem>
  );
};

export default ProductCard;