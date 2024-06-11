import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useColorModeValue, useMediaQuery,Spacer, Divider,  TableContainer, Table, Tr, Td } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';

import { PROFILE_MOBILE } from '../../../utils/hooks/useRigelBadge';

const TradingInformation = ({profile,account,setTabIndex,setProfileMobilePage,fullView,setFullView}:{profile:any,account:string,setTabIndex:(value:number)=>void,setProfileMobilePage:any,fullView?:boolean,setFullView?:any}) => {
    
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const inactiveColour = useColorModeValue("#333333", "#999999");
  const activeColour = useColorModeValue("#333333", "#DCE5EF");

  const setView =(enumVal)=>{
    setFullView((val)=>!val)
    setProfileMobilePage(enumVal)
}
const { t } = useTranslation()

  return (
    <>
    {fullView && <Flex onClick={()=>setView(PROFILE_MOBILE.PROFILE_INFORMATION)} py="10px">
       <ArrowBackIcon /> <Text mt="-4px" ml="8px">{t('back_to_profile')}</Text>
    </Flex>}
    <Text mt="23px" color={activeColour} fontSize={20} fontWeight={500}>
        {t('trading_information')}
      </Text>
      <Divider size={"xl"} mt="7px" />
      {!isMobileDevice ?  <TableContainer>
  <Table color={inactiveColour}>
    <Tr>
      <Td py="30px">
      <Box
          width="21%"
          py="0"
        >
          <Text fontSize={["12px","12px","16px"]}>{t('30_days_trade')}</Text>
          <Flex mt="10px">
            <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
              {" "}
              {profile ? profile?.userTrade?.trade?.tradeLastMonth : 0}
            </Text>
            <Text pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
              {t('trades')}
            </Text>
          </Flex>
        </Box>
      </Td>
      <Td>
      <Box
          width="21%"
          py="0"
        >
          <Text  fontSize={["12px","12px","16px"]}> {t('completion_rate_30_days')} </Text>
          <Flex mt="10px">
            <Text  fontSize={["20px","20px","24px"]} fontWeight={700}>
              {profile ? profile?.userTrade?.trade?.completionLastMonth : 0}
            </Text>
            <Text  pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
              %{" "}
            </Text>
          </Flex>
        </Box>
      </Td>
      <Td>
      <Box
          width="21%"
          py="0"
        >
          <Text  fontSize={["12px","12px","16px"]}>{t('total_trades')}</Text>
          <Flex mt="10px">
            <Text  fontSize={["20px","20px","24px"]} fontWeight={700}>
              {" "}
              {profile ? profile?.userTrade?.trade?.totalTrade : 0}
            </Text>
            <Text  pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
              {t('trades')}
            </Text>
          </Flex>
        </Box>
       
      </Td>
      <Td>
      <Box
          width="21%"
          py="0"
        >
          <Text  fontSize={["12px","12px","16px"]}>{t('completion_rate')}</Text>
          <Flex mt="10px">
            <Text  fontSize={["20px","20px","24px"]} fontWeight={700} >
              {" "}
              {profile ? profile?.userTrade?.trade?.completionRate : 0}
            </Text>
            <Text  pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
              %{" "}
            </Text>
          </Flex>
        </Box>
      </Td>
    </Tr>
       <Tr>
       <Td py="30px">
       <Box
           width="21%"
           py="0"
         >
           <Text  fontSize={["12px","12px","16px"]}>{t('pos_feedback')}</Text>
           <Flex mt="10px">
             <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
               {" "}
               {profile ? profile?.userTrade?.trade?.positiveFeedback : 0}
             </Text>
             <Text  pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
               {" "}
             </Text>
           </Flex>
         </Box>
        
       </Td>
       <Td>
       <Box
           width="21%"
           py="0"
         >
           <Text fontSize={["12px","12px","16px"]}>{t('neg_feedback')}</Text>
           <Flex mt="10px">
             <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
               {" "}
               {profile ? profile?.userTrade?.trade?.negativeFeedback : 0}
             </Text>
             <Text  pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
               {" "}
             </Text>
           </Flex>
         </Box>
         
       </Td>
       <Td>
       <Box width="21%" py="0">
           <Text fontSize={["12px","12px","16px"]}>{t('amount_sold')}</Text>
           <Flex mt="10px">
             <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
               {" "}
               {profile ? profile?.userTrade?.trade?.totalAmountSold : 0}
             </Text>
             <Text  pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
               {t('rgp_value')}
             </Text>
           </Flex>
         </Box>
 
        
       </Td>
       <Td>
       <Box width="21%" py="0">
           <Text fontSize={["12px","12px","16px"]}> {t('amount_bought')} </Text>
           <Flex mt="10px">
             <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
               {profile ? profile?.userTrade?.trade?.totalAmountBought : 0}
             </Text>
             <Text  pl="3px" pt="3px" fontWeight={400} fontSize={["12px","12px","14px"]}>
               {t('rgp_value')}
             </Text>
           </Flex>
         </Box>
       </Td>
     </Tr>
</Table>
</TableContainer> : 
<Flex
        py={7}
        color={inactiveColour}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"

      >
        <Box
          width="50%"
          py="8px"
        >
          <Text fontSize={["12px","12px","16px"]}>{t('30_days_trade')}</Text>
          <Flex>
            <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
              {" "}
              {profile ? profile?.userTrade?.trade?.tradeLastMonth : 0}
            </Text>
            <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
              {t('trades')}
            </Text>
          </Flex>
        </Box>
        <Box
          width="50%"
          py="8px"
        >
          <Text  fontSize={["12px","12px","16px"]}> {t('completion_rate_30_days')} </Text>
          <Flex>
            <Text  fontSize={["20px","20px","24px"]} fontWeight={700}>
              {profile ? profile?.userTrade?.trade?.completionLastMonth : 0}
            </Text>
            <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
              %{" "}
            </Text>
          </Flex>
        </Box>
        <Box
          width="50%"
          py="8px"
        >
          <Text  fontSize={["12px","12px","16px"]}>{t('total_trades')}</Text>
          <Flex>
            <Text  fontSize={["20px","20px","24px"]} fontWeight={700}>
              {" "}
              {profile ? profile?.userTrade?.trade?.totalTrade : 0}
            </Text>
            <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
             {t('trades')}
            </Text>
          </Flex>
        </Box>
        <Box
          width="50%"
          py="8px"
        >
          <Text  fontSize={["12px","12px","16px"]}>{t('completion_rate')}</Text>
          <Flex>
            <Text  fontSize={["20px","20px","24px"]} fontWeight={700} >
              {" "}
              {profile ? profile?.userTrade?.trade?.completionRate : 0}
            </Text>
            <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
              {" "}
              %{" "}
            </Text>
          </Flex>
        </Box>
        {fullView && <>
         <Box
         width="50%"
         py="8px"
       >
         <Text  fontSize={["12px","12px","16px"]}>{t('pos_feedback')}</Text>
         <Flex>
           <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
             {" "}
             {profile ? profile?.userTrade?.trade?.positiveFeedback : 0}
           </Text>
           <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
             {" "}
           </Text>
         </Flex>
       </Box>
    
     <Box
         width="50%"
         py="8px"
       >
         <Text fontSize={["12px","12px","16px"]}>{t('neg_feedback')}</Text>
         <Flex>
           <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
             {" "}
             {profile ? profile?.userTrade?.trade?.negativeFeedback : 0}
           </Text>
           <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
             {" "}
           </Text>
         </Flex>
       </Box>
       
     <Box width="50%" py="8px">
         <Text fontSize={["12px","12px","16px"]}>{t('amount_sold')}</Text>
         <Flex>
           <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
             {" "}
             {profile ? profile?.userTrade?.trade?.totalAmountSold : 0}
           </Text>
           <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
             {t('rgp_value')}
           </Text>
         </Flex>
       </Box>

      
     <Box width="50%" py="8px">
         <Text fontSize={["12px","12px","16px"]}> {t('amount_bought')} </Text>
         <Flex>
           <Text fontSize={["20px","20px","24px"]} fontWeight={700}>
             {profile ? profile?.userTrade?.trade?.totalAmountBought : 0}
           </Text>
           <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
             {t('rgp_value')}
           </Text>
         </Flex>
       </Box>
        </>}
      </Flex>
}


     {/*  */}
     {isMobileDevice &&!fullView && <Flex color="#319EF6" cursor="pointer" justifyContent="end" onClick={()=>setView(PROFILE_MOBILE.TRADING_INFORMATION)}>{t('see_all_info')}</Flex>}

    
      <Flex
        pt={3}
        color={inactiveColour}
        flexDirection={"row"}
        alignContent="space-between"
      >
        {!isMobileDevice && (
          <>
            {" "}
            <Box
              width={isMobileDevice ? "50%" : "21%"}
              py="8px"
            >
              <Text></Text>
              <Flex>
                <Text fontSize={24} fontWeight={700}>
                  {" "}
                </Text>
                <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
                  {" "}
                </Text>
              </Flex>
            </Box>
            <Spacer />
            <Box
              width={isMobileDevice ? "50%" : "21%"}
              py="8px"
            >
              <Text></Text>
              <Flex>
                <Text fontSize={24} fontWeight={700}>
                  {" "}
                </Text>
                <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
                  {" "}
                </Text>
              </Flex>
            </Box>{" "}
          </>
        )}
      </Flex>
    
    </>
  )
}

export default TradingInformation