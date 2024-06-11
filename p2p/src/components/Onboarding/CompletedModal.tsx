import React, {  useState } from "react";

import {
    ModalOverlay,
    ModalContent,
    Modal,
    useColorModeValue,
    Box,
    Flex,
    Text,
    Button,
    Image,
} from "@chakra-ui/react"
import logo from '../../assets/RGPIcon.svg'
import NetworkModal from "../Navbar/modals/networkModal"


export type IModal = {
    openModal: boolean,
    closeModal: Function
    reStartToure: Function,
    welcomeText: string,
    textHeader: string
}

const CompletedModal: React.FC<IModal> = ({
    openModal,
    closeModal,
    welcomeText,
    reStartToure,
    textHeader
}) => {
    const bgColor = useColorModeValue("#FFF", "#15202B");
    const secondarybgColor = useColorModeValue("#EBF6FE", "#EAF6FF");
    const textColor = useColorModeValue("#333333", "#F1F5F8");

    const brandButtonColor = useColorModeValue("#319EF6", "#4CAFFF");
    const buttonColor = useColorModeValue("#319EF6", "#4CAFFF");
    const [displayNetwork, setDisplayNetwork] = useState(false);
 


    function connWallet() {
        closeModal(false);
        setDisplayNetwork(true)
    }

    function restartT() {
        closeModal(false);
        reStartToure()
    }


    return (
        <>
         <NetworkModal
          displayNetwork={displayNetwork}
          setDisplayNetwork={setDisplayNetwork}
        />
            <Modal isCentered isOpen={openModal} onClose={() => closeModal(false)}>
                <ModalOverlay />
                <ModalContent
                    width="95vw"
                    borderRadius="6px"
                    paddingBottom="20px"
                    bgColor={bgColor}
                    minHeight="40vh"
                >

                    <Box
                        bgColor={secondarybgColor}
                        textAlign="center"
                        color="#319EF6"
                        padding="25px 0"
                        fontWeight="normal"
                    >
                        <Flex
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                        >

                            <Image src={logo} alt="logo" />
                        </Flex>
                    </Box>
                    <Flex justifyContent="space-between" alignContent='center' flexDirection="column" alignItems="center" py="4">
                        <Text color={textColor} margin="6px 0" fontSize="20px">
                            {textHeader}
                        </Text>


                    </Flex>
                    <Flex justifyContent="space-between" alignContent="center" flexDirection="column" alignItems="center" py="4">
                        <Text color={textColor} textAlign="center" fontSize="16px" mx={8}>
                            {welcomeText}
                        </Text>

                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center" flexDirection="column" alignItems="center" py="4">

                        <Button
                            variant="brand"
                            padding="24px 0"
                            width="80%"
                            isFullWidth
                            boxShadow="none"
                            border="0"
                            mt={3}
                            background={brandButtonColor}
                            color="#FFFFFF"
                            cursor="pointer"
                            onClick={connWallet}

                        >
                            Proceed to connect wallet
                        </Button>


                        <button onClick={restartT}>
                            <Text
                                py={3}
                                decoration='underline'
                                fontSize="16px"
                                fontWeight="normal"
                                color={buttonColor}>
                                Take tour again</Text>
                        </button>


                    </Flex>



                </ModalContent>
            </Modal>
        </>
    )
};

export default CompletedModal
