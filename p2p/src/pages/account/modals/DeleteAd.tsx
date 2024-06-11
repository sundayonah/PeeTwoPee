import { DeleteIcon } from '@chakra-ui/icons';
import { Modal, ModalCloseButton, ModalContent, Text, ModalOverlay, useColorModeValue,  ModalBody, Flex, Image, Box, Link, Button, Circle } from '@chakra-ui/react'
import React from 'react'

const DeleteAd = ({ openModal, closeModal, onConfirm }: { openModal: boolean, closeModal: () => void, onConfirm: () => void }) => {
    const mode = useColorModeValue("light", "dark");
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
    const textColour = useColorModeValue("#333333", "#F1F5F8");

    return (
        <>
            <Modal isOpen={openModal} onClose={closeModal} isCentered>
                <ModalOverlay />
                <ModalContent
                    bg={bgColour}
                    color="#fff"
                    borderRadius="6px"
                    paddingBottom="15px"
                    width={400}
                >
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
                        <Flex flexDirection={'column'} alignContent={'center'} alignItems='center'>
                            <Circle size='60px' bg='#CC334F' color='white'>
                                <DeleteIcon />
                            </Circle>
                            <Text py={3} fontWeight={500} color={textColour}>Delete this item</Text>
                            <Text py={3} textAlign={'center'} color={closeBtnColour} >Once you delete this item, it will be removed forever until you manually add it back.</Text>
                        </Flex>

                        <Button mt={3} _hover={{ borderColor: '#666666' }} backgroundColor="#CC334F" isFullWidth
                        onClick={() => {onConfirm(); closeModal();}}>
                            Delete
                        </Button>
                        <Button onClick={closeModal} variant={'outline'} borderColor={'#666666'} mt={3} _hover={{ borderColor: '#666666' }} backgroundColor={'white'} color={'#666666'} isFullWidth>
                            Cancel
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteAd
