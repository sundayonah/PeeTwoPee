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
  Img,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineExclamation } from "react-icons/ai";
import WARNING from "../../assets/warning.svg";

const SetTimeModal = ({
  openModal,
  setShowAccountModal,
  setretryCounter,
  retryCounter,
  settransactionTimeElapsed,
  settimeNotificationClose,
}: {
  openModal: boolean;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  setretryCounter: React.Dispatch<React.SetStateAction<number>>;
  retryCounter: number;
  settransactionTimeElapsed: React.Dispatch<React.SetStateAction<boolean>>;
  settimeNotificationClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const closeButtonBorderColor = useColorModeValue("#666666", "#cccccc");
  const { onClose } = useDisclosure();

  function handleCloseModal() {
    setShowAccountModal(false);
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={openModal}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        bg={bgColour}
        color='#fff'
        borderRadius='6px'
        paddingBottom='15px'
        width={448}
        pt={10}
      >
        <ModalCloseButton
          mt={5}
          border='1px solid'
          borderColor={closeButtonBorderColor}
          onClick={() => settimeNotificationClose(true)}
          color={textColour}
          size={"sm"}
        />
        <ModalBody
          my={3}
          px={10}
          display='flex'
          flexDirection={"column"}
          alignItems={"center"}
        >
          {/* <Circle size='70px' background='#FFA300' mt={6}> */}
          {/* <AiOutlineExclamation fontSize='50px' /> */}

          {/* </Circle> */}
          <Img src={WARNING} />
          <Text fontSize='20px' fontWeight='700' py={3} color={textColour}>
            Incorrect Time
          </Text>

          <Text
            px={2}
            pb={4}
            color={textColour2}
            fontSize='14px'
            fontWeight={400}
            align='center'
          >
            It seems like your Operating System (OS) time needs to be updated as
            it will prevent auto cancelation of your trade
          </Text>
          <Button
            onClick={() => setretryCounter(retryCounter + 1)}
            my={3}
            height='48px'
            variant={"brand"}
            isFullWidth
          >
            I have fixed this
          </Button>
          <Button
            my={3}
            colorScheme='teal'
            height='48px'
            variant='outline'
            isFullWidth
            onClick={() => settimeNotificationClose(true)}
          >
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SetTimeModal;
