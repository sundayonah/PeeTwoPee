import { Divider, Flex, HStack, Text, useColorModeValue, useMediaQuery  } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {   useSelector } from 'react-redux';
import { AdsPostSteps,  } from '../../../../state/accountUi';
import { RootState } from '../../../../state/store';

const PostAdSideNav = () => {
  
  const activeAdsBar = useSelector((state: RootState) => state.accountUi.activeAdsBar);
  const activeColour = useColorModeValue('#333333', '#DCE5EF');
  const inactiveColour = useColorModeValue('#999999', '#666666');
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");


  type linkType = {
    id: AdsPostSteps,
    tittle: string
  }
  const {t} = useTranslation()

  const  links : linkType[] =  [
    {id: AdsPostSteps.TRADETYPE, tittle:  t('trade_type_price')},
    {id: AdsPostSteps.APPROVEQUANTITY, tittle: t('approve_quantity')},
    {id: AdsPostSteps.PAYMETHOD, tittle: t('pay_method')},
    {id: AdsPostSteps.AUTORESPONSE, tittle: t('auto_response')}
  ]
if(isMobileDevice){
  return(
    <>
   {
    links.map((linkItem, index)=> (
   
   <HStack display={linkItem.id === activeAdsBar  ? "flex": 'none'}>
        <Text  color={inactiveColour} >{t('step')}</Text> <Text color={'#319EF6'}>{index +1}</Text> <Text color={inactiveColour}>{t('of')}</Text> <Text color={'#319EF6'}>{links.length}</Text>
        <Divider  orientation="vertical" height={10} size="xl"  borderColor={'#999999'}  border={"0"}/>
       
        <Text   color={activeColour}>{linkItem.tittle}</Text>
    </HStack>
    )  )
  }
  
    </>
  )
} else{
  return (
    <>
    {links.map((linkItem, index)=> (
      <Flex
        flexDirection={'row'}
      //   onClick={()=> {
      //     linkItem.id === screanId.TRADE ?
      //   dispatch(setAdsBar(linkItem.id))}
      // }
      cursor="pointer"
    >
      <Divider orientation="vertical" height={10} size="xl"  borderColor={linkItem.id === activeAdsBar ?  '#319EF6' : '#999999'}  border={linkItem.id === activeAdsBar ?  "2px" : "0"}/>

      <Text pl={2} fontSize='16px'
        fontWeight={400}
        color={linkItem.id === activeAdsBar ?  activeColour : inactiveColour}

        >
        {linkItem.tittle}
      </Text>
    </Flex>
    ))}


    </>
  )}
}

export default PostAdSideNav
