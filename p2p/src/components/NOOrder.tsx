import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import {ReactNode} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NoOrder = ({ text,subText,button,children }: { text: string,subText:string,button?:string,children?:ReactNode }) => {
  const color = useColorModeValue("#666666","#DCE5EF")
  const {t} = useTranslation()
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      py={['60px',"60px","100px"]}
    >
      <Text fontSize='2xl' fontWeight='bold' color={color}>
    {text}
        </Text>
      <Text 
      fontSize={["14px","14px","16px"]} 
      width={["100%","100%","60%"]}
      px={[0,0,"100px"]}
      textAlign='center'
      color={color} 
      py="30px">{subText}</Text>
      <Box>
        {button==="ads" ?
        <Link to="/postad">
           <Button
          width='235px'
          height='40px'
          color="white"
          background='#319EF6'
          box-shadow='0px 1px 7px -2px rgba(24, 39, 75, 0.06), 0px 2px 2px rgba(24, 39, 75, 0.06)'
          border-radius='6px'
        >
         {t('create_ads')}
        </Button>
        </Link> 
         : button=== "trade" ? 
        <Flex gap="30px" flexDirection={["column","column","row"]}>
           <Link to="/postad">
           <Button
          width='235px'
          height='40px'
          color="white"
          background="#0CCB80"
          box-shadow='0px 1px 7px -2px rgba(24, 39, 75, 0.06), 0px 2px 2px rgba(24, 39, 75, 0.06)'
          border-radius='6px'
          
        >
          {t('buy')} Ads
        </Button>
        </Link> 
        <Link to="/postad">
        <Button
       width='235px'
       height='40px'
       color="white"
       background="#FF3358"
       box-shadow='0px 1px 7px -2px rgba(24, 39, 75, 0.06), 0px 2px 2px rgba(24, 39, 75, 0.06)'
       border-radius='6px'
       
     >
       {t('sell')} Ads
     </Button>
     </Link>
        </Flex>
       
        :null
       
       } 
       {children}
      </Box>
    </Flex>
  );
};

export default NoOrder;
