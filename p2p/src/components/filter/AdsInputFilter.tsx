import {
  Box,
  Button,
  Flex,
  Img,
  Select,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import {useCallback, useState,Dispatch,SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import { RootState } from '../../state/store';

import {
  CalendarIcon,
  ChevronDownIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import CustomModal from '../Modals/CustomModal';
import SelectToken from '../tokens/SelectToken';
import MobileFilter from './MobileFilter';
import { useTranslation } from 'react-i18next';

interface IAdsInputFilter {
  userAllAssetType: string;
  setOrderType: Dispatch<SetStateAction<string>>;
  setUserAllAdType: ActionCreatorWithPayload<any, string>;
  setAllPageNumber: ActionCreatorWithPayload<any, string>;
  userAllAdType: string;
  startDate: Date;
  endDate: Date;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  setAllAdsEndDate: ActionCreatorWithPayload<any, string>;
  setUserAllAssetType: ActionCreatorWithPayload<any, string>;
  userAdsAssetLogo: string;
  setSelectedFiat: ActionCreatorWithPayload<any, string>;
  setUserAllAdStatus: ActionCreatorWithPayload<any, string>;
  setAllAdsStartDate: ActionCreatorWithPayload<any, string>;
  setOrderStatus: Dispatch<SetStateAction<string>>;
  userAllAdStatus: string;
  refetch: any;
  fiat:{name:string,logo:string,currency:string};
  showAdsStatus?: boolean;
  adsTabIndex?: number;
  currencies:any;
}

const AdsInputFilter = ({
  userAllAssetType,
  setOrderType,
  setUserAllAdType,
  userAllAdType,
  setAllPageNumber,
  startDate,
  endDate,
  fiat,
  setStartDate,
  userAdsAssetLogo,
  setEndDate,
  setUserAllAssetType,
  setUserAllAdStatus,
  setAllAdsEndDate,
  setAllAdsStartDate,
  setOrderStatus,
  userAllAdStatus,
  refetch,
  showAdsStatus,
  currencies,
  setSelectedFiat,
  adsTabIndex
}: IAdsInputFilter) => {
  const closeBtnColour = useColorModeValue('#666666', '#DCE5EF');
  const mode = useColorModeValue('light', 'dark');
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
  const inputBorderColor = useColorModeValue("#DEE5ED", "#2D3748");
  const activeTextColor = useColorModeValue("#333333", "");
  const inactiveTextColor = useColorModeValue("#CCCCCC", "");

  const [openModal, setOpenModal] = useState(false); 
  const [showMobile,setShowMobile] = useState({show:false,tab:0});
  const [tradeTypeStatus, setTradeTypeStatus] = useState({
    type: "all",
    status: "all",
  })
  const [tokenModal, setTokenModal] = useState<boolean>(false);
  const onCurrencySelect = useCallback((inputCurrency) => {
    
    setTokenModal((state) => !state);
    dispatch(
      setUserAllAssetType({
        userAllAssetType: inputCurrency?.tokenInfo?.symbol ?? inputCurrency?.symbol ?? "All",
        userAdsAssetLogo: inputCurrency?.tokenInfo?.logoURI ?? inputCurrency?.logo ?? "",
      })
    );
    refetch()
  }, []);
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const adTabIndex = useSelector((state: RootState) => state.ads.adTabIndex);
  const resetTypeStatus = () => {
    if(showMobile.tab===1){
      dispatch(
        setUserAllAdType({
          userAllAdType: "all",
        })
      );
      dispatch(
        setUserAllAdStatus({
          userAllAdStatus: "all",
        })
      );

      dispatch(setAllPageNumber({ page: 1 }));
    
    }
      
  }
  const setUserDateFilter = () => {
    dispatch(setAllPageNumber({ page: 1 }));
    setShowMobile({show:false,tab:0})
    refetch();
  };
  const setUserStatusFilter = ()=> {
          dispatch(
            setUserAllAdType({
              userAllAdType: tradeTypeStatus.type,
            })
          );
          dispatch(
            setUserAllAdStatus({
              userAllAdStatus: tradeTypeStatus.status,
            })
          );
          refetch();
          setShowMobile({show:false,tab:0})
          dispatch(setAllPageNumber({ page: 1 }));
  }

const resetDateRange = () => {
setStartDate("");
setEndDate("");
dispatch(setAllAdsStartDate({ startDate: null }));
dispatch(setAllAdsEndDate({ endDate: null }));
refetch();
dispatch(setAllPageNumber({ page: 1 }));
setShowMobile({show:false,tab:0})
};

  return (
    <>
    {isMobileDevice ? 
    <MobileFilter
    resetTypeStatus={resetTypeStatus}
    resetDateRange={resetDateRange}
    setUserStatusFilter={setUserStatusFilter}
    startDate={startDate}
    endDate={endDate}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    setUserAllAssetType={setUserAllAssetType}   
    setUserAllAdType={setUserAllAdType}
    setAllTradesEndDate={setAllAdsEndDate}
    setAllTradesStartDate={setAllAdsStartDate}
    setAllPageNumber={setAllPageNumber}
    setUserDateFilter={setUserDateFilter}
    refetch={refetch}
    showMobile={showMobile}
    setShowMobile={setShowMobile}
    onCurrencySelect={onCurrencySelect}
    tokenModal={tokenModal}
    setTokenModal={setTokenModal}
    currencies={currencies}
    openModal={openModal}
    fiat={fiat}
    type="ads"
    setSelectedFiat={setSelectedFiat}
    setOpenModal={setOpenModal}
    userAllAssetType={userAllAssetType}
    /> :
 <Stack  
      fontSize={{ base: '11px', md: '13px', lg: '14px' }}
       mt={5} 
       direction={["column", isMobileDevice ? "column" : "row"]}
       spacing={isMobileDevice ? "6px" : "26px"}
        >
        <Box>
          <Text color={closeBtnColour}>{t('currency')}</Text>
         
            <Flex
              mt={{ base: 2 }}
              // px={{ base: 2 }}
              px="10px"
              alignItems='center'
              justifyContent='space-between'
              height='50px'
              border='1px'
              borderColor={inputBorderColor}
              borderRadius='6px'
              onClick={() => setTokenModal(true)}
              cursor='pointer'
            >
            {userAdsAssetLogo && <Img src={userAdsAssetLogo} width="35px" height="35px" mr="10px" />}   <Text
                color={userAllAssetType ? activeTextColor : inactiveTextColor}
                fontSize='14px'
              >
                {userAllAssetType ? userAllAssetType : "All"}
              </Text>
              <ChevronDownIcon color={inactiveTextColor} />
            </Flex>
           <SelectToken
          onCurrencySelect={onCurrencySelect}
          tokenModal={tokenModal}
          setTokenModal={setTokenModal}
          showBalance={false}
          showAny={true}
        />
        </Box>
        <Box>
            <Text color={closeBtnColour}>{t('fiat')}</Text>
            <Flex
          mt={{ base: 2 }}
          px="10px"
          alignItems='center'
          justifyContent='space-between'
          h='50px'
          border='1px'
          borderColor={inputBorderColor}
          borderRadius='6px'
          onClick={() => setOpenModal(true)}
          cursor='pointer'
        >
          <Flex justifyContent="space-between"
            color={fiat ? activeTextColor : inactiveTextColor}
            fontSize='14px'
          >
           {fiat?.logo !== "" && <Img
  src={fiat?.logo}
  width="16px"
  height="12px"
  mr="10px"
  mt="5px"
   alt={fiat?.name?.slice(0,2)} />} {fiat && fiat.name!=="ALLS" ? fiat?.currency : "All"}
          </Flex>
          <ChevronDownIcon color={inactiveTextColor} />
        </Flex>
        <CustomModal
          data={[{name:"ALLS",logo:"",currency:""},...currencies]} //
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          selectedItem={fiat}
          setSelectedItem={(value:{name:string,logo:string,currency:string}) => {
            dispatch(setSelectedFiat({ fiat: value.name ==="ALLS" ? {name:"ALLS",logo:"",currency:""} : {name:value.name,logo:value.logo,currency:value.currency} }));
          }}
          placeholder='Search for currency'
          title='Select Currency'
        />
          </Box>
        <Box>
          <Text color={closeBtnColour}>{t('ad_type')}</Text>
          <Select
            my={2}
            border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
            borderRadius="6px"
            alignItems={'center'}
            width={'auto'}
            height={'50px'}
            color={closeBtnColour}
            onChange={(event) => {
              setOrderType(event.target.value);
              dispatch(
                setUserAllAdType({
                  userAllAdType: event.target.value,
                })
              );
              refetch();
              dispatch(setAllPageNumber({ page: 1 }));
            }}
          >
            <option value="all" selected={userAllAdType === 'all'}>
             {t('all')}
            </option>
            <option value="buy" selected={userAllAdType === 'buy'}>
              {t('buy')}
            </option>
            <option value="sell" selected={userAllAdType === 'sell'}>
              {t('sell')}
            </option>
          </Select>
        </Box>
        
        {showAdsStatus && adsTabIndex===0 && (
          <Box>
            <Text color={closeBtnColour}>{t('ad_status')}</Text>
            <Select
              my={2}
              border={
                mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'
              }
              borderRadius="6px"
              alignItems={'center'}
              width={'auto'}
              height={'50px'}
              color={closeBtnColour}
              onChange={(event) => {
                setOrderStatus(event.target.value);
                dispatch(
                  setUserAllAdStatus({
                    userAllAdStatus: event.target.value,
                  })
                );
                refetch();
                dispatch(setAllPageNumber({page:1}));
              }}
            >
              <option value="" selected={userAllAdStatus === ''}>
                All
              </option>
              <option value="online" selected={userAllAdStatus === 'online'}>
                Online
              </option>
              <option value="offline" selected={userAllAdStatus === 'offline'}>
                Offline
              </option>
            </Select>
          </Box>
        )}
      
        <Box>
          <Text color={closeBtnColour}>{t('created_date')}</Text>
          <Flex
            my={2}
            color="#fff"
            border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
            height='50px'
            borderRadius="6px"
            p={3}
            alignItems={'center'}
          >
            <style>
              {`.date-picker input {
                  background: none;
                  color: #777;
                  width: inherit
              }`}
            </style>
            <DatePicker
              isClearable
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={(date: any) => {
                setStartDate(date);
                dispatch(
                  setAllAdsStartDate({
                    allAdsStartDate: date,
                  })
                );
                refetch();
                dispatch(setAllPageNumber({page:1}));
              }}
              wrapperClassName="date-picker"
              placeholderText="Start Date"
            />
            <DatePicker
              isClearable
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              onChange={(date: any) => {
                setEndDate(date);
                dispatch(
                  setAllAdsEndDate({
                    allAdsEndDate: date,
                  })
                );
                refetch();
                dispatch(setAllPageNumber({page:1}));
              }}
              minDate={startDate}
              wrapperClassName="date-picker"
              placeholderText="End Date"
            />
            <Spacer />
            <CalendarIcon color={closeBtnColour} />
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Button
          height='50px'
            mt={8}
            onClick={() => {
              
              dispatch(
                setUserAllAssetType({
                  userAllAssetType: 'all',
                })
              );
              dispatch(
                setUserAllAdType({
                  userAllAdType: '',
                })
              );
              dispatch(
                setUserAllAdStatus({
                  userAllAdStatus: adTabIndex === 1 ? "online" : '',
                })
              );
              dispatch(
                setAllAdsEndDate({
                  allAdsEndDate: null,
                })
              );
              dispatch(
                setAllAdsEndDate({
                  allAdsStartDate: null,
                })
              );
              dispatch(setAllPageNumber({page:1}));
              refetch();
            }}
            border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
            alignItems={'center'}
            p={3}
            borderRadius="6px"
            leftIcon={<RepeatIcon color={closeBtnColour} />}
            color={closeBtnColour}
            variant="outline"
          >
            {t('refresh')}
          </Button>
        </Box>
      </Stack>
    }
     
    </>
  );
};

export default AdsInputFilter;
