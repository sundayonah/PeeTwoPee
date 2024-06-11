import React from "react";
import {
  Box,
  Flex, 
  Text, 
  useMediaQuery,
  useDisclosure,
  Tr,
  Td
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
 
import { useActiveWeb3React } from "../../../utils/hooks";
  
import { useQuery } from "@apollo/client";
import { USERBYADDRESS } from "../gql/query";
import TransactionDetail from "./modal/TransactionDetail";
import { useTranslation } from "react-i18next";

type ITEM = {
  click: () => void;
  transaction: any;
};

export default function TransactionItem({ click, transaction }: ITEM) {
  const [isMobileResponsive] = useMediaQuery("(max-width : 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = useActiveWeb3React();
  const {
    loading: fromLoading,
    data: fromData,
    error: fromError,
  } = useQuery(USERBYADDRESS, {
    variables: {
      address: transaction.from,
    },
  });

  const {
    loading: toLoading,
    data: toData,
    error: toError,
  } = useQuery(USERBYADDRESS, {
    variables: {
      address: transaction.to,
    },
  });

const {t} = useTranslation()

  const getDtae = (_ : any) => {
    return   new Date(parseFloat(_)).toLocaleString()
    }
  
  
  const receiver =
    transaction.from === account &&
    toData?.userByAddress.status === true &&
    toData?.userByAddress.user.fullname;

  const sender =
    transaction.to === account &&
    fromData?.userByAddress.status === true &&
    fromData?.userByAddress.user.fullname;

  const link = `/buy/order/trade/${transaction._id}`;

  return (
    <>
      {isMobileResponsive ? (
        <Flex
          flexWrap='wrap'
          boxShadow='base'
          onClick={onOpen}
          width='100%'
          p={4}
          borderTop="1px solid #324D68"
          borderBottom="1px solid #324D68"
          mb={5}
          mt={3}
        >
          <Flex
            width='100%'
            
            justifyContent='space-between'
            fontSize='16px'
          >
             <Text color="#F1F5F8" fontWeight='bolder'>
                  {transaction.from === account ? "Sent" : "Received"}
                </Text>
                <Flex flexDirection='column' alignItems='flex-end'>
              <Text color= {transaction.from === account ? "#FF3358" : "#00C516"}>
                {transaction.from === account ? "-" : "+"}
                {transaction.crypto_amount} {transaction.asset}
              </Text>
            </Flex>
          
          </Flex>
          <Flex justifyContent='space-between' fontSize="14px" color="#DCE6EF"  width='100%' pt="10px" >
              <Text>{getDtae(transaction.createdAt)}</Text>
              <Text>
                &#8781;{transaction.price * transaction.crypto_amount}{" "}
                {transaction.fiat}
              </Text> 
            </Flex>
        

        </Flex>
      ) : (
        <Tr
          // justifyContent='space-between'
          // textAlign='left'
          // pt={4}
          // pb={4}
          // w='100%'
          // fontSize='14px'
          // alignItems='flex-end'
          // borderTop='1px solid #DEE6ED'
          onClick={onOpen}
          cursor='pointer'
        >
          <Td>
            <Flex alignItems='center'>
              {transaction.from === account ? (
                <Box
                  width='24px'
                  height='24px'
                  backgroundColor={"#FFE5EA"}
                  textAlign='center'
                  borderRadius='50%'
                  mr='10px'
                >
                  <ArrowUpIcon fontSize='20px' color={"#CC334F"} />
                </Box>
              ) : (
                <Box
                  width='24px'
                  height='24px'
                  backgroundColor={"#E9FBEB"}
                  textAlign='center'
                  borderRadius='50%'
                  mr='10px'
                >
                  <ArrowDownIcon fontSize='20px' color={"#00C516"} />
                </Box>
              )}

              <Flex flexDirection='column'>
                <Text fontSize='14px' fontWeight='bolder'>
                  {transaction.from === account ? "Sent" : "Received"}
                </Text>
                <Text fontSize='12px'>{getDtae(transaction.createdAt)}</Text>
              </Flex>
            </Flex>
          </Td>

          <Td>
            <Box>
              {transaction.from === account ? (
                <Text>
                  Sent to {receiver} in trade {transaction.tx_id}
                </Text>
              ) : (
                <Text>
                  Received from {sender} in trade {transaction.tx_id}
                </Text>
              )}
            </Box>
          </Td>

          <Td>
            <Box>
              <Text>{t((`${transaction.status}`))}</Text>
            </Box>
          </Td>

          <Td>
            <Flex flexDirection='column' alignItems='flex-end'>
              <Text>
                {transaction.from === account ? "-" : "+"}
                {transaction.crypto_amount} {transaction.asset}
              </Text>
              <Text>
                &#8781;{transaction.price * transaction.crypto_amount}{" "}
                {transaction.fiat}
              </Text>
            </Flex>
          </Td>
        </Tr>
     )}
      <TransactionDetail
        transactionDetail={{
          seller: transaction.from === account ? true : false,
          asset: transaction.asset,
          crypto_amount: transaction.crypto_amount,
          price: transaction.price,
          time: getDtae(transaction.createdAt),
          status: transaction.status,
          counterparty: transaction.from === account ? receiver : sender,
          tx_id: transaction.tx_id,
          transactionLink: link,
          fiat: transaction.fiat,
        }}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
