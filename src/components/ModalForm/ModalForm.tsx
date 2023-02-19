import React, { FC } from 'react';
import { Form, Formik } from "formik";
import { INITIAL_MODAL_VALUES } from "@/constants";
import { Button, ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from "@chakra-ui/react";
import ModalFields from "@/components/ModalForm/ModalFields";

interface IModalForm {
  onModalSubmit: (title: string, price: number, id?: string) => void;
  onClose: () => void;
}

const ModalForm: FC<IModalForm> = ({ onModalSubmit, onClose }) => {
  return (
    <Formik
      initialValues={INITIAL_MODAL_VALUES}
      onSubmit={({ title, price }) => onModalSubmit(title, price)}
    >
      <Form style={{width: '100%'}}>
        <ModalHeader>Add new product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ModalFields />
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme='blue' mr={3}>
            Add Product
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Formik>
  );
};

export default ModalForm;