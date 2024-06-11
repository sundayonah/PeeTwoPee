import { Box, Flex, Icon, Text, Button, useColorModeValue, Img} from '@chakra-ui/react';
import  {  useState,Dispatch,SetStateAction } from 'react'
import { GoSettings } from 'react-icons/go';
import { MdEditCalendar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';

import { CheckIcon, ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import SelectToken from '../tokens/SelectToken';
import CustomModal from '../Modals/CustomModal';
import { formatMongodbTime } from '../../utils/utilsFunctions';
import { useTranslation } from 'react-i18next';

interface IMobileFilter {
        resetTypeStatus: () => void;
        resetDateRange: () => void;
        setUserStatusFilter:(tradeTypeStatus?:any) => void;
        startDate: Date;
        endDate: Date;
        setStartDate: (date: string) => void;
        setEndDate: (date: string) => void;
        setAllTradesEndDate: ActionCreatorWithPayload<any, string>;
    setUserAllAssetType: ActionCreatorWithPayload<any, string>;
    setAllTradesStartDate: ActionCreatorWithPayload<any, string>;
    setUserAllAdType: ActionCreatorWithPayload<any, string>;
    setAllPageNumber: ActionCreatorWithPayload<any, string>;
    onCurrencySelect: (currency: string) => void;
    tokenModal:any;
    setTokenModal:any;
    userAllAssetType:any;
    currencies:any
    openModal:boolean
    setOpenModal:any;
    fiat:any;
    setSelectedFiat:any;
    setUserDateFilter:() => void;
        refetch:any
    showMobile:{
        show: boolean;
        tab: number;
    };
    type:string;
    setShowMobile:Dispatch<SetStateAction<{
        show: boolean;
        tab: number;
    }>>;
}

const MobileFilter = ({resetTypeStatus,resetDateRange,setUserStatusFilter,startDate,endDate,setStartDate,setEndDate,setUserAllAssetType,setUserAllAdType,userAllAssetType,setAllTradesEndDate, setAllTradesStartDate, setAllPageNumber, refetch,setUserDateFilter,showMobile,setShowMobile,onCurrencySelect,currencies,openModal,setOpenModal,tokenModal,setTokenModal,fiat,setSelectedFiat,type}:IMobileFilter) => {
    const inactiveTextColor = useColorModeValue("#CCCCCC", "");
    const closeBtnColour = useColorModeValue('#666666', '#DCE5EF');
    const filterBgColour = useColorModeValue("#FFFFFF", "#15202B");
    const textColor = useColorModeValue("#333333", "#fff");
    const borderColor = useColorModeValue("#DEE6ED", "#324D68");
    const boxColor = useColorModeValue("#F2F5F8","#213345")
    const activeTextColor = useColorModeValue("#333333", "");
    const mode = useColorModeValue('light', 'dark');
    const { t } = useTranslation()
    const [tradeTypeStatus, setTradeTypeStatus] = useState({
      type: "all",
      status: "all",
    })
    const statusList =type==="ads" ? [t('all'),t('online'),t('offline')]:[t('all'),t('processing'),t('completed'),t('completed'),t('dispute')]
    
    const dispatch = useDispatch();
    const getDtae = (_ : any) => {
      return   new Date(parseFloat(_)).toLocaleString()
      }
  return (
    <Box >
      
           <Flex mt="20px" justifyContent="space-between" >
            
           <Flex 
           border="1px solid" 
           borderColor={borderColor} 
           width="105px"
           height="32px" 
           borderRadius="4px" 
           justifyContent="space-between"
           alignItems="center"
           box-sizing="border-box"
           px="10px"
           fontSize="12px"
           onClick={()=>setShowMobile((prev)=>({tab:1,show:!prev.show}))}>
           <Icon
            as={GoSettings}
            color={inactiveTextColor}
            fontSize="16px"
            mr="5px"
          />
            <Text mt="0">Filters</Text> 
             <ChevronDownIcon ml="5px" fontSize="16px" mt="0" />
          </Flex>
           <Flex 
           border="1px solid" 
           borderColor={borderColor} 
           width="105px"
           height="32px" 
           borderRadius="4px" 
           box-sizing="border-box"
           px="10px"
           justifyContent="space-between"
           alignItems="center"
           fontSize="12px"
           onClick={()=>setShowMobile((prev)=>({tab:2,show:!prev.show}))}>
           <Icon
            as={IoCalendarNumberOutline}
            color={inactiveTextColor}
            fontSize="16px"
            mr="5px"
          />
            <Text mt="0">All time</Text> 
             <ChevronDownIcon ml="5px" fontSize="16px" mt="0" />
          </Flex>
           <Box>
           <Button  
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
                  setAllTradesStartDate({
                    AllTradesStartDate: null,
                  })
                );
                dispatch(setAllPageNumber({page:1}));
                refetch();
              }}
              fontSize="12px"
              border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
              alignItems={'center'}
              p={3}
              width="115px"
           height="32px" 
           borderRadius="4px" 
           box-sizing="border-box"
           px="10px"
              leftIcon={<RepeatIcon color={closeBtnColour} />}
              color={closeBtnColour}
              variant="outline"
            >
              {t('refresh')}
            </Button>
            </Box>
          </Flex>
          <Box position="relative" zIndex="999">
           
             {showMobile.show && showMobile.tab ===1 ? 
            <Box mr={["0", "0", "30px"]} mt={["30px", "30px", "0"]} color={textColor} background={filterBgColour}  borderRadius="4px" border="1px solid" borderColor={borderColor} position="absolute"
            top="-30px"
            p="10px" boxSizing='border-box' width="100%" >
              
          <Text fontSize="12px">{t('currency')}</Text>
                   <Flex 
                   cursor="pointer"
           border="1px solid" 
           borderColor={borderColor} 
           width="100%"
           height="32px" 
           borderRadius="4px" 
           box-sizing="border-box"
           px="10px"
           justifyContent="space-between"
           alignItems="center"
           fontSize="12px"
           my="14px"
           onClick={()=>setTokenModal(true)}>
            <Box>
            {userAllAssetType ? userAllAssetType : "All"}
            </Box>
            
             <ChevronDownIcon ml="5px" fontSize="16px" mt="0" />
          </Flex>
          <Text fontSize="12px">{t('fiat')}</Text>
                   <Flex 
           border="1px solid" 
           cursor="pointer"
           borderColor={borderColor} 
           width="100%"
           height="32px" 
           borderRadius="4px" 
           box-sizing="border-box"
           px="10px"
           justifyContent="space-between"
           alignItems="center"
           fontSize="12px"
           my="14px"
           onClick={()=>setOpenModal(true)}>
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
   alt={fiat?.name?.slice(0,2)} />}  {fiat && fiat.name!=="ALLS" ? fiat?.currency : "All"}
          </Flex>
            
             <ChevronDownIcon ml="5px" fontSize="16px" mt="0" />
          </Flex>
         <Text mb='12px'>Type</Text>
         {[t('all'),t('buy'),t('sell')]
         .map((item,index)=>{
          return (
          <Flex justifyContent="space-between"
          boxSizing='border-box'
          px="10px"
          color={closeBtnColour}
          background={tradeTypeStatus.type.toLowerCase() === item.toLowerCase() ? boxColor : 'transparent'}
          _hover={{background:boxColor,color:"#319EF6"}} cursor="pointer"
          onClick={() => {
            setTradeTypeStatus((prev)=>({...prev,type:item.toLowerCase()}))
          }}
          > 
           <Text key={index}fontSize="14px" my="7px">{item}</Text>
           {tradeTypeStatus.type.toLowerCase() === item.toLowerCase() && <CheckIcon color="#319EF6" fontSize="13px" mt="11px" />}
        </Flex>

         )})}
         <Box>
         <Text mb='12px'>{t('status')}</Text>
         { statusList
         .map((item,index)=>{
          return (
          <Flex justifyContent="space-between"
          boxSizing='border-box'
          px="10px"
          color={closeBtnColour}
          background={tradeTypeStatus.status.toLowerCase() === item.toLowerCase() ? boxColor : 'transparent'}
          _hover={{background:boxColor,color:"#319EF6"}} cursor="pointer"
          onClick={() => {
        
            setTradeTypeStatus((prev)=>({...prev,status:item.toLowerCase()}))
          }}
          > 
           <Text key={index}fontSize="14px" my="7px">{item}</Text>
           {tradeTypeStatus.status.toLowerCase() === item.toLowerCase() && <CheckIcon color="#319EF6" fontSize="13px" mt="11px" />}
        </Flex>

         )})}
         
      <Flex justifyContent="space-between" gap="20px" my="10px">
        <Button width="130px" height="40px" borderRadius="6px" borderColor="#E5E5E5" background="transparent" border="1px solid"
        onClick={resetTypeStatus}
        >
          Reset
        </Button>
        <Button width="200px" height="40px" borderRadius="6px" background="#319EF6" onClick={()=>setUserStatusFilter(tradeTypeStatus)}>
         Apply all filters
        </Button>
      </Flex>
          </Box>
       </Box> : showMobile.show && showMobile.tab ===2 &&  <Box mr={["0", "0", "30px"]} mt={["30px", "0", "0"]}  color={textColor} background={filterBgColour} position="absolute"  borderRadius="4px" border="1px solid" borderColor={borderColor} px="10px" boxSizing='border-box' width="100%">
       <Box my="20px" cursor="pointer">
        <Text fontSize="12px" color={closeBtnColour} >Start Date</Text>
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
                  dispatch(setAllPageNumber({page:1}));
                }}
                wrapperClassName="date-picker"
                customInput={<Text fontSize="14px" fontWeight="700">{startDate ? formatMongodbTime(startDate.toString(),true) : "--/--/----"}<Icon as={MdEditCalendar} ml="6px" fontSize="18px" pt="3px"/></Text>}
              />
          
        </Box>
       <Box my="20px" cursor="pointer">
        <Text fontSize="12px" color={closeBtnColour} >End Date</Text>
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
                  dispatch(setAllPageNumber({page:1}));
                }}
                minDate={startDate}
                wrapperClassName="date-picker"
                customInput={
                <Text fontSize="14px" fontWeight="700">{endDate ? formatMongodbTime(endDate.toString(),true) : "--/--/----"} <Icon as={MdEditCalendar} ml="6px" fontSize="18px"pt="3px"/></Text>}
              />
          
        </Box>
            <Flex justifyContent="space-between" gap="20px" my="10px">
        <Button width="130px" height="40px" borderRadius="6px" borderColor="#E5E5E5" background="transparent" border="1px solid"
        onClick={resetDateRange}
        >
          Reset
        </Button>
        <Button width="200px" height="40px" borderRadius="6px" background="#319EF6" onClick={setUserDateFilter}>
         Apply Date Range
        </Button>
      </Flex>
       </Box>
       }
       
          </Box>
         
          <SelectToken
          onCurrencySelect={onCurrencySelect}
          tokenModal={tokenModal}
          setTokenModal={setTokenModal}
          showBalance={false}
          showAny={true}
        />
          <CustomModal
          data={[{name:"ALLS",logo:"",currency:""},...currencies]} 
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
  )
}

export default MobileFilter