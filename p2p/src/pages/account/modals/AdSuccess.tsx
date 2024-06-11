import { Button, Image, Modal, ModalBody, ModalContent, ModalOverlay,Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import DonIcon from '../../../assets/check.png'

const AdSuccess = ({openModal}: {openModal : boolean}) => {
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const textColour = useColorModeValue("#333333", "#F1F5F8");
    const textColour2 = useColorModeValue("#666666", "#F1F5F8");
    const {  onClose } = useDisclosure()

    function handleCloseModal() {
        openModal = false
    }

  return (

    <Modal isOpen={openModal} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent bg={bgColour} color="#fff" borderRadius="6px"
        paddingBottom="15px" width={448}>
            <ModalBody my={2} px={10} display="flex" flexDirection={'column'} alignItems={'center'}  >
                <Image src={DonIcon} py={3}/>
            <Text fontSize="20px" fontWeight="700" py={3} color={textColour}>
            Ad successfully created!
                </Text>

                <Text px={2} pb={4} color={textColour2} fontSize="16px" fontWeight={400}  align="center">
                Your trading ad has been created successfully. You can now view the ad.
                </Text>
                <Button my={3}   variant={'brand'} isFullWidth>
                   <Link to={'/profile/account'}>View Ads</Link>
                </Button>
            </ModalBody>
    </ModalContent>
    </Modal>
  )
}

export default AdSuccess;
