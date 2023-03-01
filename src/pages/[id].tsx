import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import axios from "@/api/axios";
import {IProduct} from "@/models/IProduct";
import {Image, Text, Flex, Heading, Avatar, Box} from "@chakra-ui/react";

const Product = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && (async () => {
      try {
        const {data} = await axios.get(`/products/${id}`);

        if (data) {
          setProduct(data);
        }
      } catch (err) {
        console.log(err);
      }
    })()
  }, [id])

  return (
    <>
      {product &&
          <>
              <Flex direction="column" alignItems="center">
                  <Image
                      src={product.imageUrl}
                      alt="Product"
                      borderRadius="lg"
                      w="50%"
                      h="auto"
                  />
                  <Heading mt={5} size='sm'>{product.title}</Heading>
                  <Heading size='sm'>{product.price}$</Heading>
              </Flex>

              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Avatar name={product?.user?.fullName} src={product?.user?.avatarUrl} />

                  <Box>
                      <Heading size='sm'>{product.user?.fullName}</Heading>
                  </Box>
              </Flex>
          </>
      }
    </>


  );
};

export default Product;