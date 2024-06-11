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
  Flex,
} from "@chakra-ui/react";
import React from "react";
import {  useLocation, useNavigate } from "react-router-dom";

import Timer from "../../assets/timer.svg";
import Warning from "../../assets/infobullet.svg";
import { useActiveWeb3React } from "../../utils/hooks";

const Transactioncancelled = ({
  openModal,
  fromAddress,
}: {
  openModal: boolean;
  fromAddress?: string;
}) => {
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const infobgColor = useColorModeValue("#FEF8E7", "#213345");
  const infoTextColor = useColorModeValue("#D9AA0F", "#FFCC24");
  const {  onClose } = useDisclosure();
  const navigate = useNavigate();
  const { account } = useActiveWeb3React();


  function handleCloseModal() {
    if (fromAddress === account) {
      //   setReload(true);

      navigate("/trade/sell");
    } else {
      navigate("/trade/buy");
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
        width={420}
      >
        <ModalBody
          my={2}
          //   px={10}
          display='flex'
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Image src={Timer} py={3} />
          <Text fontSize='20px' fontWeight='600' py={3} color={textColour}>
            Order Timeout!
          </Text>

          <Flex
            borderRadius='4px'
            textColor={infoTextColor}
            bgColor={infobgColor}
            flexDirection='column'
            my={5}
            p={2}
          >
            <Flex alignItems='flex-start' mb={3}>
              <Image mt={1} mr={2} src={Warning} />
              <Text lineHeight='22px' fontSize='14px'>
                Be sure to initiate and complete transactions before the time
                elapses to ensure faster trading.
              </Text>
            </Flex>

            <Flex alignItems='flex-start'>
              <Image mt={1} mr={2} src={Warning} />
              <Text lineHeight='22px' fontSize='14px'>
                Orders will be automatically cancelled when the time for
                transactions elapses.
              </Text>
            </Flex>
          </Flex>
          <Button
            my={3}
            onClick={() => handleCloseModal()}
            variant={"brand"}
            isFullWidth
            fontSize='14px'
          >
            Go back home
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Transactioncancelled;
