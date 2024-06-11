import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Flex, Img, Input, InputGroup, InputLeftElement, Text, useColorModeValue } from '@chakra-ui/react';
import { BalanceBox } from '.';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { fiatCurrencies } from '../../../utils/constants/constants';
import CustomModal from '../../../components/Modals/CustomModal';
import { AddIcon } from '../../../assets/Icons';
import SelectToken from '../../../components/tokens/SelectToken';
import { useDispatch, useSelector } from 'react-redux';
import { addToWalletBalances,removeFromWalletBalances,setSelectedFiat } from '../../../state/user';
import { RootState } from '../../../state/store';
import useDebounce from '../../../utils/hooks/useDebounce';
import { useActiveWeb3React } from '../../../utils/hooks';
import { useTranslation } from 'react-i18next';



export type tokenData = {
  name?: string,
  symbol?: string,
  logo?: string
  selectedFiat?: {name:string,logo:string,currency:string}
  balance: string | number,
  marketPrice: number;
  address:string
  id?: string
  removeFromList: (symbol:string) => void
  pinned:boolean
}

export default function BalanceBoxLists() {
  
  const [tokenModal, setTokenModal] = useState<boolean>(false);
  const [balanceBoxSearch,setBalanceBoxSearch] = useState("")
  const {chainId,account} = useActiveWeb3React()
  const [openModal, setOpenModal] = useState(false);
  const [chainID, setChainID] = useState("");
  const {walletBalances, chainId:selectedChainID,selectedFiat} = useSelector((state:RootState)=> state.user)
  const inputBorderColor = useColorModeValue("#DEE5ED", "#2D3748");
  const activeTextColor = useColorModeValue("#333333", "");
  const customColor= useColorModeValue("#4CAFFF","#4CAFFF");
  const customColor2= useColorModeValue( "#2D3748","#DCE6EF");
  const inactiveTextColor = useColorModeValue("#CCCCCC", "");
  const [walletBalance,setWalletBalance] = useState(walletBalances[chainID])
  const dispatch = useDispatch()
  const debouncedQuery = useDebounce(balanceBoxSearch, 300);
  // const CustomModal = lazy(() => import("../../../components/Modals/CustomModal"))
 
  const {t} = useTranslation()
  useEffect(() => {
    // setChainID(chainId == 97 || chainId == 56 ? "BSC" : "MATIC");
    setChainID(chainId && chainId ==97 ?"BSCTEST" : chainId==80001 ? "MATICTEST" : chainId == 56 ? "BSC" : "MATIC");
    // setChainID(chainId && (chainId == 97 ||  chainId==56)? "BSC" : "MATIC");
    const chain = chainId && chainId ==97 ?"BSCTEST" : chainId==80001 ? "MATICTEST" : chainId == 56 ? "BSC" : "MATIC"
    setWalletBalance(walletBalances[chain])
  }, [chainId,account]);
  
 useMemo(()=>{
   if(debouncedQuery===""){
    setWalletBalance(walletBalances[chainID])
   }else{
    const search = walletBalances[chainID].filter((user) => {
      return user.symbol.toLowerCase().includes(debouncedQuery.toLowerCase()) ||user.name.toLowerCase().includes(debouncedQuery.toLowerCase());
      // Use the toLowerCase() method to make it case-insensitive
    }); 
    setWalletBalance(search)
   }
  },[debouncedQuery,walletBalances,chainId])
  const onCurrencySelect = useCallback(async (inputCurrency:any) => {
    setTokenModal((state) => !state);
    if(walletBalances[chainID].indexOf((item:any) =>item.symbol === inputCurrency?.tokenInfo?.symbol) === -1){
      const coinGeckoList =await fetch("https://api.coingecko.com/api/v3/coins/list")

      const response = await coinGeckoList.json() 
        const search = response.filter((item:any)=>item.symbol.toLowerCase() === inputCurrency?.tokenInfo?.symbol.toLowerCase())
     //    
      dispatch(
      addToWalletBalances({
        token: {
          symbol:inputCurrency?.tokenInfo?.symbol ?? inputCurrency?.symbol,
          name:inputCurrency?.tokenInfo?.name ?? inputCurrency?.name,
          address:inputCurrency?.tokenInfo?.address ?? inputCurrency?.address,
          id:search[0].id,
          pinned:false,
          currency:inputCurrency,
          logo:inputCurrency?.tokenInfo?.logoURI ?? inputCurrency?.logoURI,
        },
        chainId:chainId ?? selectedChainID
      })
    );
    }
    
  }, [chainId,chainID]);

  const removeFromList = (symbol:string) => {
    dispatch(removeFromWalletBalances({
      token: {
        symbol,
      },
      chainId:chainId ?? selectedChainID
    }))
  }
  return (
    <Box>
      <Flex justifyContent="space-between" flexDirection={["column","column","row"]} minWidth={["100%","100%","1000px"]} >
        <Box>
          <Text>{t('TPC')}</Text>
      <Flex
              mt={{ base: 2 }}
              px={{ base: 2 }}
              alignItems='center'
              justifyContent='space-between'
              h='45px'
              border='2px'
              borderColor={inputBorderColor}
              borderRadius='4px'
              onClick={() => setOpenModal(true)}
              cursor='pointer'
            width="160px"
            >
              <Flex>
                   {selectedFiat.logo !== "" && <Img
  src={selectedFiat.logo}
  width="24px"
  height="20px"
  mr="10px"
  mt="0px"
   alt={selectedFiat?.name?.slice(0,2)} />} <Text
                color={selectedFiat ? activeTextColor : inactiveTextColor}
                fontSize='14px'
              >
                {selectedFiat.currency ?? "USD"}
              </Text>
              </Flex>
            
              <ChevronDownIcon color={inactiveTextColor} />
            </Flex>
          <CustomModal
            data={fiatCurrencies}
            isOpen={openModal}
            onClose={setOpenModal}
            selectedItem={selectedFiat}
            setSelectedItem={(country:any)=>dispatch(setSelectedFiat({fiat:country}))}
            placeholder="Search for currency"
            title="Select Currency"
          />
        </Box>
        <Box>
          <Text mb="10px" mt={["10px","10px",0]}>{t('search_tokens')}</Text>
          <Flex>
      
      <InputGroup width="95%" mx="auto">
  <InputLeftElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input type='tel'
    onChange={(e)=>setBalanceBoxSearch(e.target.value)}
    placeholder='Search token'  />
  </InputGroup>
  <Button width={["80px","80px","172px"]} marginLeft={["8px","8px","20px"]} height="40px" variant="brand">
            {t('search')}
  </Button>
      </Flex>
        </Box>
      
      </Flex>
       <Flex flexWrap={'wrap'} width="100%" mx="auto" justifyContent="flex-start">
      
       {chainID && walletBalance?.map((waletItem: tokenData,index:number) => (
        <BalanceBox 
        removeFromList={removeFromList} key={index}
        {...waletItem} selectedFiat={selectedFiat} />
      ))} 

        <Flex
        cursor="pointer"
      // w={{ base: '100%', md: '60%', lg: '40%', xl: '31%' }}
      w={{ base: '100%', md: '310px', lg: '310px', xl: '310px' }}
      minH="200px"
      boxShadow="md"
      rounded="md"
      border="1px solid #319EF6"
      m={['10px auto', '20px auto', '30px 11px']}
      p={['20px 15px']}
      position="relative" 
      onClick={() => setTokenModal(!tokenModal)}
      justifyContent="center" alignItems='center'
    >
      <Flex flexDirection="column">
        <Box textAlign="center">
          <Flex justifyContent="center">
            <AddIcon /> 
          </Flex>
             
           <Text fontSize="16px" color={customColor}>{t('add_custom')}</Text>
        <Text color={customColor2}>{t('add_token')}</Text>
        </Box>
       
      </Flex>
      
    </Flex>

    </Flex>
    <SelectToken
            onCurrencySelect={onCurrencySelect}
            tokenModal={tokenModal}
            setTokenModal={setTokenModal}
            showBalance={true}
            showAny={false}
            noSelected={true}
          />
    </Box>
   
  );
}


