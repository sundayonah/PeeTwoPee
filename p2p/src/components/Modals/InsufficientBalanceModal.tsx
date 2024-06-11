import {
  Button,
  Circle,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineExclamation } from "react-icons/ai";

const InsufficientBalanceModal = ({
  openModal,
  setShowAccountModal,
}: {
  openModal: boolean;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const { onClose } = useDisclosure();

  function handleCloseModal() {
    setShowAccountModal(false);
  }

  return (
    <Modal isOpen={openModal} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={bgColour}
        color='#fff'
        borderRadius='6px'
        paddingBottom='15px'
        width={448}
      >
        <ModalCloseButton onClick={handleCloseModal} color={textColour} />
        <ModalBody
          my={3}
          px={10}
          display='flex'
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Circle size='70px' background='#FFA300' mt={6}>
            <AiOutlineExclamation fontSize='50px' />
          </Circle>
          <Text fontSize='20px' fontWeight='700' py={3} color={textColour}>
            Insufficient crypto balance
          </Text>

          <Text
            px={2}
            pb={4}
            color={textColour2}
            fontSize='14px'
            fontWeight={400}
            align='center'
          >
            You are attempting to sell more crypto than is available in your
            wallet balance. You can purchase more crypto below or cancel to
            change sell amount.
          </Text>
          <Button my={3} height='48px' variant={"brand"} isFullWidth>
            <Link to={"/"}>Purchase more crypto</Link>
          </Button>
          <Button
            my={3}
            colorScheme='teal'
            height='48px'
            variant='outline'
            isFullWidth
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InsufficientBalanceModal;
