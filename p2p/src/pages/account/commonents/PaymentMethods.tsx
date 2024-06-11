import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useColorModeValue, useMediaQuery,Spacer, Divider, Button } from '@chakra-ui/react'
import React from 'react'
import { shortenInfo } from '../../../utils';
import { PROFILE_MOBILE } from '../../../utils/hooks/useRigelBadge';
import BankList from './BankList';

const PaymentMethods = ({data,setProfileMobilePage,fullView,setFullView}:{data?:any,setProfileMobilePage?:any,fullView?:boolean,setFullView?:any}) => {
    
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const inactiveColour = useColorModeValue("#333333", "#999999");
  const activeColour = useColorModeValue("#333333", "#DCE5EF");

  const setView =(enumVal)=>{
    setFullView((val)=>!val)
    setProfileMobilePage(enumVal)
}

  return (
    <>
    {/* {fullView && <Flex onClick={()=>setView(PROFILE_MOBILE.PROFILE_INFORMATION)}>
       <ArrowBackIcon /> <Text mt="-4px" ml="8px">Back to Profile</Text>
    </Flex>}
    <Text mt="23px" color={activeColour} fontSize={20} fontWeight={500}>
       Payment Methods
      </Text>
      <Divider size={"xl"} mt="7px" />
      <Text>
        The payment method you add will be shown to a buyer when you’re selling cryptocurrencies, so please ensure the account name is consistent with your verified name here. You can add more than one payment methods.
      </Text>
<BankList data={data} refresh={refetch} /> */}

    </>
  )
}

export default PaymentMethods