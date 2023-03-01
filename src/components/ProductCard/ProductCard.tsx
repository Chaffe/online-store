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
import {editProductAction, removeProductAction} from "@/store/reducers/productsSlice";

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

  const editProduct = async (title: string, price: number) => {
    try {
      const responseData = {
        title,
        price,
      }

      const { data } = await axios.patch(`products/${_id}`, responseData);

      if (data.success) {
        dispatch(editProductAction({
          _id,
          title,
          price
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
    <GridItem w='100%'>
      {_id &&
          <Card>
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