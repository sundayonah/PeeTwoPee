import { useState, useEffect } from "react";
import {
  Box,
  useColorModeValue,
  Text,
  Button,
  Image,
  Link,
  HStack,
  Spacer,
  useMediaQuery,
  Input,
  Flex,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import refresh from "../../../../assets/refresh.svg";
import minus from "../../../../assets/minus.svg";
import { ExclamationIcon } from "../../../../theme/components/Icons";
import { RootState } from "../../../../state/store";
import { AdsObj, IBankDetails } from "../AdsType";
import { AdsPostSteps, setAdsBar } from "../../../../state/accountUi";
import { useBalances } from "../../../../utils/hooks";
import { formatDecimalNumber } from "../../../../utils/functions/util";
import { useTranslation } from "react-i18next";

const ApproveQuantity = ({
  userAdsInput,
  handleInput,
  AdInfo,
  hasTokenBeenApproved,
  sellApproval,
  hasRGPBeenApproved,
  approveRGP,
  assetPrice,
  isEdit,
}: {
  userAdsInput: AdsObj;
  handleInput: (value: string | number, name: string) => void;
  AdInfo: AdsObj & {
    paymentMethod: string;
    accountDet: IBankDetails | undefined;
  };
  hasTokenBeenApproved: boolean;
  sellApproval: any;
  approveRGP: any;
  hasRGPBeenApproved: boolean;
  assetPrice: any;
  isEdit: boolean;
}) => {
  const { t } = useTranslation()
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");
  const [tokenPrice, setTokenPrice] = useState<number>();
  const appQuantity =
    userAdsInput.price_type === "Floating" ||
    userAdsInput.price_type === "FLOATING"
      ? userAdsInput.crypto_amount *
        tokenPrice *
        (userAdsInput.price_percent / 100)
      : userAdsInput.crypto_amount * userAdsInput.price;
  const tokenAddress = useSelector(
    (state: RootState) => state.ads.tokenAddress
  );
  const tokenSymbol = useSelector((state: RootState) => state.ads.tokenSymbol);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [check, setCheck] = useState(0);
  const { balance } = useBalances(tokenAddress);

  useEffect(() => {
    if (userAdsInput.type === "sell") {
      if (
        parseFloat(balance) < parseFloat(userAdsInput.crypto_amount.toString())
      ) {
        setError(true);
        setErrorMsg(`${t('insufficient')} ${tokenSymbol}`);
        setCheck(userAdsInput.crypto_amount * userAdsInput.price);
      } else {
        setError(false);
        setErrorMsg("");
      }
    }
  }, [userAdsInput.crypto_amount, check]);

  const inputRegex = RegExp(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/);

  return (
    <>
      <Flex>
        <Text
          fontSize='14px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          pt={5}
          mr={2}
        >
          {t('available_quantity')}
        </Text>
        <Tooltip
          hasArrow
          label='The total amount for the ad.'
          aria-label='A tooltip'
          placement='right-end'
        >
          <IconButton
            mt={4}
            aria-label='Icon button'
            icon={
              <ExclamationIcon
                color={mode === "dark" ? "#DCE5EF" : "#666666"}
              />
            }
            colorScheme='ghost'
            h='auto'
            minWidth='10px'
          />
        </Tooltip>
      </Flex>
      <Box
        mt={5}
        px={4}
        py={1}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
      >
        <HStack>
          <Input
            border={"none"}
            type='number'
            placeholder={"0.00"}
            value={userAdsInput.crypto_amount}
            name='crypto_amount'
            borderRadius='0'
            onChange={(event) =>
              handleInput(parseFloat(event.target.value), event.target.name)
            }
          />
          <Text fontSize='14px' color={mode === "dark" ? "#DCE5EF" : "#666666"}>
            {userAdsInput.asset}
          </Text>
          <Spacer />
          <Image src={refresh} cursor='pointer' />
          <Spacer />
          <Input
            border={"none"}
            type='number'
            placeholder={"0.00"}
            value={
              userAdsInput.price_type === "Floating" ||
              userAdsInput.price_type === "FLOATING"
                ? userAdsInput.crypto_amount &&
                  formatDecimalNumber(
                    userAdsInput.crypto_amount *
                      assetPrice *
                      (userAdsInput.price_percent / 100)
                  )
                : userAdsInput.crypto_amount * userAdsInput.price
            }
            name='quantity'
            borderRadius='0'
            readOnly
            color={mode === "dark" ? "#DCE5EF" : "#CCCCCC"}
          />
          <Text fontSize='14px' color={mode === "dark" ? "#DCE5EF" : "#CCCCCC"}>
            {userAdsInput?.fiat}
          </Text>
        </HStack>
      </Box>
      <Flex>
        <Text
          fontSize='14px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          py={4}
          mr={2}
        >
          {t('trade_limits')}
        </Text>
        <Tooltip
          hasArrow
          label='The maximum amount, up or down that the exchange for the ad is allowed to fluctuate in one trading session.'
          aria-label='A tooltip'
          placement='right-end'
        >
          <IconButton
            aria-label='Icon button'
            icon={
              <ExclamationIcon
                color={mode === "dark" ? "#DCE5EF" : "#666666"}
              />
            }
            colorScheme='ghost'
            h='auto'
            minWidth='10px'
          />
        </Tooltip>
      </Flex>
      <HStack>
        <Box
          w={isMobileDevice ? "50%" : "100%"}
          px={4}
          py={1}
          border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
          borderRadius='6px'
        >
          <HStack
            border={
              userAdsInput.limit_min > userAdsInput.limit_max
                ? "1px solid red"
                : "none"
            }
          >
            <Input
              border={"none"}
              placeholder={"min"}
              type='number'
              value={userAdsInput.limit_min}
              name='limit_min'
              borderRadius='0'
              onChange={(event) => {
                handleInput(parseFloat(event.target.value), event.target.name);
              }}
            />

            <Text
              fontSize='14px'
              color={mode === "dark" ? "#DCE5EF" : "#666666"}
            >
              {userAdsInput?.fiat}
            </Text>
          </HStack>
        </Box>

        <Image cursor={"pointer"} src={minus} />

        <Box
          w={isMobileDevice ? "50%" : "100%"}
          px={4}
          py={1}
          border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
          borderRadius='6px'
        >
          <HStack
            border={
              userAdsInput.limit_max > appQuantity ? "1px solid red" : "none"
            }
          >
            <Input
              border={"none"}
              placeholder={"max"}
              type='number'
              value={userAdsInput.limit_max}
              name='limit_max'
              borderRadius='0'
              onChange={(event) => {
                handleInput(parseFloat(event.target.value), event.target.name);
              }}
            />
            <Text
              fontSize='14px'
              color={mode === "dark" ? "#DCE5EF" : "#666666"}
            >
              {userAdsInput?.fiat}
            </Text>
            <Spacer />
          </HStack>
        </Box>
      </HStack>
      <Box
        fontSize={"16px"}
        color={"red"}
        display={
          userAdsInput.limit_max > appQuantity ||
          userAdsInput.limit_min > userAdsInput.limit_max
            ? "block"
            : "none"
        }
      >
        {userAdsInput.limit_min > userAdsInput.limit_max
          ? `${t('min_error')}`
          : `${t('limit_error')} (${appQuantity})`}
      </Box>
      <Flex flexDirection={"column-reverse"}>
        <Button
          disabled={error}
          mr={3}
          _hover={{
            bgColor: "",
            color: "",
          }}
          onClick={() => {
            dispatch(setAdsBar(AdsPostSteps.TRADETYPE));
          }}
          isFullWidth
          py={5}
        >
          {error ? errorMsg : t("back")}
        </Button>
        {!hasTokenBeenApproved && AdInfo.type === "sell" ? (
          <Button
            disabled={
              !userAdsInput.limit_min ||
              !userAdsInput.limit_max ||
              userAdsInput.limit_min > userAdsInput.limit_max ||
              !userAdsInput.crypto_amount ||
              error ||
              userAdsInput.limit_max > appQuantity
            }
            my={4}
            variant={"brand"}
            isFullWidth
            _hover={{
              bgColor: "",
              color: "",
            }}
            onClick={() => {
              sellApproval();
            }}
          >
            {`Approve ${AdInfo.asset}`}
          </Button>
        ) : !hasRGPBeenApproved && AdInfo.type === "sell" ? (
          <Button
            disabled={
              !userAdsInput.limit_min ||
              !userAdsInput.limit_max ||
              userAdsInput.limit_min > userAdsInput.limit_max ||
              !userAdsInput.crypto_amount ||
              error ||
              userAdsInput.limit_max > appQuantity
            }
            my={4}
            variant={"brand"}
            isFullWidth
            _hover={{
              bgColor: "",
              color: "",
            }}
            onClick={() => {
              approveRGP();
            }}
          >
            {`Approve RGP`}
          </Button>
        ) : (
          <Button
            disabled={
              !userAdsInput.limit_min ||
              !userAdsInput.limit_max ||
              userAdsInput.limit_min > userAdsInput.limit_max ||
              !userAdsInput.crypto_amount ||
              error ||
              userAdsInput.limit_max > appQuantity
            }
            my={4}
            _hover={{
              bgColor: "",
              color: "",
            }}
            onClick={() => {
              dispatch(setAdsBar(AdsPostSteps.PAYMETHOD));
            }}
            isFullWidth
            variant={"brand"}
          >
            {error ? errorMsg : t('confirm_quantity')}
          </Button>
        )}
      </Flex>
      <Text display={errorMsg === "Insufficient RGP" ? "block" : "none"}>
        Insufficient RGP?{" "}
        <Link
          cursor='pointer'
          fontSize='18px'
          textDecoration='underline'
          href='https://smartswap.rigelprotocol.com'
          target='_blank'
        >
          Buy Here
        </Link>
      </Text>
    </>
  );
};

export default ApproveQuantity;
