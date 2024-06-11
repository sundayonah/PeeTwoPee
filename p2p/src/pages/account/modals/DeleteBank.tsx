import { useMutation } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import { Modal, ModalCloseButton, ModalContent, Text, ModalOverlay, useColorModeValue, useDisclosure, ModalBody, Flex, Image, Box, Link, Button, Circle } from '@chakra-ui/react'
import React, { useEffect  } from 'react'
import { useDispatch } from 'react-redux';
import { addToast } from '../../../components/Toast/toastSlice';
import { DELETE_BANK } from '../gql/mutations';
 

const DeleteBank = ({ openModal, closeModal, bankId ,cb }: {cb: () => void, bankId: string | undefined, openModal: boolean, closeModal: () => void }) => {

    const mode = useColorModeValue("light", "dark");
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
    const textColour = useColorModeValue("#333333", "#F1F5F8");

    const [deleteBank, { loading, error, data }] = useMutation(DELETE_BANK );
    const dispatch = useDispatch()
    useEffect(() => {
        cb()
        if(data?.deleteBank?.status){
            dispatch(
              addToast({
                message: "Payment details Successfully Deleted",
                error: false,
                hasExploreLink:false
              })
            );
           }else{
            dispatch(
                addToast({
                  message: data?.deleteBank?.message,
                  error: true,
                  hasExploreLink:false
                })
              );
           }
    }, [data, dispatch])

    

  useEffect(() => {
    if(error){
     dispatch(
       addToast({
         message: "Error occured, Please try again",
         error: true,
         hasExploreLink:false
 
       })
     );
    }
   }, [error])
    
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

                        <Button isLoading={loading}  onClick={()=>{
                            deleteBank({
                                variables:{
                                      id: bankId.toString()
                                }
                            })
                        }} mt={3} _hover={{ borderColor: '#666666' }} backgroundColor="#CC334F" isFullWidth>
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

export default DeleteBank