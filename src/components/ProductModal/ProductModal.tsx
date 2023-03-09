import React, { FC, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import ModalForm from "@/components/ModalForm/ModalForm";
import { AppDispatch } from "@/store";

interface IProductModal {
  onModalSubmit: (
    dispatch: AppDispatch,
    onClose: () => void,
    title: string,
    price: number,
    imageUrl: string,
    _id?: string,
  ) => void;
  _id?: string;
  onClose: () => void;
  isOpen: boolean;
}

const ProductModal: FC<IProductModal> = ({ onModalSubmit, _id, onClose, isOpen }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalForm onModalSubmit={onModalSubmit} _id={_id} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;