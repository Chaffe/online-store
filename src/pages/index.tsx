import {Button, Grid, Heading, useDisclosure} from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard/ProductCard";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {addAllProductsAction, addProductAction, editProductAction} from "@/store/reducers/productsSlice";
import { products } from '@/pages/api/products.json';
import ProductModal from "@/components/ProductModal/ProductModal";

export default function Home() {
  const dispatch = useAppDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const productsStore = useAppSelector(({ products }) => products.products);

  useEffect(() => {
    if (productsStore.length === 0) {
      // TODO: type products and fix recall of useEffect
      // @ts-ignore
      dispatch(addAllProductsAction(products));
    }
  }, [products]);

  const addProduct = (title: string, price: number) => {
    dispatch(addProductAction({
      id: new Date().toISOString(),
      title: title,
      price: price
    }))

    onClose();
  }

  return (
    <>
      <Heading as='h1' size='lg' lineHeight={1.5}>Products</Heading>
      <Button mt={5} onClick={onOpen}>Add Product</Button>
      <ProductModal onModalSubmit={addProduct} onClose={onClose} isOpen={isOpen} />
      <Grid mt={5} templateColumns='repeat(4, 1fr)' gap={6}>
        {productsStore && productsStore.map(({ id, title, price }) =>
          <ProductCard key={id} id={id} title={title} price={price} />
        )}
      </Grid>
    </>
  )
}
