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
  import {   useNavigate } from "react-router-dom";

  import Timer from "../../assets/timer.svg";
  import Warning from "../../assets/infobullet.svg";
  
  const TradeNetworkValigation = ({
    openModal,
    chainId,
  }: {
    openModal: boolean;
    chainId: number;
  }) => {
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const textColour = useColorModeValue("#333333", "#F1F5F8");
    const infobgColor = useColorModeValue("#FEF8E7", "#213345");
    const infoTextColor = useColorModeValue("#D9AA0F", "#FFCC24");
    const {  onClose } = useDisclosure();
    const navigate = useNavigate();
  
  
    function handleCloseModal() {
        navigate("/trade/sell");
    }

    const chains = {
      137: "POLYGON",
      56: "BINANCE",
      97: "BINANCE TEST",
      80001: "POLYGON TEST",
      42261: "OASISTEST",
      42262: "OASISMAINNET",
    };
  
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
            Network Error
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
                You are interacting with a transaction that belongs to a network different from the one you are connected to.
                </Text>
              </Flex>
  
              <Flex alignItems='flex-start'>
                <Image mt={1} mr={2} src={Warning} />
                <Text lineHeight='22px' fontSize='14px'>
                To interact with this, you can change your network to {chains[chainId]} or interact with a different transaction entirely.
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
  
  export default TradeNetworkValigation;
  