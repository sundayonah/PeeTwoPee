import {  Flex, FormLabel, IconButton, Input } from "@chakra-ui/react";
import React, {  useState } from "react";
import { AttachFileIcon, BiIcon } from "../../assets/Icons";
import PreviewMultipleImageModal from "../Modals/PreviewMultipleImageModal";

type IState = {
    sendMessage:(type:string,text:string) => void
    disabled?:boolean
    tx_id?:string
}

export default function SendMessage({sendMessage,disabled,tx_id}:IState) {
    const hiddenFileInput = React.useRef<any>();
    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
    const [imageFiles, setImageFiles] = useState<any>([]);
    const [images, setImages] = useState<string[] | any>([]);
    const [showModal, setShowModal] = useState(false);
    const [msg,setMsg] = useState("")
    const handleClick = () => {
       hiddenFileInput.current && hiddenFileInput.current.click();
    };
    const handleChange = (event: any) => {
        const { files } = event.target
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i]; 
          if (file.type.match(imageTypeRegex)) {
            validImageFiles.push(file);
          }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            setShowModal(true)
            return;
          }
    };
    const sendMess = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
            sendMessage("message",msg)
            setMsg("")
    }
  if(!disabled){
 return (
        <form onSubmit={(e)=>sendMess(e)} >
            <Flex position="absolute" bottom="0px" py="10px" width="97%" mt={10}>
                <Input
                width="80%"
                value={msg} 
                onChange={(e)=>setMsg(e.target.value)}
                type="text"
                placeholder="Write a message..."
                border="1px solid #F2F5F8"
                borderRadius="4px"
                height="48px"
                />
                <FormLabel cursor="pointer" htmlFor="inputTag" >
                <AttachFileIcon 
                onclick={handleClick}
                />
                <Input  display="none"
                onChange={(e)=>handleChange(e)} type="file" accept="image/*" multiple ref={hiddenFileInput} />
                </FormLabel>

                <IconButton aria-label='submit label' icon={<BiIcon />} backgroundColor="transparent" _hover={{background:"transparent"}} outline="none" type="submit" />
                <PreviewMultipleImageModal setShowModal={setShowModal}
                openModal={showModal}
                imageFiles={imageFiles}
                setImages={setImages}
                images={images}
                tx_id={tx_id}
                sendMessage={sendMessage}
                />
            </Flex>
        </form>
    )
  }  
 
}
