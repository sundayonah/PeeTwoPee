import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Image, Heading, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';

import { tokenData } from './BalanceBoxList';
import { getERC20Token, numberWithCommas } from '../../../utils';
import { useActiveWeb3React } from '../../../utils/hooks';
import { weiToToken } from '../../../utils/functions/util';
import { useTranslation } from 'react-i18next';


export default function BalanceBox({balance,marketPrice,removeFromList,pinned,id, logo,name,symbol,address,selectedFiat}: tokenData) {
  const {  account, library } = useActiveWeb3React();

  const [userBalance,setUserBalance] = useState("0")
  const [currencyBalance,setCurrencyBalance] = useState("0")
  const [img,setImg] = useState("")
  
  useEffect(()=>{
    getTokenInfo()
  },[name,symbol,address,selectedFiat,account])
  const getTokenInfo = async () =>{

   const coinGeckoList =await fetch(`https://api.coingecko.com/api/v3/coins/${id}`) 

   const response = await coinGeckoList.json() 
   
    const token = await getERC20Token(address, library);
    const walletBal = await token.balanceOf(account);
    const decimals = await token.decimals();
    const image = response.image.large
   
    setImg(image)
    const userBal =weiToToken(walletBal.toString(),decimals)
    setUserBalance(userBal)
    setCurrencyBalance(response.market_data?.current_price[selectedFiat.currency.toLowerCase()])
  }
  const bgColor= useColorModeValue("#F2F5F8","#213345")
  const borderColor= useColorModeValue("#DEE6ED","#324D68")
  const { t } = useTranslation()
  return (
    <Box
      w={["100%","100%","330px"]}
      minH="60px"
      boxShadow="md"
      rounded="md"
      borderColor="gray.200"
      m={['10px auto', '20px auto', '30px 11px']}
      p={['20px 15px 10px 15px']}
      position="relative"
      background={bgColor}
      border={`1px solid ${borderColor}`}
    >
      <Flex justifyContent="space-between" alignItems={'center'}>
        <Flex alignItems={'center'}>
          <Image src={logo} alt="" mr="5px" width="40px" height="40px" />
          <Heading as="h2" fontSize="16px">
           {symbol}
          </Heading>
        </Flex>
        <Text as="p" fontSize="14px">
     {t('market_price')} : {currencyBalance ?? NaN} {selectedFiat.currency}
        </Text>
      </Flex>
      <Box mt="50px">
        <Text mb="2px">{t('CB')}</Text>
      <Flex justifyContent="space-between" mt="0px">
        <Box>
        <Heading as="h1" mb={3} fontSize={["20px","20px","25px"]}>
          {parseFloat(userBalance) >0 ?parseFloat(userBalance).toFixed(4): "0.0"} {symbol}
        </Heading>
        </Box>
        
        <Text as="p" mt="2px">
          &#8781; {numberWithCommas((parseFloat(currencyBalance)*parseFloat(userBalance)).toFixed(2))} {selectedFiat.currency}{' '}
          <Tooltip hasArrow label="Balance">
            <InfoOutlineIcon />
          </Tooltip>
        </Text>
      </Flex>
      </Box>
          
     {!pinned && <Box position="absolute" right="15px" bottom="5px">
        <Text mb={3}><CloseIcon fontSize="12px" color="red.200" cursor="pointer" onClick={()=>removeFromList(symbol)}/></Text>
      </Box>}
    </Box>
  );
}
