import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  Spinner,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalBody,
  useColorModeValue,
  Circle,
  Button,
  Link,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { RootState } from "../../../state/store";
import { setCloseModal, TrxState } from "../../../state/application";
import { useTranslation } from "react-i18next";

const TransactionStateModal: React.FC = () => {
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const smallTxtColour = useColorModeValue("#999999", "#DCE5EF");
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
  const closeButtonBgColour = useColorModeValue("#319EF6", "#008DFF");
  const successBgColour = useColorModeValue("#22BB33", "#75F083");
  const errorBgColour = useColorModeValue("#CC334F", "#FF3358");
  
  const dispatch = useDispatch();
  const modalDetails = useSelector(
    (state: RootState) => state.application.modal
  );
  const { t } = useTranslation()
  
  const setOpen = modalDetails === null ? false : true;

  function handleCloseModal() {
    dispatch(setCloseModal());
  }
  return (
    <>
      <Modal isOpen={setOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent
          bg={bgColour}
          color='#fff'
          borderRadius='6px'
          paddingBottom='15px'
          width='95vw'
        >
          <ModalCloseButton
            bg='none'
            color={closeBtnColour}
            cursor='pointer'
            _focus={{ outline: "none" }}
            onClick={handleCloseModal}
            border={"1px solid"}
            size={"sm"}
            mt={3}
            mr={3}
            p={"7px"}
          />

          <ModalBody my={2}>
            <Flex justifyContent='center'>
              {modalDetails?.trxState === TrxState.WaitingForConfirmation ? (
                <Spinner
                  thickness='4px'
                  speed='0.53s'
                  emptyColor='transparent'
                  color='#319EF6'
                  size='xl'
                  width='100px'
                  height='100px'
                  my={10}
                />
              ) : modalDetails?.trxState === TrxState.TransactionSuccessful ? (
                <Circle size='90px' background={successBgColour} my={8}>
                  <Circle size='80px' background={bgColour} my={3}>
                    <CheckIcon fontSize='40px' color={successBgColour} />
                  </Circle>
                </Circle>
              ) : modalDetails?.trxState === TrxState.TransactionFailed ? (
                <Circle size='90px' background={errorBgColour} my={8}>
                  <Circle size='80px' background={bgColour} my={3}>
                    <CloseIcon width='30px' height='30' color={errorBgColour} />
                  </Circle>
                </Circle>
              ) : null}
            </Flex>

            <Text
              textAlign='center'
              fontSize='20px'
              fontWeight='normal'
              color={textColour}
            >
              {modalDetails?.trxState === TrxState.TransactionSuccessful
                ? t("wait_success")
                : modalDetails?.trxState === TrxState.WaitingForConfirmation
                ? t('wait_confirm')
                : modalDetails?.trxState === TrxState.TransactionFailed
                ? t("wait_fail")
                : null}
            </Text>

            <Flex justifyContent='center'>
              {modalDetails?.trxState === TrxState.WaitingForConfirmation ? (
                <Text
                  fontSize='16px'
                  py={5}
                  fontWeight='bold'
                  color={textColour}
                >
                  {modalDetails?.message}
                </Text>
              ) : modalDetails?.trxState === TrxState.TransactionFailed ? (
                <>
                  <Text
                    py={3}
                    fontSize='14px'
                    fontWeight='normal'
                    color='#008DFF'
                  >
                    <a href='#' target='_blank'>
                      Retry
                    </a>
                  </Text>
                  <Text
                    py={3}
                    fontSize='14px'
                    fontWeight='normal'
                    color={errorBgColour}
                  >
                    {modalDetails?.message}
                  </Text>
                </>
              ) : modalDetails?.trxState === TrxState.TransactionSuccessful ? (
                <Text
                  py={3}
                  fontSize='14px'
                  fontWeight='normal'
                  color='#008DFF'
                >
                  {modalDetails?.urlNetwork && (
                    <Link
                      href={`https://${modalDetails?.urlNetwork}`}
                      isExternal
                    >
                      {" "}
                      View on Etherscan{" "}
                    </Link>
                  )}
                </Text>
              ) : null}
            </Flex>

            <Flex justifyContent='center'>
              {modalDetails?.trxState === TrxState.WaitingForConfirmation ? (
                <Text size='12px' color={smallTxtColour}>
                  {t('check_wal')}
                </Text>
              ) : (
                <Button
                  variant='brand'
                  padding='24px 0'
                  width='100%'
                  isFullWidth
                  boxShadow='none'
                  border='0'
                  mt={3}
                  background={closeButtonBgColour}
                  color='#FFFFFF'
                  cursor='pointer'
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionStateModal;
