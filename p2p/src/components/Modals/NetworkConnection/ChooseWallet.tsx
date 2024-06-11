import { Modal, ModalCloseButton, ModalContent, Text, ModalOverlay, useColorModeValue,  ModalBody, Flex, Image, Box, ModalHeader } from '@chakra-ui/react'
import React from 'react'
import metamask from '../../../assets/metamask.svg'
import trustWallet from '../../../assets/TrustWallet.svg'


import { BackIcon } from '../../../assets/Icons';
const ChooseWallet = ({ openWaletModal, closeModal }: { openWaletModal: boolean, closeModal: () => void }) => {

    const mode = useColorModeValue("light", "dark");
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
    const textColour = useColorModeValue("#333333", "#F1F5F8");

    return (

        <Modal isOpen={openWaletModal} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent
                bg={bgColour}
                color="#fff"
                borderRadius="6px"
                paddingBottom="15px"
                width={386}>
                <ModalHeader mt={2} display={'flex'} flexDirection={'row'} color={closeBtnColour}>
                    <BackIcon onClick={closeModal} /> <Text fontSize={16} pl={3}>Choose network</Text></ModalHeader>
                <ModalCloseButton
                    bg="none"
                    color={closeBtnColour}
                    cursor="pointer"
                    _focus={{ outline: 'none' }}
                    onClick={closeModal}
                    border={'1px solid'}
                    size={'sm'}
                    mt={3}
                    mr={3}
                    p={'7px'}
                />

                <ModalBody my={2} >
                    <Text fontSize="20px" fontWeight="400" py={3} color={textColour}>
                        Choose a wallet
                    </Text>

                    <Box rounded="6px" mt={3}
                        backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
                        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"} p={2} _hover={{ borderColor: '#319EF6' }} >
                        <Flex
                            mt={2}
                            color='#fff'
                            mb='10px'
                            flexDirection={'row'}
                            alignItems='center'
                            border={1}
                            borderColor={'#F2F5F8'}
                            cursor='pointer'
                        >
                            <Image src={metamask} />
                            <Text pl={3} fontSize={16} fontWeight={400} color={textColour}>
                                Metamask
                            </Text>
                        </Flex>
                    </Box>
                    <Box rounded="6px" mt={3}
                        backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
                        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"} p={2} _hover={{ borderColor: '#319EF6' }} >
                        <Flex
                            mt={2}
                            color='#fff'
                            mb='10px'
                            flexDirection={'row'}
                            alignItems='center'
                            border={1}
                            borderColor={'#F2F5F8'}
                            cursor='pointer'
                        >
                            <Image src={trustWallet} />
                            <Text pl={3} fontSize={16} fontWeight={400} color={textColour}>
                                Trust Wallet
                            </Text>
                        </Flex>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ChooseWallet


