import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button, Grid, Heading, Skeleton, useDisclosure } from "@chakra-ui/react";

import ProductCard from "@/components/ProductCard/ProductCard";
import ProductModal from "@/components/ProductModal/ProductModal";
import fetchProducts from "@/store/actions/fetchProducts";
import addProduct from "@/hooks/addProduct";

export default function Home() {
  const dispatch = useAppDispatch();
    const { products, isLoading, error } = useAppSelector(state => state.products)
    const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    // TODO: type products and fix recall of useEffect
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <>
      <Heading as='h1' size='lg' lineHeight={1.5}>Products</Heading>

      {/* TODO: implement isLoading and error handling */}
      {isLoading && (<h2>Loading...</h2>)}
      {error && <h2>Error</h2>}

      <Button mt={5} onClick={onOpen}>Add Product</Button>
      <ProductModal onModalSubmit={addProduct} onClose={onClose} isOpen={isOpen} />
      <Grid mt={5} templateColumns='repeat(4, 1fr)' gap={6}>
        {products && products.map((product) =>
          <Skeleton isLoaded={!isLoading} key={product._id}>
            <ProductCard
              key={product._id}
              product={product}
            />
          </Skeleton>
        )}
      </Grid>
    </>
  )
};
