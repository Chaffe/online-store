import React, { useEffect } from "react";
import { Button, Grid, Heading, Skeleton, useDisclosure } from "@chakra-ui/react";
import axios from "@/api/axios";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductModal from "@/components/ProductModal/ProductModal";
import fetchProducts from "@/store/actions/fetchProducts";
import { addProductAction } from "@/store/reducers/productsSlice";

export default function Home() {
  const dispatch = useAppDispatch();
    const { products, isLoading, error } = useAppSelector(state => state.products)
    const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    // TODO: type products and fix recall of useEffect
    dispatch(fetchProducts())
  }, [dispatch]);

  const addProduct = async (title: string, price: number, imageUrl: string | null) => {
    try {
      const requestData = imageUrl ? {
        title,
        price,
        imageUrl: process.env.NEXT_PUBLIC_API_URI + imageUrl
      } : {
        title,
        price,
      }

      const { data } = await axios.post('/products', requestData);

      if (data) {
        imageUrl ? dispatch(addProductAction({
          _id: data._id,
          title: data.title,
          price: data.price,
          imageUrl: process.env.NEXT_PUBLIC_API_URI + imageUrl
        })) : dispatch(addProductAction({
          _id: data._id,
          title: data.title,
          price: data.price,
        }))
      }
    } catch (err) {
      console.log(err);
    }

    onClose();
  }

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
