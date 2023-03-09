import React, { FC } from 'react';
import { ErrorMessage, Field } from "formik";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

const ModalFields: FC = () => {
  return (
    <>
        <Field type="text" name="title">
          {({ field, form }: any) => (
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input {...field} placeholder='Title' />
              <FormErrorMessage>{form.errors.title}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <ErrorMessage name="title" component="div" />

        <Field type="number" name="price">
          {({ field, form }: any) => (
            <FormControl mt="30px">
              <FormLabel>Price</FormLabel>
              <Input {...field} type="number" placeholder='Price' />
              <FormErrorMessage>{form.errors.price}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <ErrorMessage name="price" component="div"/>
    </>
  );
};

export default ModalFields;