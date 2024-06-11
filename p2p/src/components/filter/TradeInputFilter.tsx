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
  import  {useState, useCallback,Dispatch,SetStateAction} from 'react';
  import DatePicker from 'react-datepicker';
  import {
    CalendarIcon,
    ChevronDownIcon,
    RepeatIcon,
  } from '@chakra-ui/icons';
  import { useDispatch } from 'react-redux';
  import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import SelectToken from '../tokens/SelectToken';
import CustomModal from '../Modals/CustomModal';
import MobileFilter from './MobileFilter';
import { useTranslation } from 'react-i18next';
  
  interface ITradeInputFilter {
    userAllAssetType: string;
    setUserAllAdType: ActionCreatorWithPayload<any, string>;
    setUserAllTradeStatus: ActionCreatorWithPayload<any, string>;
    setAllPageNumber: ActionCreatorWithPayload<any, string>;
    userAllAdType: string;
    startDate: Date;
    endDate: Date;
    setStartDate: Dispatch<SetStateAction<string>>;
    setEndDate: Dispatch<SetStateAction<string>>;
    setAllTradesEndDate: ActionCreatorWithPayload<any, string>;
    setSelectedFiat: ActionCreatorWithPayload<any, string>;
    setUserAllAssetType: ActionCreatorWithPayload<any, string>;
    setAllTradesStartDate: ActionCreatorWithPayload<any, string>;
    setOrderStatus: Dispatch<SetStateAction<string>>;
    fiat: {name:string,logo:string,currency:string};
    currencies:any;
    userAllTradestatus: string;
    userAllTradeLogo:string;
    refetch: any;
  }
  
  const TradeInputFilter = ({
    userAllAssetType,
    setUserAllAdType,
    setUserAllTradeStatus,
    userAllAdType,
    setAllPageNumber,
    startDate,
    userAllTradeLogo,
    setSelectedFiat,
    fiat,
    currencies,
    endDate,
    setStartDate,
    setEndDate,
    setUserAllAssetType,
    setAllTradesEndDate,
    setAllTradesStartDate,
    userAllTradestatus,
    refetch,
  }: ITradeInputFilter) => {
    const activeTextColor = useColorModeValue("#333333", "");
    const inactiveTextColor = useColorModeValue("#CCCCCC", "");
    const closeBtnColour = useColorModeValue('#666666', '#DCE5EF');
    const inputBorderColor = useColorModeValue("#DEE5ED", "#2D3748");
    const mode = useColorModeValue('light', 'dark');
    const { t } = useTranslation()
    const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
    const [tokenModal, setTokenModal] = useState<boolean>(false);
    const [showMobile,setShowMobile] = useState({show:false,tab:0});
  
    const [openModal, setOpenModal] = useState<boolean>(false);
    const onCurrencySelect = useCallback((inputCurrency) => {
      setTokenModal((state) => !state);
      dispatch(
        setUserAllAssetType({
          userAllAssetType: inputCurrency?.tokenInfo?.symbol ?? inputCurrency?.symbol ?? "All",
          userAllTradeLogo: inputCurrency?.tokenInfo?.logoURI ?? inputCurrency?.logoURI ?? "",
        })
      );
      refetch()
    }, []);
    const dispatch = useDispatch();
  
    const resetTypeStatus = () => {
      if(showMobile.tab===1){
        dispatch(
          setUserAllAdType({
            userAllAdType: "all",
          })
        );
        dispatch(
          setUserAllTradeStatus({
            userAllTradestatus: "all",
          })
        );

        dispatch(setAllPageNumber({ page: 1 }));
      setShowMobile({show:false,tab:0})
      }
        
    }
    const setUserStatusFilter = (tradeTypeStatus)=> {
            dispatch(
              setUserAllAdType({
                userAllAdType: tradeTypeStatus.type,
              })
            );
            dispatch(
              setUserAllTradeStatus({
                userAllTradestatus: tradeTypeStatus.status,
              })
            );
            refetch();
            setShowMobile({show:false,tab:0})
            dispatch(setAllPageNumber({ page: 1 }));
    }
  
const resetDateRange = () => {
  setStartDate("");
  setEndDate("");
  dispatch(setAllTradesStartDate({ startDate: null }));
  dispatch(setAllTradesEndDate({ endDate: null }));
  refetch();
  dispatch(setAllPageNumber({ page: 1 }));
  setShowMobile({show:false,tab:0})
};
const setUserDateFilter = () => {
  dispatch(setAllPageNumber({ page: 1 }));
  setShowMobile({show:false,tab:0})
  refetch();
};

  return (
      <>
      {!isMobileDevice ?  <Stack  
        fontSize={{ base: '11px', md: '13px', lg: '14px' }}
         mt={5} 
         direction={["column", isMobileDevice ? "column" : "row"]}
         spacing={isMobileDevice ? "6px" : "26px"}
          >
         <Box>
          <Text color={closeBtnColour}>{t('currency')}</Text>
         
            <Flex
              mt={{ base: 2 }}
              px="10px"
              alignItems='center'
              justifyContent='space-between'
              height='50px'
              border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
              borderRadius='6px'
              onClick={() => setTokenModal(true)}
              cursor='pointer'
            >
            {userAllTradeLogo && <Img src={userAllTradeLogo} width="35px" height="35px" mr="10px" />}  <Text
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
          border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
          borderRadius='6px'
          onClick={() => setOpenModal(true)}
          cursor='pointer'
        >
          <Flex justifyContent="space-between"
            color={fiat ? activeTextColor : inactiveTextColor}
            fontSize='14px'
          >
           {fiat.logo !== "" && <Img
  src={fiat.logo}
  width="24px"
  height="20px"
  mr="10px"
  mt="0px"
   alt={fiat?.name?.slice(0,2)} />} {fiat && fiat.name.toLowerCase()!=="alls" ? fiat.currency : "All"}
          </Flex>
          <ChevronDownIcon color={inactiveTextColor} />
        </Flex>
        <CustomModal
          data={[{name:"ALLS",logo:"",currency:""},...currencies]} 
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          selectedItem={fiat}
          setSelectedItem={(value:{name:string,logo:string,currency:string}) => {
            dispatch(setSelectedFiat(
              { fiat: value.name ==="ALLS" ? 
              {name:"ALLS",logo:"",currency:""} :
             {name:value.name,logo:value.logo,currency:value.currency} 
            }));
          }}
          placeholder='Search for currency'
          title='Select Currency'
        />
          </Box>
          <Box>
            <Text color={closeBtnColour}>{t('trade_type')}</Text>
            <Select
              my={2}
              border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
              borderRadius="6px"
              alignItems={'center'}
              cursor="pointer"
              width={'auto'}
              height='50px'
              color={closeBtnColour}
              onChange={(event) => {
                dispatch(
                  setUserAllAdType({
                    userAllAdType: event.target.value,
                  })
                );
                refetch();
                dispatch(setAllPageNumber({ page: 1 }));
              }}
            >
              <option value="" selected={userAllAdType === ''}>
                All
              </option>
              <option value="buy" selected={userAllAdType === 'buy'}>
                Buy
              </option>
              <option value="sell" selected={userAllAdType === 'sell'}>
                Sell
              </option>
            </Select>
          </Box>
          <Box>
            <Text color={closeBtnColour}>{t('trade_status')}</Text>
            <Select
              my={2}
              border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
              borderRadius="6px"
              alignItems={'center'}
              cursor="pointer"
              width={'auto'}
              height={'50px'}
              color={closeBtnColour}
              onChange={(event) => {
                dispatch(
                  setUserAllTradeStatus({
                    userAllTradestatus: event.target.value,
                  })
                );
                refetch();
                dispatch(setAllPageNumber({ page: 1 }));
              }}
            >
              {['all','processing','completed','completed','dispute'].map((item,index)=>(
                <option value={item.toLowerCase()} selected={userAllTradestatus === item.toLowerCase() || item==="All" && userAllTradestatus=== ""}>
                {t(item)}
              </option>
              ))}
              </Select>
          </Box>
         
          <Box>
            <Text color={closeBtnColour}>{t('created_date')}</Text>
            <Flex
              my={2}
              color="#fff"
              border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
              borderRadius="6px"
              height='50px'
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
                    setAllTradesStartDate({
                      AllTradesStartDate: date,
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
                    setAllTradesEndDate({
                      AllTradesEndDate: date,
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
                  setAllTradesEndDate({
                    AllTradesEndDate: null,
                  })
                );
                dispatch(
                  setAllTradesEndDate({
                    AllTradesStartDate: null,
                  })
                );
                dispatch(setAllPageNumber({page:1}));
                refetch();
              }}
              border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
              alignItems={'center'}
              p={3}
              height='50px'
              borderRadius="6px"
              leftIcon={<RepeatIcon color={closeBtnColour} />}
              color={closeBtnColour}
              variant="outline"
            >
              {t('refresh')}
            </Button>
          </Box>
        </Stack> : 
        <MobileFilter
        resetTypeStatus={resetTypeStatus}
        resetDateRange={resetDateRange}
        setUserStatusFilter={setUserStatusFilter}
        startDate={startDate}
        endDate={endDate}
        type="trades"
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setUserAllAssetType={setUserAllAssetType} 
        userAllAssetType={userAllAssetType}  
        setUserAllAdType={setUserAllAdType}
        setAllTradesEndDate={setAllTradesEndDate}
        setAllTradesStartDate={setAllTradesStartDate}
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
    setOpenModal={setOpenModal}
    fiat={fiat}
    setSelectedFiat={setSelectedFiat}
        />
       
        }
      </>
    );
  };
  
  export default TradeInputFilter;
  