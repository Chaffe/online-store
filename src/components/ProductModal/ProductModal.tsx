import React, { FC, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import ModalForm from "@/components/ModalForm/ModalForm";

interface IProductModal {
  onModalSubmit: (title: string, price: number, imageUrl: string | null) => void;
  onClose: () => void;
  isOpen: boolean;
}

const ProductModal: FC<IProductModal> = ({ onModalSubmit, onClose, isOpen }) => {
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
          <ModalForm onModalSubmit={onModalSubmit} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;