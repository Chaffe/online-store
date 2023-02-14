import React, { FC } from 'react';
import Link from "next/link";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Heading, Text } from "@chakra-ui/react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { LOGIN_TEXT, SIGNUP_TEXT, INITIAL_FORM_VALUES } from "@/constants";

interface IFormTemplate {
  isLogin: boolean,
  onFormSubmit: (email: string, password: string) => void
}

const FormTemplate: FC<IFormTemplate> = ({ isLogin, onFormSubmit }) => {
  return (
    <>
      <Heading as='h1' size='lg' mb={5} lineHeight={1.5}>{isLogin ? LOGIN_TEXT : SIGNUP_TEXT}</Heading>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validate={values => {
          const errors: any = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={({ email, password}) => onFormSubmit(email, password)}
      >
        <Form style={{width: '100%'}}>
          <Field type="email" name="email">
            {({ field, form }: any) => (
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input {...field} placeholder='Email' />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <ErrorMessage name="email" component="div" />

          <Field type="password" name="password">
            {({ field, form }: any) => (
              <FormControl mt="30px">
                <FormLabel>Password</FormLabel>
                <Input {...field} type="password" placeholder='Password' />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <ErrorMessage name="password" component="div"/>
          <Button mt={5} type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form>
      </Formik>
      {isLogin
        ? <Text mt={5}>No account yet? <Link href="/sign-up" style={{color: "green", textDecoration: "underline"}}>Sign Up</Link></Text>
        : <Text mt={5}>Already have an account? <Link href="/sign-in" style={{color: "green", textDecoration: "underline"}}>Login</Link></Text>
      }
    </>
  );
};

export default FormTemplate;