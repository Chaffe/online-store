import React, { FC } from 'react';
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
import { IProduct } from "@/models/IProduct";
import { useAppDispatch } from "@/hooks/redux";
import ProductModal from "@/components/ProductModal/ProductModal";
import Link from "next/link";
import axios from "@/api/axios";
import {addProductAction, editProductAction, removeProductAction} from "@/store/reducers/productsSlice";

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

  const editProduct = async (title: string, price: number, imageUrl: string | null) => {
    try {
      const requestData = imageUrl ? {
        title,
        price,
        imageUrl: process.env.NEXT_PUBLIC_API_URI + imageUrl
      } : {
        title,
        price,
      }

      const { data } = await axios.patch(`products/${_id}`, requestData);

      if (data.success) {
        imageUrl ? dispatch(editProductAction({
          _id,
          title,
          price,
          imageUrl: process.env.NEXT_PUBLIC_API_URI + imageUrl
        })) : dispatch(editProductAction({
          _id,
          title,
          price,
        }))
      }
    } catch (err) {
      console.log(err);
    }

    onClose();
  }

  const removeProduct = async (_id: string) => {
    try {
      const { data } = await axios.delete(`products/${_id}`)

      if (data.success) {
        dispatch(removeProductAction(_id));
      }
    } catch (err) {
      console.log(err);
    }
  }

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
                          <Button onClick={() => removeProduct(_id)}>Delete</Button>
                      </Flex>
                  </Flex>
              </CardFooter>
          </Card>
      }
      <ProductModal onModalSubmit={editProduct} onClose={onClose} isOpen={isOpen} />
    </GridItem>
  );
};

export default ProductCard;