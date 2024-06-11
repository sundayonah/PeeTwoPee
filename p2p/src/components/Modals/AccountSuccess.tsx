import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import DonIcon from "../../assets/check.png";

const AccountSuccess = ({
  openModal,
  setReload,
}: {
  openModal: boolean;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const {  onClose } = useDisclosure();
  const navigate = useNavigate();

  let Location = useLocation();

  function handleCloseModal() {
    if (setReload) {
      //   setReload(true);

      navigate("/profile/account", {
        state: {
          from: Location,
        },
      });
    } else {
      navigate("/profile/account", {
        state: {
          from: Location,
        },
      });
    }
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
        <ModalBody
          my={2}
          px={10}
          display='flex'
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Image src={DonIcon} py={3} />
          <Text fontSize='20px' fontWeight='700' py={3} color={textColour}>
            Account successfully created!
          </Text>

          <Text
            px={2}
            pb={4}
            color={textColour2}
            fontSize='16px'
            fontWeight={400}
            align='center'
          >
            Your trading account has been created successfully. Buying & Selling
            of cryptocurrencies is now possible through the platfrom.
          </Text>
          <Button
            my={3}
            onClick={() => handleCloseModal()}
            variant={"brand"}
            isFullWidth
          >
            Start Trading
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AccountSuccess;
