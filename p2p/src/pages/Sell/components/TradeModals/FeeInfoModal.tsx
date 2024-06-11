import { useState } from "react";
import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Text,
  Image,
  useColorModeValue,
  Button,
  Spinner,
} from "@chakra-ui/react";
import warning from "../../../../assets/warning.svg";
import { useTranslation } from "react-i18next";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  amountToReceive: string;
  fee: string;
  asset: string;
  startTransaction: any;
  loading: boolean;
}

const FeeInfoModal = ({
  onClose,
  isOpen,
  amountToReceive,
  fee,
  asset,
  startTransaction,
  loading,
}: ModalProps) => {
  const warningbgColor = useColorModeValue("#FEF8E7", "#213345");
  const warningTextColor = useColorModeValue("#333333", "#FFCC24");
  const bgColor = useColorModeValue("#FFFFFF", "#15202B");
  const borderC = useColorModeValue("#D9AA0F", "#213345");
  const { t } = useTranslation()
  return (
    <Modal
      closeOnOverlayClick={false}
      size={"sm"}
      isCentered
      onClose={onClose}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody bgColor={bgColor} p={6}>
          <Flex flexDirection={"column"}>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Image w={"50px"} h={"50px"} src={warning} />
              <Text mt={3} mb={5} fontSize={"20px"} fontWeight={"500"}>
                {t('take_note')}
              </Text>
            </Flex>

            <Flex
              borderRadius={"6px"}
              bgColor={warningbgColor}
              flexDirection={"column"}
              p={2}
              //borderColor={borderC}
              border={`1px solid ${borderC}` }
            >
              <Flex>
                <Image mr={2} mt={1} w='16px' h='16px' src={warning} />
                <Text color={warningTextColor} fontSize={"14px"}>
                  {t('fee_text')}{" "}
                  {amountToReceive && fee
                    ? parseFloat(amountToReceive) - parseFloat(fee)
                    : ""}{" "}
                  {asset ? asset : ""} {t('return_text')}.
                </Text>
              </Flex>

              <Flex mt={4}>
                <Image mr={2} mt={1} w='16px' h='16px' src={warning} />
                <Text color={warningTextColor} fontSize={"14px"}>
                  {t('pay_text')} {fee ? fee : ""} {asset ? asset : ""}{" "}
                  {t('trade_text')}
                </Text>
              </Flex>
            </Flex>

            <Button
              _focus={{ bgColor: "none" }}
              _active={{ bgColor: "none" }}
              _hover={{ bgColor: "none" }}
              mt={5}
              variant={"brand"}
              w='100%'
              fontSize={"14px"}
              onClick={startTransaction}
            >
              {loading ? <Spinner /> : t('cont')}
            </Button>
            <Button
              _focus={{ bgColor: "none" }}
              _active={{ bgColor: "none" }}
              _hover={{ bgColor: "none" }}
              mt={3}
              variant={"outline"}
              w='100%'
              fontSize={"14px"}
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FeeInfoModal;
