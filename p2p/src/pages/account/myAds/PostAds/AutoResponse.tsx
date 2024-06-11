import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Button,
  Spacer,
  Textarea,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import {Dispatch,SetStateAction,useState} from "react";
import { ExclamationIcon } from "../../../../theme/components/Icons";
import { AdsObj } from "../AdsType";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../state/store";

import { setAutoResponse } from "../../../../state/ads/index";
import { AdsPostSteps, setAdsBar } from "../../../../state/accountUi";
import { useTranslation } from "react-i18next";

const AutoResponse = ({
  userAdsInput,
  handleInput,
  setOpenConfirmModal,
  isEdit,
}: {
  userAdsInput: AdsObj;
  handleInput: (name: string, value: string) => void;
  setOpenConfirmModal: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
}) => {
  const orderInput = useSelector((state: RootState) => state.ads.orderInput);
  const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");
  const [status, setStatus] =useState("online");
  const [terms, setTerms] =useState("");
  const [auto_reply, setAuto_reply] =useState("");
  const editInput = useSelector((state: RootState) => state.ads.editInput);
  const { t } = useTranslation()
  return (
    <>
      <Flex mb={4}>
        <Text
          fontSize='14px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          mr={2}
        >
          {t('auto_reply')}
        </Text>
        <Tooltip
          hasArrow
          label='Automated message that will be automatically sent to the counterparty after the order is placed.'
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
      <Box>
        <Textarea
          placeholder={t('auto_reply_holder') }
          fontSize='12px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          height='110px'
          p={4}
          backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
          border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
          borderRadius='6px'
          name='auto_reply'
          value={userAdsInput.auto_reply}
          onChange={(event) =>
            handleInput(event.target.value, event.target.name)
          }
        />
        <Spacer />
      </Box>
      <Flex>
        <Text
          fontSize='14px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          my={4}
          mr={2}
        >
         {t('trade_conditions')}
        </Text>
        <Tooltip
          hasArrow
          label={t('trade_conditions_holder')}
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
      <Box>
        <Textarea
          placeholder={t('condition_holder')}
          fontSize='12px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          height='140px'
          p={4}
          backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
          border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
          borderRadius='6px'
          name='terms'
          value={userAdsInput.terms}
          onChange={(event) =>
            handleInput(event.target.value, event.target.name)
          }
        />
        <Spacer />
      </Box>
      <Flex flexDirection={"column-reverse"}>
        <Button
          my={3}
          mr={3}
          _hover={{
            bgColor: "",
            color: "",
          }}
          onClick={() => {
            dispatch(setAdsBar(AdsPostSteps.PAYMETHOD));
          }}
          isFullWidth
        >
          {t('back')}
        </Button>
        <Button
          mt={5}
          _hover={{
            bgColor: "",
            color: "",
          }}
          onClick={() => {
            setOpenConfirmModal(true);
            dispatch(
              setAutoResponse({
                status: status,
                terms: terms,
                auto_reply: auto_reply,
              })
            );
          }}
          isFullWidth
          variant={"brand"}
        >
          {t('confirm_ad')}
        </Button>
      </Flex>
    </>
  );
};

export default AutoResponse;
