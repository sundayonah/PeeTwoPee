import { Box,  Flex, Grid,  IconButton,  Img,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay,Text, useColorModeValue, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { ref, uploadBytes } from 'firebase/storage';
import {Dispatch,SetStateAction, useEffect} from 'react'
import { BiIcon } from '../../assets/Icons';
import { storage } from '../ChatBox/integration/firebase';

type IModal = {
    openModal : boolean, 
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setImages: Dispatch<SetStateAction<string[]>>,
    imageFiles:File[],
    images:any,
    sendMessage:(type:string,text:string) => void
    tx_id:string
  }
  
export default function PreviewMultipleImageModal({tx_id,openModal, setShowModal,imageFiles,setImages,images,sendMessage}:IModal){

    useEffect(() => {
        let isCancel = false;
        let images:any = []
        let fileReaders:any = [];
        if (imageFiles.length) {
          imageFiles.forEach((file:any) => {
            const fileReader = new FileReader();
            fileReaders.push(fileReader);
            fileReader.onload = (e) => {
                if(e.target){
              const result = e.target.result
              if (result) {
                images.push(result)
              }
              if (images.length === imageFiles.length && !isCancel) {
                setImages(images);
              }
                }
               
            }
            fileReader.readAsDataURL(file);
          })
        };
        return () => {
          isCancel = true;
          fileReaders.forEach((fileReader:any,index:number) => {
            if (fileReader.readyState === 1) {
              fileReader.abort()
            }
          })
        }
      }, [imageFiles]);

      const sendMess = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        setShowModal(false)
        imageFiles.forEach((image:File)=>{
        const imagesRef = ref(storage, `${tx_id}/${image.name}`);
        uploadBytes(imagesRef, image).then((snapshot:any) => {
          
         sendMessage(snapshot.metadata.contentType,snapshot.metadata.fullPath)
        });
        })
   
        
      }

    const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
    const textColour = useColorModeValue("#333333", "#F1F5F8");
    const tokenListTrgiggerBgColor = useColorModeValue('#666', '#ffffff');
    const backgroundColor =useColorModeValue("#F2F5F8","#213345")
    const borderColor= useColorModeValue("#FFF","#324D68")
    const {  onClose } = useDisclosure()
    function handleCloseModal() {
        setShowModal(false)
    }
    return (
        <Modal isOpen={openModal} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        
        <ModalContent color="#fff" borderRadius="6px" py={5}>
        <ModalCloseButton onClick={handleCloseModal} border="2px #666 solid" m="4" color={tokenListTrgiggerBgColor}/>
                <ModalBody >
                <Text fontSize="20px" fontWeight="700" py={3} color={textColour}>
            Images 
                </Text>
                
                {
        images.length > 0 ?
        <Grid templateColumns={isMobileDevice ? "repeat(1,1fr)" :"repeat(2,1fr)"} >
                  {
              images.map((image:string, idx:number) => {
                return <Box key={idx}> <Img w="200px" src={image} alt="" mx={4} my={3}/> </Box>
              })
            }
            
          </Grid> : null
      }
      <ModalFooter backgroundColor={backgroundColor}>
        <Flex justifyContent="flex-end">
            <IconButton aria-label='submit label' icon={<BiIcon />} onClick={(e)=>sendMess(e)} backgroundColor="transparent" _hover={{background:"transparent"}} outline="none"/>
        </Flex>
       
      </ModalFooter>
       
                </ModalBody>
        </ModalContent>
        </Modal>
    )
}