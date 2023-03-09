import React, { FC, useRef, useState } from 'react';
import { Form, Formik } from "formik";
import { INITIAL_MODAL_VALUES } from "@/constants";
import { Button, Image, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Flex } from "@chakra-ui/react";
import ModalFields from "@/components/ModalForm/ModalFields";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import getImageUrl from "@/hooks/getImageUrl";
import handleFileChange from "@/hooks/handleFileChange";
import handleUploadImage from "@/hooks/handleUploadImage";

interface IModalForm {
  onModalSubmit: (
    dispatch: AppDispatch,
    onClose: () => void,
    title: string,
    price: number,
    imageUrl: string,
    id?: string
  ) => void;
  _id?: string;
  onClose: () => void;
}

const ModalForm: FC<IModalForm> = ({ onModalSubmit, _id, onClose }) => {
  const dispatch = useDispatch();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <Formik
      initialValues={INITIAL_MODAL_VALUES}
      onSubmit={({ title, price }) => {
        _id
          ? onModalSubmit(dispatch, onClose, title, price, imageUrl, _id)
          : onModalSubmit(dispatch, onClose, title, price, imageUrl)

      }}
    >
      <Form style={{width: '100%'}}>
        <ModalHeader>Add new product</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Flex columnGap="20px" mb="5">
            <Button onClick={() => handleUploadImage(inputFileRef)}>Upload Image</Button>
            {imageUrl.length > 0 &&
                <Button onClick={() => setImageUrl('')}>Delete Image</Button>
            }
          </Flex>

          {imageUrl.length > 0 &&
              <Image w="50%" src={getImageUrl(imageUrl)} mb="5" />
          }
          <input type="file" ref={inputFileRef} onChange={(e) => handleFileChange(e, setImageUrl)} hidden />

          <ModalFields />
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme='blue' mr={3}>
            {_id ? 'Edit' : 'Add'} Product
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Formik>
  );
};

export default ModalForm;