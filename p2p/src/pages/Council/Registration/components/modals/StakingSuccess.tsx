import {
  Modal,
  ModalCloseButton,
  ModalContent,
  Text,
  ModalOverlay,
  useColorModeValue,
  ModalBody,
  Link,
  Image,
  Button,
} from '@chakra-ui/react'
import TickCircle from '../../../../../assets/tick-circle.svg'

const StakingSuccess = ({ openModal, closeModal }: { openModal: boolean, closeModal: () => void }) => {
  const mode = useColorModeValue("light", "dark");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const textColour2 = useColorModeValue("#008DFF", "#319EF6");

  return (
    <>
    <Modal isOpen={openModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent
            bg={bgColour}
            color="#fff"
            borderRadius="6px"
            maxWidth={400}>

              <ModalCloseButton
                  bg="none"
                  color={closeBtnColour}
                  cursor="pointer"
                  _focus={{ outline: 'none' }}
                  onClick={closeModal}
                  border={'1px solid'}
                  size={'sm'}
                  mr={3}
                  p={'7px'}
              />

            <ModalBody mt={4} flexDirection={'column'} textAlign="center" alignItems={'center'}>
              <Image src={TickCircle} py={3} margin="auto"/>
              <Text color={textColour} fontSize={'20px'} fontWeight={500}>Staking Successful</Text>
              <Link textDecoration="underline" color={textColour2}><Text fontSize={'16px'} fontWeight={500}>View on Etherscan</Text></Link>
              <Button my={3} bg={textColour2} variant={'brand'} fontSize={'14px'} fontWeight={500} onClick={closeModal} isFullWidth>
                 Close
              </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    </>
  );
};

export default StakingSuccess;
