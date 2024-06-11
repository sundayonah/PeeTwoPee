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

import { useMutation, useQuery } from "@apollo/client";
import { ADD_BANK } from "../gql/mutations";
import {   USER_COUNTRY } from "../gql/queries";
import { useDispatch } from "react-redux";
import { addToast } from "../../../components/Toast/toastSlice";

import { allBanks } from "../../../utils/banksDb";
import { capitalizeFirstLetter } from "../../../utils";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "react-i18next";


const AddBankModal = ({
  openModal,
  closeModal,
  handleResult,
}: {
  openModal: boolean;
  closeModal: () => void;
  handleResult: () => void;
}) => {
  const mode = useColorModeValue("light", "dark");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const inputBorderColor = useColorModeValue("#DEE5ED", "#2D3748");

  const hoverOptionColor = useColorModeValue("#E2E8F0", "#303640");
  const menuBackground = useColorModeValue("#FFFFFF", "#232934");
  const optionTextColor = useColorModeValue("black", "#eee");
  const labelColor = useColorModeValue("#666666", "");
  const {t}= useTranslation()
  const [bank_name, setBank_name] = useState("");

  const [account_number, setaccount_number] = useState("");
  const [account_name, setaccount_name] = useState("");
  const dispatch = useDispatch();

  const { data: countryData } = useQuery(USER_COUNTRY);

  const [addBank, { loading, error, data }] = useMutation(ADD_BANK, {
    variables: {
      params: {
        bank_name: bank_name,
        account_number: account_number,
        account_name: account_name,
      },
    },
  });

  const handleAddBank = async () => {
    if (!account_name || account_name.length < 1) return;
    if (!account_number || account_number.length < 1) return;
    if (!bank_name || bank_name.length < 1) return;
    await addBank();
  };

  useEffect(() => {
    if (data?.addBank?.status) {
      dispatch(
        addToast({
          message: "Payment details Successfully Added",
          error: false,
          hasExploreLink: false,
        })
      );

      handleResult();
    setaccount_name("");
    setaccount_number("");
    setBank_name("");
    }else{
      dispatch(
        addToast({
          message: data?.addBank?.message,
          error: true,
          hasExploreLink: false,
        })
      );
    }
    
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(
        addToast({
          message: "Error occured, Please try again",
          error: true,
          hasExploreLink: false,
        })
      );
    }
  }, [error]);

  const [bankinList, setBankingList] = useState<any[]>();

  useEffect(() => {
    if (countryData) {
     
      const ItemsToseach = allBanks[
        capitalizeFirstLetter(countryData?.userInfo?.country)
      ]?.map((item) => ({
        value: item,
        label: item,
      }));
     
      setBankingList(ItemsToseach);
    }
  }, [countryData]);

  const handleChange = (newValue, actionMeta) => {
   
    if (newValue) {
      setBank_name(newValue?.value);
    } else {
      setBank_name("");
    }
  };

  const colorStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "transparent",
      borderColor: isFocused ? inputBorderColor : inputBorderColor,
      cursor: "text",
      color: "white",
      ":hover": {
        borderColor: inputBorderColor,
      },
      ":focus": {
        borderColor: inputBorderColor,
      },
      boxShadow: "none",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? hoverOptionColor : menuBackground,
        ":hover": {
          backgroundColor: hoverOptionColor,
        },
        color: optionTextColor,
        cursor: "pointer",
      };
    },
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        color: labelColor,
        fontSize: "16px",
      };
    },
    placeholder: (styles) => {
      return {
        ...styles,
        fontSize: "14px",
      };
    },
    clearIndicator: (styles) => {
      return {
        ...styles,
        display: "none",
      };
    },
    indicatorSeparator: (styles) => {
      return {
        ...styles,
        display: "none",
      };
    },
    menuList: (styles) => {
      return {
        ...styles,
        backgroundColor: menuBackground,
      };
    },
    input: (styles) => {
      return {
        ...styles,
        color: optionTextColor,
      };
    },
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent
          bg={bgColour}
          color='#fff'
          borderRadius='6px'
          paddingBottom='15px'
          width={448}
        >
          <ModalCloseButton
            bg='none'
            color={closeBtnColour}
            cursor='pointer'
            _focus={{ outline: "none" }}
            onClick={closeModal}
            border={"1px solid"}
            size={"sm"}
            mt={3}
            mr={3}
            p={"7px"}
          />

          <ModalBody mt={10} flexDirection={"column"}>
            <Text fontSize='20px' fontWeight='400' py={4} color={textColour}>
              {t('add_bank')}
            </Text>
            <Text fontFamily='Cera Pro' color={closeBtnColour} fontSize='16px'>
              {error
                ? error.message
                : t('create_acct_text')}
            </Text>

            <Text mt={4} color={closeBtnColour} fontSize='16px'>
              {t("acct_name")}
            </Text>

            <Input
              value={account_name}
              color={closeBtnColour}
              placeholder='your name'
              onChange={(e) => setaccount_name(e.target.value)}
            />

            <Flex
              mt={2}
              color='#fff'
              mb='10px'
              flexDirection={"row"}
              alignItems='center'
            >
              <AiOutlineExclamationCircle color='#EEC749' />

              <Text
                py={3}
                pl={2}
                fontSize={12}
                fontFamily='Cera Pro'
                color={"#EEC749"}
              >
               {t("add_bank_text")}
              </Text>
            </Flex>
            <Text color={closeBtnColour} fontSize='16px'>
              {t("Bank Name")}
            </Text>

            <CreatableSelect
              isMulti={false}
              options={bankinList}
              onChange={handleChange}
              styles={colorStyles}
              isClearable
              placeholder={t('p_bank_name')}
            />

          
            <Text mt={4} color={closeBtnColour} fontSize='16px'>
              {t('Account Number')}
            </Text>

            <Input
              name='account_number'
              value={account_number}
              placeholder='Bank Number'
              type='number'
              onChange={(e) => setaccount_number(e.target.value)}
            />
            <FormErrorMessage />
            <Button
              mt={3}
              disabled={!account_name || !account_number || !bank_name}
              onClick={() => handleAddBank()}
              type='submit'
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

export default AddBankModal;
