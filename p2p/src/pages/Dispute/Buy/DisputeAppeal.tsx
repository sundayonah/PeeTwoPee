import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  
  Flex,
  
  Select,
  Spinner,
  Square,
  Text,
  Textarea,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { GDisputeStarted } from "../../../utils/GAnalytics/gTrade";
import { useEffect, useRef, useState } from "react"; 
import ListedColoredText from "../../../components/ListedColorText";
import FileViewer from "./components/FileViewer";
import { ADDAPEALTODISPUTE, CREATE_DISPUTE } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import { useActiveWeb3React } from "../../../utils/hooks";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../../components/Toast/toastSlice";
import { CONTRACT_ADDRESSES, RigelDecentralizedP2PSystemContract } from "../../../utils";
import { RootState } from "../../../state/store";
import { useTranslation } from "react-i18next";



export type imageREf = {
  uri: string,
  name: string,
  extension: string
}

type tradeInfo = {
  from: string;
  to: string;
}

export default function DisputeAppeal({
  getAppealValue,
  cancelDispute,
  submitDispute,
  tradeInfo,
  productId  
}: {
  getAppealValue: (num: number) => void;
  cancelDispute: () => void;
  submitDispute: () => void;
  tradeInfo: tradeInfo
  productId: number
}) {
  const textColor = useColorModeValue("#333333", "#fff");
  const lightColor = useColorModeValue("#666666", "#DCE5EF");
  const backgroundListColor = useColorModeValue("#FEF8E7", "#213345");
  const border = useColorModeValue("#F4BC00", "#D9AA0F");
  const [imageUploading, setImageUploading] = useState(false)
  const dispatch = useDispatch()

  const {isDisputeResponser} = useSelector(
    (state: RootState) => state.dispute
  );
  const { t } = useTranslation()

  const [uploadedImages, setUploadedImages] = useState<imageREf[]>([])
  const [disputReason, setDisputReason] = useState('')
  const [description, setDescription] = useState('')
  const {account, chainId, library} = useActiveWeb3React()
  const [submitDisputeRequest, setSubMitDisputeRequest] = useState(false)

 
  
  const disputeInfo = [t('dd1'),t('dd2'),t('dd3')];
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const updateUI = () => {
   // cancelDispute();
  };


  const [createDispute, { loading, error, data: createDisputeResponse }] = useMutation(CREATE_DISPUTE, {
    variables: {
        params: {
          productId: productId,
          disputeInitiator: account,
          disputeAppeal: {
            apealreason: disputReason,
            appealDescription: description,
            appealProofs: uploadedImages
          },
          chainId: chainId
        }
      },
      onCompleted: (d) => {
        GDisputeStarted("a dispute was created",tradeInfo?.from===account ? "buyer":"seller",productId,chainId )
      }
  });

  const [addAppealToDispute, { loading : loadAdd, error : errorAdd, data: appealResponse }] = useMutation( ADDAPEALTODISPUTE, {
    variables: {
        params: {
          productId: productId,
          disputeInitiator: account,
          disputeAppeal: {
            apealreason: disputReason,
            appealDescription: description,
            appealProofs: uploadedImages
          },
          chainId: chainId
        }
      },
  });

  const removeImage =(name:string) =>{
    uploadedImages.forEach(image=>{
      if(image.name===name){
        const index = uploadedImages.indexOf(image)
        uploadedImages.splice(index,1)
  
      }
  
    })
    setUploadedImages([...uploadedImages])
  }

  useEffect(() => {
    async function checkDispute() {
      try {
        setSubMitDisputeRequest(true)
        const p2pInstance = await RigelDecentralizedP2PSystemContract(
          CONTRACT_ADDRESSES[chainId]["P2P"],
          library
        );
        const productDetail = await p2pInstance.productDetails(productId);
        if (productDetail["isOnDispute"] && !isDisputeResponser) {
          submitDispute();
          getAppealValue(2)
          setSubMitDisputeRequest(false)
        }
        setSubMitDisputeRequest(false)
      } catch (error) {
        setSubMitDisputeRequest(false)
      }
    }
    checkDispute()
    
  }, [])
  const handleSubmitDispute = async () => {
   
    try {
      if (isDisputeResponser) {
       await  addAppealToDispute();
      } else {
        const day =await  createDispute();
      }
    } catch (error) {
    }
  };

  const fileRef = useRef();

  const handleChange = async (e) => {
    setImageUploading(true)
    e.preventDefault()
    const [file] = e.target.files;
    const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", "fox9qotr");
    try {
        const data = await fetch('https://api.cloudinary.com/v1_1/www-rigelprotocol-com/image/upload', {
            method: "POST",
            body: formData
          }).then(r => r.json())
      setUploadedImages(uploadedImages => [
        ...uploadedImages,
        {
            name: data.original_filename,
            extension: data.format,
            uri: data.secure_url
        
        }
      ])
      setImageUploading(false)
    } catch (error) {
        setImageUploading(false)
    }
   
  };

  useEffect(() => {
    if(error ||  errorAdd){
     dispatch(
       addToast({
         message: "Error occured, Please try again",
         error: true,
         hasExploreLink:false
       })
     );
    }
   }, [error, errorAdd])

  useEffect(() => {
    if(createDisputeResponse?.createDispute?.status){
      submitDispute();
      getAppealValue(2)
     dispatch(
       addToast({
         message: "Dispute Successfully created",
         error: false,
         hasExploreLink:false
       })
     );
    }
   }, [createDisputeResponse, dispatch])

   useEffect(() => {
    if(appealResponse?.addAppealToDispute?.status){
      submitDispute();
      getAppealValue(2)
      dispatch(
       addToast({
         message: "Dispute Successfully joined",
         error: false,
         hasExploreLink:false
       })
     );
    }
   }, [appealResponse, dispatch])



  return (
    <Box>
      <Text color={textColor} fontSize={["14px","14px","16px"]} fontWeight="500" mb={["13px","13px","0"]}>
        {t('dispute_detail')}. <InfoOutlineIcon ml={1} />
      </Text>
    
    {/*
      <Box my={5}>
        <Timer secs="3500" updateUI={updateUI} />
      </Box>
  */ }
      <ListedColoredText
        disputeInfo={disputeInfo}
        background={backgroundListColor}
        textColor={textColor}
        border={border}
      />
      <Box my={6}>
        <Text color={lightColor} fontSize="14px" mb="8px">
          {t('appeal_reason')}
        </Text>
        <Select  size="lg" value={disputReason} onChange={(e)=> setDisputReason(e.target.value)} placeholder="--select--">
          <option value="I made payment but seller won’t release crypto">
           {t('made_pay')}
          </option>
          <option value="Seller released crypto but not in my wallet">
           {t('not_in_wallet')}
          </option>
          <option value="I have not recieved payment from buyer">
          {t('no_pay')}
          </option>
          <option value="others">
            {t('others')}
          </option>
        </Select>
      </Box>
      <Box my={6}>
        <Text color={lightColor} fontSize="14px" my="8px">
          {t('desc')}
        </Text>
        <Textarea
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
        />
      </Box>
      <div>
        <Flex>
          <Text color={lightColor} fontSize="14px">
         {t('uploads')}
        </Text>
          <Text color={border} fontSize="14px" ml="12px">
          {t('guides')}
        </Text>
        </Flex>
        
        <Text fontSize="12px" color=" #999999" my="8px">
          {t('docs')}
        </Text>
        <Flex gap="20px" flexWrap="wrap">
           {uploadedImages.length >= 1 && uploadedImages.map((item: imageREf)=> (
        <FileViewer removeImage={removeImage} key={item.uri} uri={item.uri} name={item.name} extension={item.extension} />
       ))}
        </Flex>
      
        <Square
          cursor={"pointer"}
          onClick={() => {
             fileRef.current?.click()!;
          }}
           color={lightColor}
          fontSize="22px"
          size="40px"
          borderRadius="4px"
          background={backgroundListColor}
        >
          {" "}
          {imageUploading ? <Spinner/> : <>+</>}
        </Square>

        <input
          ref={fileRef}
          onChange={handleChange}
          multiple={false}
          type="file"
          hidden
          accept=".jpg,.jpeg,.png"
        />
      </div>
      <Box my="25px">
        <Button
         // background="#A7D6FB"
          width={isMobileDevice ? "100%" : "auto"}
          height="48px"
          borderRadius="6px"
          disabled={!disputReason  || !disputeInfo || loadAdd || loading || uploadedImages.length < 1}
          isLoading={loading || submitDisputeRequest || loadAdd}
          _hover={{backgroundColor:"#A7D6FB"}}
          variant={'brand'}
          onClick={handleSubmitDispute}
        >
        {isDisputeResponser ? t('join_dispute'): t('submit_dispute')}
        </Button>
        <Button
          background="transparent"
          width={isMobileDevice ? "100%" : "148px"}
          height="48px"
          borderRadius="6px"
          border="1px solid #666666"
          color={lightColor}
          ml={[0, 0, 4]}
          my={[3, 3, 0]}
          onClick={cancelDispute}
        >
          {t('cancel')}
        </Button>
      </Box>
    </Box>
  );
}
