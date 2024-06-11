import { Box, Flex, useColorModeValue, Text, Button, SkeletonText } from '@chakra-ui/react';
import { t } from 'i18next';

import { Link } from 'react-router-dom';
import NoOrder from '../../../../components/NOOrder';
import { ParseFloat } from '../../../../utils';

interface TradeProps {
    tradeRecords: any;
    account: string;
  }
  
const TradeMobilePage = ({ tradeRecords, account }: TradeProps) => {

    
    
    const textColour2 = useColorModeValue("#666666", "#F1F5F8"); 
    const background= useColorModeValue("white", "#213345");
    const textColor= useColorModeValue("#333333","#fff")
    const borderColor = useColorModeValue("#DEE6ED", "#324D68");
    const getDtae = (_ : any) => {
      return   new Date(parseFloat(_)).toLocaleString().split(",").join(" | ")
      }
    
    return (
        <>
       
       {!tradeRecords ? (
             [1,2,3,4].map((trade: any, index: number) => (
              <Box
              w={["100%","100%","310px"]}
              minH="60px"
              key={index}
              borderRadius="6px"
              border="1px solid "
              borderColor={borderColor}
              m={['10px auto', '20px auto', '30px 11px']}
              p={['20px 15px 10px 15px']}
              background={background}
              fontSize="12px"
            >
              {[1,2,3,4].map((item,index)=>{
              if(item===2){
                return (
                  <SkeletonText noOfLines={1} width="80px" />
                )
              }else {
                  return (
                    <Box my="20px">
                    <Flex justifyContent="space-between" color={textColour2} >
                    <SkeletonText noOfLines={1} width="100px"  />
                    <SkeletonText noOfLines={1} width="100px"  />
                 </Flex>
                 <Flex justifyContent="space-between" color={textColor}  fontWeight="500" mt="12px">
                 <SkeletonText noOfLines={1} width="120px"  />
                    <SkeletonText noOfLines={1} width="120px"  />
                 </Flex>
       
                  </Box>   
                  )
                }
              })}   
            </Box>
               ))
         ) :
         tradeRecords?.length === 0 ? (
          <NoOrder
          text={t('no_trade')}
          subText={t('no_trade_text')}
          button="trade"
          />
          ) : (
           tradeRecords.map((trade: any, index: number) => (
           <Box
           w={["100%","100%","310px"]}
           minH="60px"
           key={index}
           borderRadius="6px"
           border="1px solid "
           borderColor={borderColor}
           m={['10px auto', '20px auto', '30px 11px']}
           p={['20px 15px 10px 15px']}
           background={background}
           fontSize="12px"
         >
           <Flex justifyContent="space-between">
             <Flex>
             <Text as="p" fontSize="14px">
             {trade?.to === account ? "buy" :"sell" } {trade.asset}
             </Text>
             </Flex>
             <Text as="p" >
             {t(trade.status)}
             </Text>
           </Flex>
           <Text color={textColour2} my="7px" >{getDtae(trade.createdAt) }</Text>
           <Box my="10px">
             <Flex justifyContent="space-between" color={textColour2}>
            <Text>{t('quantity')}</Text>
            <Text>{t('amount')}</Text>
          </Flex>
          <Flex justifyContent="space-between" color={textColor}  fontWeight="500" mt="5px">
            <Text>{ParseFloat(trade?.crypto_amount, 4)} {trade.asset}</Text>
            <Text>{trade.price * trade.crypto_amount} {trade.fiat}</Text>
          </Flex>

           </Box>
           <Box my="10px">
             <Flex justifyContent="space-between" color={textColour2}>
            <Text>{t('price')}</Text>
            <Text>{t('trade_fee')}</Text>
          </Flex>
          <Flex justifyContent="space-between" color={textColor}  fontWeight="500" mt="5px">
            <Text>{trade.price} {trade.fiat}/{trade.asset}</Text>
            <Text>{trade?.fee ?? 0} RGP</Text>
          </Flex>

           </Box>
           <Box my="10px">
             <Flex justifyContent="space-between" color={textColour2}>
            <Text>{t('order_no')}.</Text>
          </Flex>
          <Flex justifyContent="space-between" color={textColor} fontWeight="500" mt="5px">
            <Text>{trade._id}</Text>
            <Link to={`/buy/order/trade/${trade._id}`}>
           <Button
            variant={"brand"}
            isFullWidth
            height="30px"
            fontSize="12px"
            mt="-10px"
          >
            {t('view_trade')}
          </Button>
          </Link>
       
          </Flex>

           </Box>
         
               
         
         </Box>
            ))
          )}  
           </>
     
  )
}
export default TradeMobilePage