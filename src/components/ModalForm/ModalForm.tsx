import React, { FC, useRef, useState } from 'react';
import { Form, Formik } from "formik";
import { INITIAL_MODAL_VALUES } from "@/constants";
import { Button, Image, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Flex } from "@chakra-ui/react";
import ModalFields from "@/components/ModalForm/ModalFields";
import axios from "@/api/axios";

interface IModalForm {
  onModalSubmit: (title: string, price: number, imageUrl: string | null, id?: string) => void;
  onClose: () => void;
}

const ModalForm: FC<IModalForm> = ({ onModalSubmit, onClose }) => {
  const inputFileRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddImage = () => {
    if (inputFileRef) {
      inputFileRef.current.click();
    }
  }

  return (
    <Formik
      initialValues={INITIAL_MODAL_VALUES}
      onSubmit={({ title, price }) => {
        onModalSubmit(title, price, imageUrl)
      }}
    >
      <Form style={{width: '100%'}}>
        <ModalHeader>Add new product</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Flex columnGap="20px" mb="5">
            <Button onClick={handleAddImage}>Upload Image</Button>
            {imageUrl &&
                <Button onClick={() => setImageUrl(null)}>Delete Image</Button>
            }
          </Flex>

          {imageUrl &&
              <Image w="50%" src={process.env.NEXT_PUBLIC_API_URI + imageUrl} mb="5" />
          }
          <input type="file" ref={inputFileRef} onChange={handleFileChange} hidden />

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