import {
    Modal,
    ModalCloseButton,
    ModalContent,
    Text,
    ModalOverlay,
    useColorModeValue,
     
    ModalBody,
    Flex,
    
    Button,
    Input,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { AiOutlineExclamationCircle } from "react-icons/ai";

  import { useMutation } from "@apollo/client";
  import {  EDIT_BANK } from "../gql/mutations";
import { useDispatch } from "react-redux";
import { addToast } from "../../../components/Toast/toastSlice";
import { useTranslation } from "react-i18next";

  
 export interface BankInfo {
    id: number
    bank_name: string;
    account_number?: string;
    account_name?: string;
  }
  
  const EditBank = ({
    openModal,
    closeModal,
    handleResult,
    bank
  }: {
    openModal: boolean;
    closeModal: () => void;
    handleResult: () => void;
    bank: BankInfo
  }) => {
    const mode = useColorModeValue("light", "dark");
    const bgColour = useColorModeValue("#FFFFFF", "#15202B");
    const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
    const textColour = useColorModeValue("#333333", "#F1F5F8");
  
  const [bank_name , setBank_name] = useState('')
  const [account_number , setaccount_number] = useState('')
  const [account_name , setaccount_name] = useState('')
  const dispatch = useDispatch()
  const {t} = useTranslation()
  
  
    const [editBank, { loading, error, data }] = useMutation(EDIT_BANK, {
      variables: {
          params: {
              id: bank.id,
              bank_name: bank_name ? bank_name: bank.bank_name , 
              account_number:  account_number ? account_number : bank.account_number,
              account_name:    account_name ? account_name : bank.account_name,      
          },
        },
    });
  
    const handleEcitBank = async () => {
      await  editBank();
    };
    useEffect(() => {
      if(data?.editBankRecord?.status){
        dispatch(
          addToast({
            message: "Payment details Successfully Updated",
            error: false,
            hasExploreLink:false
          })
        );
        handleResult()
      setaccount_name('')
      setaccount_number('')
      setBank_name('')
       }
       else{
        dispatch(
          addToast({
            message: data?.editBankRecord?.message,
            error: true,
            hasExploreLink:false
          })
        );
       }
      
    }, [data, dispatch])


    
  useEffect(() => {
    if(error){
     dispatch(
       addToast({
         message: "Error occured, Please try again",
         error: true,
         hasExploreLink:false
 
       })
     );
    }
   }, [error])
    
   
    return (
      <>
        <Modal isOpen={openModal} onClose={closeModal} isCentered>
          <ModalOverlay />
          <ModalContent
            bg={bgColour}
            color="#fff"
            borderRadius="6px"
            paddingBottom="15px"
            width={448}
          >
            <ModalCloseButton
              bg="none"
              color={closeBtnColour}
              cursor="pointer"
              _focus={{ outline: "none" }}
              onClick={closeModal}
              border={"1px solid"}
              size={"sm"}
              mt={3}
              mr={3}
              p={"7px"}
            />
  
            <ModalBody mt={10} flexDirection={"column"}>
              <Text fontSize="20px" fontWeight="400" py={4} color={textColour}>
              Edit Bank Details
              </Text>
              <Text fontFamily="Cera Pro" color={closeBtnColour} fontSize="16px">
                { error  ? error.message : 'Update account so you can buy & sell cryptocurrencies'}
              </Text>
  
              <Text py={4} color={closeBtnColour} fontSize="16px">
               {t("acct_name")}
              </Text>
  
              <Input
                disabled
                value={account_name}
                placeholder={bank.account_name}
                onChange={(e) => setaccount_name(e.target.value)}
              />
  
              <Flex
                mt={2}
                color="#fff"
                mb="10px"
                flexDirection={"row"}
                alignItems="center"
              >
                <AiOutlineExclamationCircle color="#EEC749" />
  
                <Text
                  py={3}
                  pl={2}
                  fontSize={12}
                  fontFamily="Cera Pro"
                  color={"#EEC749"}
                >
                  {("add_bank_text")}
                </Text>
              </Flex>
              <Text color={closeBtnColour} fontSize="16px">
               {t("Bank Name")}
              </Text>
              <Input
                my={4}
                value={bank_name}
                placeholder={bank.bank_name}
                //disabled
                onChange={(e) => setBank_name(e.target.value)}
              />
              <Text color={closeBtnColour} fontSize="16px">
                {t("Account Number")}
              </Text>
  
              <Input
                my={4}
                name="account_number"
                value={account_number}
                placeholder={bank.account_number}
                onChange={(e) => setaccount_number(e.target.value)}
              />
              <FormErrorMessage />
              {/* 
                          <Text mt={5} color={closeBtnColour} fontSize='16px'>
                              Bank Sort Code
                          </Text>
                          */}
              <Button
                mt={3}
                
                onClick={() => handleEcitBank()}
                type="submit"
                isLoading={loading}
                variant={"brand"}
                isFullWidth
              >
               {t('cont')}
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default EditBank;
  