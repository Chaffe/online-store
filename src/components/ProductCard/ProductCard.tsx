import React, { FC } from 'react';
import { Button, Card, CardBody, CardFooter, GridItem, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { IProduct } from "@/models/IProduct";
import { useAppDispatch } from "@/hooks/redux";
import { editProductAction, removeProductAction} from "@/store/reducers/productsSlice";
import ProductModal from "@/components/ProductModal/ProductModal";

const ProductCard: FC<IProduct> = ({ id, title, price }) => {
  const dispatch = useAppDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const editProduct = (title: string, price: number) => {
    dispatch(editProductAction({
      id: id,
      title: title,
      price: price
    }))

    onClose();
  }
  const removeProduct = (productId: string) => {
    dispatch(removeProductAction(productId));
  }

  return (
    <GridItem key={id} w='100%'>
      <Card>
        <CardBody>
          <Text align="center">{title}</Text>
          <Text align="center">{price}$</Text>
        </CardBody>
        <CardFooter>
          <Flex w="100%" justifyContent="space-around">
            <Button onClick={onOpen}>Edit</Button>
            <Button onClick={() => removeProduct(id)}>Delete</Button>
          </Flex>
        </CardFooter>
      </Card>
      <ProductModal onModalSubmit={editProduct} onClose={onClose} isOpen={isOpen} />
    </GridItem>
  );
};

export default ProductCard;