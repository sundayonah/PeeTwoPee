import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
import { ethers } from 'ethers';

const SignMessageModal = ({
  isOpen,
  onClose,
  signer
}: {
  isOpen: boolean;
  onClose: () => void;
  signer: ethers.Signer;
}) => {
  useEffect(() => {
    const handleSignMessage = async () => {
      const message = "Please sign this message to confirm your identity.";
      try {
        const signature = await signer.signMessage(message);
        console.log("Signature:", signature);
        onClose(); // Close the modal after signing
      } catch (error) {
        console.error("Error signing message:", error);
      }
    };

    if (isOpen && signer) {
      handleSignMessage();
    }
  }, [isOpen, signer, onClose]);

  const bg = useColorModeValue("#FFFFFF", "#15202B");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader>Sign Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Please sign the message to confirm your identity.</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignMessageModal;
