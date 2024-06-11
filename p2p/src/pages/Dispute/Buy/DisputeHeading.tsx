import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  Tooltip,
  useClipboard,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsArrowRight,BsChatSquareText } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import Timer from "../../../components/Timer";
import { shortenInfo } from "../../../utils";

type IHeading = {
  heading: string;
  text: string;
  orderNumber: string;
  time: string;
  timer?: boolean;
  secs?: string;
  cancel?: boolean;
  updateUI?: () => void;
  openChatBox?: (open,prev) => void
};

export default function DisputeHeading({
  heading,
  text,
  orderNumber,
  time,
  timer,
  secs,
  cancel,
  updateUI,
  openChatBox
}: IHeading) {
  const colorText = useColorModeValue("#666666", "#DCE6EF");
  const colorText2 = useColorModeValue("#333333", "#fff");
  const chatBg= useColorModeValue("#F2F5F8","#213345")
  const cancelHeading = useColorModeValue("#FF3358", "#FF3358");
  const textColor = useColorModeValue("#319EF6", "#4CAFFF");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const location = useLocation();
  const { t } = useTranslation()
 
  const { hasCopied, onCopy } = useClipboard(window.location.href);
  return (
    <>
    {isMobileDevice ?
    <Flex
    justifyContent='space-between'
    flexDirection={isMobileDevice ? "column" : "row"}
  >
    <Box>
      <Flex>
        <Box>
          <Heading
        color={cancel ? cancelHeading : undefined}
        as='h4'
        fontSize={isMobileDevice ? "18px" : "24px"}
      >
        {heading}
      </Heading>
      <Text
          color={colorText}
          mt={4}
          width="100%"
          fontSize={["14px","14px","16px"]}
        >
          {text}
        </Text>
        </Box>
      
        
        <Box  ml={1} mt={0}>
          {timer && secs && <Timer secs={secs} updateUI={updateUI} />}
        </Box>
      </Flex>
    </Box>
    <Box>
      {location.pathname.split("/").includes("trade") && (
        <Flex mt={5} justifyContent="space-between">
          <Text color={colorText} fontSize='14px' mt='2px'>
            {t('order_no')}:{" "}
          </Text>
          <Tooltip
            hasArrow
            label={hasCopied ? "Copied!" : "Copy"}
            bg='gray.300'
            color='black'
          >
            <Text ml='14px' color={colorText2}>
              {shortenInfo(orderNumber,5)} <CopyIcon onClick={onCopy} cursor='pointer' />
            </Text>
          </Tooltip>
        </Flex>
      )}
      <Flex mt={2}  justifyContent="space-between">
        <Text color={colorText} fontSize='14px' mt='2px'>
          {t('time_created')} :{" "}
        </Text>
        <Text ml='14px' color={colorText2}>
          {time}
        </Text>
      </Flex>
      <Flex width="100%" py="15px" px="9px" my="15px" bg={chatBg} borderRadius="6px"  justifyContent="space-between" onClick={()=>openChatBox(true,0)}>
        <Flex color={textColor} width="50%" mt="-3px" >
          <Icon as={BsChatSquareText} color={textColor} mt="8px" mr="7px"/>
          <Text>{t('open_chat')}</Text> 
        </Flex>
        <Flex justifyContent="flex-end" width="50%">
          <Icon as={BsArrowRight} color={textColor} mt="4px"/>
        </Flex>
        <Box>
         
        </Box>
      </Flex>
    </Box>
  </Flex> : 
  <Flex
  justifyContent='space-between'
  flexDirection="row"
>
  <Box>
    <Heading
      color={cancel ? cancelHeading : undefined}
      as='h4'
      fontSize={isMobileDevice ? "21px" : "24px"}
    >
      {heading}
    </Heading>
    <Flex flexDirection="row">
      <Text
        color={colorText}
        mt={4}
        width={isMobileDevice ? "100%" : timer ? "50%" : "100%"}
      >
        {text}
      </Text>
      <Box className="OrdeTimer" ml={6} mt={5}>
        {timer && secs && <Timer secs={secs} updateUI={updateUI} />}
      </Box>
    </Flex>
  </Box>
  <Box>
    {location.pathname.split("/").includes("trade") && (
      <Flex mt={5}>
        <Text color={colorText} fontSize='14px' mt='2px'>
          {t('order_no')}:{" "}
        </Text>
        <Tooltip
          hasArrow
          label={hasCopied ? "Copied!" : "Copy"}
          bg='gray.300'
          color='black'
        >
          <Text ml='14px' color={colorText2}>
          {shortenInfo(orderNumber,5)} <CopyIcon onClick={onCopy} cursor='pointer' />
          </Text>
        </Tooltip>
      </Flex>
    )}
    <Flex mt={4}>
      <Text color={colorText} fontSize='14px' mt='2px'>
        {t('time_created')}:{" "}
      </Text>
      <Text ml='14px' color={colorText2}>
        {time}
      </Text>
    </Flex>
  </Box>
</Flex>
  }
    </>
    
  );
}
