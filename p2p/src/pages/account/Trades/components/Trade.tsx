import {
   
  useColorModeValue,
  
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  SkeletonText,
  Tbody,
  Td,
  
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import NoOrder from "../../../../components/NOOrder";
import TradeBody from "./TradeBody";

interface TradeProps {
  tradeRecords: any;
  account: string;
  loading:boolean
}

const Trade = ({ tradeRecords, account,loading }: TradeProps) => {
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const mode = useColorModeValue("light", "dark"); 
  const { t } = useTranslation()
  return (
    <>
     {tradeRecords?.length === 0 ? (
             <NoOrder
             text={t('no_trade')}
             subText={t('no_trade_text')}
             button="trade"
             />
        ) : (
 <TableContainer fontSize={14} mt={6}>
        <Table size='lg' variant='simple'>
          <Thead
            textTransform={"none"}
            background={
              mode === LIGHT_THEME
                ? "#F2F5F8  !important"
                : mode === DARK_THEME
                ? "#213345"
                : mode === DARK_THEME
                ? "#213345"
                : mode === LIGHT_THEME
                ? "#F2F5F8"
                : "#F2F5F8 !important"
            }
          >
            <Tr fontSize='14px' fontWeight='light' textTransform={"none"}>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('quantity')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('amount')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('trade_type')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('price')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('trade_status')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('trade_fee')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('date')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('order_no')}
              </Th>
            </Tr>
          </Thead>
          {loading ? (
         <>
         {[1,2,3,4,5,6,7,8,9,10].map((item) => (
          <Tbody key={item}>
            <Tr py="20px">
              <Td >
               <SkeletonText noOfLines={1} my="1px" spacing="0" width="120px"/>
               <SkeletonText noOfLines={1} mt="20px" width="80px"/>
              </Td>
              {[1,2,3,4,5,6,7].map((item)=>(
                <Td>
                <SkeletonText noOfLines={1}  my="1px" spacing="0" width="80px"/>
                </Td>
                ))}
            </Tr>
          </Tbody>
        ))}
    

         
         </>
          ) : (
            tradeRecords?.map((item, index) => {
              return (
                <>
                  <TradeBody trade={item} account={account} />
                </>
              );
            })
          )}
        </Table>
      </TableContainer>
        )

        }
     
    </>
  );
};

export default Trade;
