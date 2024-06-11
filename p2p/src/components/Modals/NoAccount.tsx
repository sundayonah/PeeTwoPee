import { Button,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay,Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import {Dispatch,SetStateAction} from 'react'
import { Link } from 'react-router-dom';
import { FillPersonIcon } from '../../assets/Icons';

const NoAccount = ({openModal,setShowAccountModal}: {openModal : boolean, setShowAccountModal: Dispatch<SetStateAction<boolean>>}) => {
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const textColour = useColorModeValue("#333333", "#F1F5F8");
    const textColour2 = useColorModeValue("#666666", "#F1F5F8");
    const {  onClose } = useDisclosure()
    
    function handleCloseModal() {
        setShowAccountModal(false)
    }

  return (

    <Modal isOpen={openModal} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent bg={bgColour} color="#fff" borderRadius="6px"
        paddingBottom="15px" width={448}>
          <ModalCloseButton onClick={handleCloseModal} color={textColour}/>
            <ModalBody my={2} px={10} display="flex" flexDirection={'column'} alignItems={'center'}  >
                <FillPersonIcon />
            <Text fontSize="20px" fontWeight="700" py={3} color={textColour}>
            You don’t have an account
                </Text>

                <Text px={2} pb={4} color={textColour2} fontSize="14px" fontWeight={400}  align="center">
                You need a user account to be able to buy and sell cryptocurrencies. Click the button below to create an account <span style={{color:"#319EF6"}}>in less than 2 minutes.</span>
                </Text>
                <Button my={3} height="48px"  variant={'brand'} isFullWidth>
                   <Link to={'/'}>Start Trading</Link> 
                </Button>
                <Button my={3} colorScheme="teal" height="48px"  variant="outline" isFullWidth onClick={handleCloseModal}>
                   Back
                </Button>
            </ModalBody>
    </ModalContent>
    </Modal>
  )
}

export default NoAccount