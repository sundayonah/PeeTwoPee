import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
   
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TransactionDetailObject {
  asset: any;
  crypto_amount: any;
  price: any;
  time: any;
  status: any;

  counterparty: any;
  transactionLink: any;
  fiat: any;
  seller: boolean;
  tx_id: any;
}

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  transactionDetail: TransactionDetailObject;
};

export default function TransactionDetail({
  isOpen,
  onOpen,
  onClose,
  transactionDetail,
}: Props) {
  const {t} = useTranslation()
  return (
    <>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='14px'>{t('transaction_detail')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection='column' alignItems='center' pt={4}>
              {transactionDetail.seller ? (
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
              <Text fontSize='14px' mb={4}>
                {transactionDetail.seller ? "Sent" : "Received"}{" "}
                {transactionDetail.asset}
              </Text>
              <Text
                fontSize='20px'
                fontWeight='bolder'
                mb={2}
                color={transactionDetail.seller ? "#CC334F" : "#00C516"}
              >
                {transactionDetail.seller ? "-" : "+"}{" "}
                {transactionDetail.crypto_amount} {transactionDetail.asset}
              </Text>
              <Text fontSize='14px' mb={9}>
                &#8781;{" "}
                {transactionDetail.crypto_amount * transactionDetail.price}{" "}
                {transactionDetail.fiat}
              </Text>

              <Flex
                width='100%'
                borderTop='1px solid #DEE6ED'
                pt={4}
                pb={4}
                justifyContent='space-between'
                fontSize='14px'
                alignItems='center'
              >
                <Text fontWeight='bolder'>{t('time')}</Text>
                <Text>{transactionDetail.time}</Text>
              </Flex>

              <Flex
                width='100%'
                borderTop='1px solid #DEE6ED'
                pt={4}
                pb={4}
                justifyContent='space-between'
                fontSize='14px'
                alignItems='center'
              >
                <Text fontWeight='bolder'>{t('status')}</Text>
                <Text>{t((`${transactionDetail.status}`))}</Text>
              </Flex>

              <Flex
                width='100%'
                borderTop='1px solid #DEE6ED'
                pt={4}
                pb={4}
                justifyContent='space-between'
                fontSize='14px'
                alignItems='center'
              >
                <Text fontWeight='bolder'>{t('transaction_type')}</Text>
                <Text>P2P Trade</Text>
              </Flex>

              <Flex
                width='100%'
                borderTop='1px solid #DEE6ED'
                pt={4}
                pb={4}
                justifyContent='space-between'
                fontSize='14px'
                cursor="pointer"
                alignItems='center'
              >
                <Text fontWeight='bolder'>{t('counterparty')}</Text>
                <Text textDecoration="underline" color="#4CAFFF">{transactionDetail.counterparty}</Text>
              </Flex>

              <Flex
                width='100%'
                borderTop='1px solid #DEE6ED'
                pt={4}
                pb={4}
                justifyContent='space-between'
                fontSize='14px'
                alignItems='center'
              >
                <Text fontWeight='bolder'>{t('transaction_link')}</Text>
                <Link to={transactionDetail.transactionLink}>
                  <Text textDecoration="underline" color="#4CAFFF">{transactionDetail.tx_id}</Text>
                </Link>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>{" "}
    </>
  );
}
