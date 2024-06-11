import { Modal, ModalCloseButton, ModalContent, Text, ModalOverlay, useColorModeValue,  ModalBody, Flex,  Box, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BinanceIcon, EthereumIcon, PolygonIcon, OasisIcon } from '../../../assets/Icons';
import ChooseWallet from './ChooseWallet';
const ChooseNetwork = ({ openModal, closeModal }: { openModal: boolean, closeModal: () => void }) => {
    
    const mode = useColorModeValue("light", "dark");
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
    const textColour = useColorModeValue("#333333", "#F1F5F8");

    const netWorkArray = [
        { network: "Ethereum Network", icon: EthereumIcon },
        { network: "Binance Smart Chain Network", icon: BinanceIcon },
        { network: "Polygon Network", icon: PolygonIcon },
        { network: "Oasis Network", icon: OasisIcon }
    ]
    const [openWalletModal, setOpenWalletModal] = useState(false)

    return (
        <>
        <Modal isOpen={openModal} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent
                bg={bgColour}
                color="#fff"
                borderRadius="6px"
                paddingBottom="15px"
                width={386}>
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

                <ModalBody mt={10} flexDirection={'column'} >
                    <Text fontSize="20px" fontWeight="400" py={3} color={textColour}>
                        Choose a network to connect to
                    </Text>

                    {netWorkArray.map((network,index)=> (
                        <Box rounded="6px" mt={3}
                        //onClick={}
                        key={index}
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
                            onClick={()=> setOpenWalletModal(true)}
                        >
                            <network.icon/>
                            <Text pl={3} fontSize={16} fontWeight={400} color={textColour}>
                                {network.network}
                            </Text>
                        </Flex>
                    </Box>
                    )) }

                    <Box rounded="6px" mt={3} background={'#F2F5F8'} p={2} >
                        <Text color={'#666666'} fontSize={12} fontWeight={400} p={3}>
                            By connecting a wallet, you agree to RigelProtocol’s <Link color={'#319EF6'}>Terms of Service</Link>  and acknowledge that you have read and understand the RigelProtocol <Link color={'#319EF6'}> Privacy Policy.</Link>
                        </Text>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>

        <ChooseWallet openWaletModal={openWalletModal} closeModal={()=>setOpenWalletModal(false)}/>
        </>
    )
}

export default ChooseNetwork