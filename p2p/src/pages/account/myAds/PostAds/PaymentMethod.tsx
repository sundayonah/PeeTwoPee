import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Button,
  Image,
  Select,
  HStack,
  Spacer,
  useMediaQuery,
  Divider,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import lock from "../../../../assets/Padlock.svg";
import { ExclamationIcon } from "../../../../theme/components/Icons";
import { AdsPostSteps, setAdsBar } from "../../../../state/accountUi";
import { AdsObj } from "../AdsType";
import { RootState } from "../../../../state/store";
import { USER_BANKS } from "../../gql/queries";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymentMethod = ({
  userAdsInput,
  selectBank,
}: {
  userAdsInput: AdsObj;
  selectBank: (value: string) => void;
}) => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const dispatch = useDispatch();
  const adsState = useSelector((state: RootState) => state.ads);
  const mode = useColorModeValue("light", "dark");
  const { data, error, refetch, loading } = useQuery(USER_BANKS);
  const [selectedBank, setSelectedBank] = useState("");
  const { t } = useTranslation()
  return (
    <>
      <Text
        fontSize='20px'
        fontWeight={500}
        color={mode === "dark" ? "#DCE5EF" : "#333333"}
      >
        {t('payment_method')}
      </Text>

      <Divider my={4} />
      <Flex>
        <Text
          fontSize='14px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          my={4}
          mr={2}
        >
          {t('bank_acc')}
        </Text>
        <Tooltip
          hasArrow
          label='Select your bank account.'
          aria-label='A tooltip'
          placement='right-end'
        >
          <IconButton
            aria-label='Icon button'
            icon={
              <ExclamationIcon
              />
            }
            colorScheme='ghost'
            h='auto'
            minWidth='10px'
          />
        </Tooltip>
      </Flex>
      <Select
        size='lg'
        placeholder={t('choose_bank')}
        value={selectedBank}
        onChange={(e) => {
          selectBank(e.target.value);
          setSelectedBank(e.target.value);
        }}
      >
        {data &&
          data.userInfo.banks
            ?.filter((allBanks: any) => allBanks.is_enabled)
            .map((bank: any, index: any) => {
              return (
                <option value={bank.account_name} key={index}>
                  {bank.account_name} - {bank.account_number} - {bank.bank_name}
                </option>
              );
            })}
      </Select>
      <Flex>
        <Text
          fontSize='14px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          my={4}
          mr={2}
        >
          {t('time_limit')}
        </Text>
        <Tooltip
          hasArrow
          label='Duration for which the transaction should be carried out.'
          aria-label='A tooltip'
          placement='right-end'
        >
          <IconButton
            aria-label='Icon button'
            icon={
              <ExclamationIcon
             
              />
            }
            colorScheme='ghost'
            h='auto'
            minWidth='10px'
          />
        </Tooltip>
      </Flex>
      <Box
        backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
        p={4}
      >
        <HStack>
          <Text
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            fontWeight='500px'
          >
            {userAdsInput.duration}
          </Text>

          <Text
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            my={4}
          >{t('mins')}
          </Text>

          <Spacer />
          <Image src={lock} />
        </HStack>
      </Box>
      <Flex flexDirection={"column-reverse"}>
        <Button
          mr={3}
          _hover={{
            bgColor: "",
            color: "",
          }}
          onClick={() => {
            dispatch(setAdsBar(AdsPostSteps.APPROVEQUANTITY));
          }}
          isFullWidth
        >
          {t('back')}
        </Button>
        <Button
          _hover={{
            bgColor: "",
            color: "",
          }}
          mt={5}
          mb={4}
          onClick={() => dispatch(setAdsBar(AdsPostSteps.AUTORESPONSE))}
          isFullWidth
          variant={"brand"}
          disabled={!selectedBank}
        >
          {t('confirm_payment')}
        </Button>
      </Flex>
    </>
  );
};

export default PaymentMethod;
