import { ChevronDownIcon } from "@chakra-ui/icons";
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
  Input,
  IconButton,
  Tooltip,
  Img,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import MinusIco from "../../../../assets/MinusIcon.svg";
import plusIcon from "../../../../assets/PlusIcon.svg";
import { ExclamationIcon } from "../../../../theme/components/Icons";
import { AdsPostSteps, setAdsBar } from "../../../../state/accountUi";
import { RootState } from "../../../../state/store";
import { AdsObj } from "../AdsType";
import {
  setTradeInfo,
  setTokenAddress,
  setTokenSymbol,
} from "../../../../state/ads/index";
import { GET_BEST_ORDER_PRICE } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import SelectToken from "../../../../components/tokens/SelectToken";
import { useAllTokens } from "../../../../utils/hooks/Tokens";
import CustomModal from "../../../../components/Modals/CustomModal";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { formatDecimalNumber } from "../../../../utils/functions/util";
// import SelectFiatModal from "../../../../components/Modals/SelectFiatModal";
import ARROWLIGHT from "../../../../assets/arrowlight.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type IInput = {
  userAdsInput: AdsObj;
  handleInput: (value: string | number, name: string) => void;
  assetPrice: any;
  setCurrency: React.Dispatch<any>;
  currency: any;
  isEdit: boolean;
};

const TradeTypeAndPrice = ({
  userAdsInput,
  handleInput,
  assetPrice,
  setCurrency,
  currency,
  isEdit,
}: IInput) => {
  const { chainId } = useActiveWeb3React();
  const { t } = useTranslation()
  const editInput = useSelector((state: RootState) => state.ads.editInput);
  const mode = useColorModeValue("light", "dark");
  const adsState = useSelector((state: RootState) => state.ads);
  const selectedChainID = useSelector((state: RootState) => state.user.chainId);
  const selectedNetwork = chainId ?? selectedChainID;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputBorderColor = useColorModeValue("#DEE5ED", "#2D3748");
  const activeTextColor = useColorModeValue("#333333", "");
  const inactiveTextColor = useColorModeValue("#CCCCCC", "");
  // const CustomModal= lazy(()=> import("../../../../components/Modals/CustomModal"))

  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [tokenModal, setTokenModal] = useState<boolean>(false);
  const [isFiatSupported, setisFiatSupported] = useState<Boolean>();
  const lists = useAllTokens();
  const onCurrencySelect = useCallback((inputCurrency) => {
    setTokenModal((state) => !state);
    handleInput(
      inputCurrency?.tokenInfo?.symbol ?? inputCurrency?.symbol,
      "asset"
    );
    handleInput(inputCurrency?.tokenInfo?.address, "token_address");
    handleInput(
      inputCurrency?.tokenInfo?.decimals ?? inputCurrency?.decimals,
      "token_decimal"
    );

    handleInput(
      inputCurrency?.tokenInfo?.logoURI ?? inputCurrency?.logoURI,
      "token_logo"
    );
  }, []);

  useEffect(() => {
    let currencyMatch = Object.values(lists).find(
      (currency) => currency?.tokenInfo?.symbol === userAdsInput.asset
    );

    dispatch(
      setTokenAddress({
        tokenAddress: currencyMatch && currencyMatch.tokenInfo.address,
      })
    );
    dispatch(
      setTokenSymbol({
        tokenSymbol: currencyMatch && currencyMatch.tokenInfo.symbol,
      })
    );
  }, [userAdsInput.asset]);

  const { loading, error, data, refetch } = useQuery(GET_BEST_ORDER_PRICE, {
    variables: {
      param: {
        type: userAdsInput.type,
        asset: userAdsInput.asset,
        fiat: userAdsInput.fiat.currency,
        chainId: chainId?.toString() ?? selectedNetwork?.toString(),
      },
    },
  });

  useEffect(() => {
    if (assetPrice) {
      setisFiatSupported(true);
    } else {
      setisFiatSupported(false);
    }
  }, [assetPrice, userAdsInput.asset, userAdsInput.fiat.currency]);

  useEffect(() => {
    if (!isFiatSupported) {
      if (
        userAdsInput.price_type === "Floating" ||
        userAdsInput.price_type === "FLOATING"
      ) {
        handleInput("", "price_type");
      }
    }
  }, [userAdsInput.asset, userAdsInput.fiat.currency]);

  return (
    <>
      <Box>
        <Flex>
          <Text
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            py={2}
            mr={2}
          >
           {t('i_want_to')}:
          </Text>
          <Tooltip
            hasArrow
            label='Select the type of ad you want to create (Sell/Buy).'
            aria-label='A tooltip'
            placement='right-end'
          >
            <IconButton
              aria-label='Icon button'
              icon={<ExclamationIcon />}
              colorScheme='ghost'
              h='auto'
              minWidth='10px'
            />
          </Tooltip>
        </Flex>
        <Select
          fontSize={"16px"}
          size='lg'
          placeholder={t('select')}
          name='type'
          onChange={(event) =>
            handleInput(event.target.value, event.target.name)
          }
          cursor={"pointer"}
        >
          <option
            style={{
              cursor: "pointer",
            }}
            value='buy'
            selected={userAdsInput.type === "buy"}
          >
            {t('buy')}
          </option>
          <option
            style={{
              cursor: "pointer",
            }}
            value='sell'
            selected={userAdsInput.type === "sell"}
          >
            {t('sell')}
          </option>
        </Select>
      </Box>
      {/* <Box>
        <Flex>
          <Text
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            py={2}
            mr={2}
          >
            Select cryptocurrency
          </Text>
          <Tooltip
            hasArrow
            label='Select the type of cryptocurrency you want to create an ad for.'
            aria-label='A tooltip'
            placement='right-end'
          >
            <IconButton
              aria-label='Icon button'
              icon={<ExclamationIcon />}
              colorScheme='ghost'
              h='auto'
              minWidth='10px'
            />
          </Tooltip>
        </Flex>
        <Select
          size='lg'
          placeholder='Select'
          name='asset'
          onChange={(event) =>
            handleInput(event.target.value, event.target.name)
          }
        >
          {adsState.cryptoCurriences.map((coin, index) => {
            return (
              <option
                value={coin}
                key={index}
                selected={userAdsInput.asset === coin}
              >
                {coin}
              </option>
            );
          })}
        </Select>
      </Box>
      <Box mt={3}>
        <Button
          w='100%'
          cursor='pointer'
          fontSize='16px'
          onClick={() => setTokenModal(!tokenModal)}
        >
          Add Custom Token
        </Button>
        <SelectToken
          onCurrencySelect={onCurrencySelect}
          tokenModal={tokenModal}
          setTokenModal={setTokenModal}
          showBalance={false}
        />
      </Box> */}
      <Box>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex w='45%' flexDirection={"column"}>
            <Flex pt={2} alignItems={"center"}>
              <Text
                fontSize='14px'
                color={mode === "dark" ? "#DCE5EF" : "#666666"}
                mr={2}
                // pt={3}
              >
                {t('cryptocurrency')}
              </Text>
              <Tooltip
                hasArrow
                label='Select the type of cryptocurrency you want to create an ad for.'
                aria-label='A tooltip'
                placement='right-end'
              >
                <IconButton
                  aria-label='Icon button'
                  icon={<ExclamationIcon />}
                  colorScheme='ghost'
                  h='auto'
                  minWidth='10px'
                />
              </Tooltip>
            </Flex>
            <Flex
              mt={{ base: 2 }}
              px={{ base: 2 }}
              alignItems='center'
              justifyContent='space-between'
              h='45px'
              border='1px'
              borderColor={inputBorderColor}
              borderRadius='4px'
              onClick={() => setTokenModal(true)}
              cursor='pointer'
            >
              <Flex>
                {userAdsInput.token_logo && (
                  <Img
                    src={`${userAdsInput.token_logo}`}
                    width='20px'
                    height='20px'
                    mr='10px'
                    mt='2px'
                    alt={userAdsInput.asset?.slice(0, 2)}
                  />
                )}

                <Text
                  color={
                    currency.name || userAdsInput.fiat
                      ? activeTextColor
                      : inactiveTextColor
                  }
                  fontSize='14px'
                >
                  {userAdsInput.asset ? userAdsInput.asset : "Select"}
                </Text>
              </Flex>

              <ChevronDownIcon color={inactiveTextColor} />
            </Flex>
          </Flex>
          <Img src={ARROWLIGHT} mt={10} />
          <Flex w='45%' flexDirection={"column"}>
            <Flex alignItems={"center"} pt={2}>
              <Text
                fontSize='14px'
                color={mode === "dark" ? "#DCE5EF" : "#666666"}
                mr={2}
              >
                {t('with_fiat')}
              </Text>
              <Tooltip
                hasArrow
                label='Select the type of fiat currency you want to use for the ad.'
                aria-label='A tooltip'
                placement='right-end'
              >
                <IconButton
                  aria-label='Icon button'
                  icon={<ExclamationIcon />}
                  colorScheme='ghost'
                  h='auto'
                  minWidth='10px'
                />
              </Tooltip>
            </Flex>

            <Flex
              mt={{ base: 2 }}
              px={{ base: 2 }}
              alignItems='center'
              justifyContent='space-between'
              h='45px'
              border='1px'
              borderColor={inputBorderColor}
              borderRadius='4px'
              onClick={() => setOpenModal(true)}
              cursor='pointer'
            >
              <Flex>
                {currency.logo && (
                  <Img
                    src={`${currency.logo}`}
                    width='24px'
                    height='18px'
                    mr='10px'
                    mt='2px'
                    alt={currency.name?.slice(0, 2)}
                  />
                )}
                <Text
                  color={
                    currency.name || userAdsInput.fiat
                      ? activeTextColor
                      : inactiveTextColor
                  }
                  fontSize='14px'
                >
                  {currency.name
                    ? currency.currency
                    : isEdit
                    ? userAdsInput.fiat
                    : userAdsInput.fiat.currency
                    ? userAdsInput.fiat.currency
                    : "Select"}
                </Text>
              </Flex>

              <ChevronDownIcon color={inactiveTextColor} />
            </Flex>
          </Flex>
        </Flex>
        <SelectToken
          onCurrencySelect={onCurrencySelect}
          tokenModal={tokenModal}
          setTokenModal={setTokenModal}
          showBalance={false}
          showAny={false}
          noSelected={true}
        />

        {/* </Select> */}
      </Box>
      {/* <Box>
        <Flex>
          <Text
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            py={2}
            mr={2}
          >
            Select fiat currency
          </Text>
          <Tooltip
            hasArrow
            label='Select the type of fiat currency you want to use for the ad.'
            aria-label='A tooltip'
            placement='right-end'
          >
            <IconButton
              aria-label='Icon button'
              icon={<ExclamationIcon />}
              colorScheme='ghost'
              h='auto'
              minWidth='10px'
            />
          </Tooltip>
        </Flex>

        <Flex
          mt={{ base: 2 }}
          px={{ base: 2 }}
          alignItems='center'
          justifyContent='space-between'
          h='45px'
          border='2px'
          borderColor={inputBorderColor}
          borderRadius='4px'
          onClick={() => setOpenModal(true)}
          cursor='pointer'
        >
          <Flex>
            {currency.logo && (
              <Image
                src={`${currency.logo}`}
                width='24px'
                height='18px'
                mr='10px'
                mt='2px'
                alt={currency.name?.slice(0, 2)}
              />
            )}
            <Text
              color={
                currency.name || userAdsInput.fiat
                  ? activeTextColor
                  : inactiveTextColor
              }
              fontSize='14px'
            >
              {currency.name
                ? currency.currency
                : isEdit
                ? userAdsInput.fiat
                : userAdsInput.fiat.currency
                ? userAdsInput.fiat.currency
                : "Select Fiat"}
            </Text>
          </Flex>

          <ChevronDownIcon color={inactiveTextColor} />
        </Flex>
        <CustomModal
          data={adsState.fiatCurrencies}
          isOpen={openModal}
          onClose={setOpenModal}
          selectedItem={currency}
          setSelectedItem={(country: any) => {
            handleInput(country.currency, "fiat");
            setCurrency(country);
          }}
          placeholder='Search for currency'
          title='Select Currency'
        />
      </Box> */}
      <Box
        mt={5}
        py={4}
        px={2}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
      >
        <Flex>
          <Text
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            mr={2}
          >
            {t('price_type')}
          </Text>
          <Tooltip
            hasArrow
            label="Select the type of exchange rate you want for your ad. Fixed if you don't want the rate to change and Floating if you want the rate to change depending on market factors"
            aria-label='A tooltip'
            placement='right-end'
          >
            <IconButton
              aria-label='Icon button'
              icon={<ExclamationIcon />}
              colorScheme='ghost'
              h='auto'
              minWidth='10px'
            />
          </Tooltip>
        </Flex>
        <HStack mt={3} color={mode === "dark" ? "#DCE5EF" : "#666666"}>
          <input
            style={{
              cursor: "pointer",
            }}
            type='radio'
            value='Fixed'
            checked={
              userAdsInput.price_type.toLowerCase().charAt(0).toUpperCase() +
                userAdsInput.price_type.toLowerCase().slice(1) ===
              "Fixed"
            }
            name='price_type'
            onChange={(event) =>
              handleInput(event.target.value, event.target.name)
            }
          />
          <label style={{ fontSize: "16px" }}>{t('fixed_price')}</label>
          <Spacer />
          <input
            disabled={
              userAdsInput.asset && userAdsInput.fiat ? !isFiatSupported : false
            }
            type='radio'
            value='Floating'
            checked={
              userAdsInput.price_type.toLowerCase().charAt(0).toUpperCase() +
                userAdsInput.price_type.toLowerCase().slice(1) ===
              "Floating"
            }
            name='price_type'
            onChange={(event) =>
              handleInput(event.target.value, event.target.name)
            }
            style={{
              cursor: "pointer",
            }}
          />
          <label style={{ fontSize: "16px" }}>{t('float_price')}</label>
          <Spacer />
        </HStack>
        <Flex mt={5}>
          <Text
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            mr={2}
          >
            {userAdsInput.price_type} {t('price_margin')}
          </Text>
          <Tooltip
            hasArrow
            label='Price for the cryptocurrency.'
            aria-label='A tooltip'
            placement='right-end'
          >
            <IconButton
              aria-label='Icon button'
              icon={<ExclamationIcon />}
              colorScheme='ghost'
              h='auto'
              minWidth='10px'
            />
          </Tooltip>
        </Flex>

        {userAdsInput.price_type === "Floating" &&
          userAdsInput.price_percent !== 0 &&
          userAdsInput.price_percent < 80 && (
            <Text my={2} fontSize='14px' color='#FF3358'>
              {t('float_price_low')}
            </Text>
          )}

        {userAdsInput.price_percent > 200 && (
          <Text my={2} fontSize='14px' color='#FF3358'>
            {t('float_price_high')}
          </Text>
        )}
        <Box
          mt={3}
          px={4}
          py={1}
          border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
          borderRadius='6px'
        >
          <HStack>
            <Image
              cursor={"pointer"}
              src={MinusIco}
              onClick={() => {
                if (userAdsInput.price !== 0) {
                  handleInput(
                    userAdsInput.price - 1,
                    userAdsInput.price_type === "Floating"
                      ? "price_percent"
                      : "price"
                  );
                }
              }}
            />
            <Spacer />
            <Input
              _focus={{
                border: "none",
              }}
              _active={{
                border: "none",
              }}
              name={
                userAdsInput.price_type === "Floating"
                  ? "price_percent"
                  : "price"
              }
              value={
                userAdsInput.price_type === "Floating"
                  ? userAdsInput.price_percent || ""
                  : userAdsInput.price || ""
              }
              placeholder={
                userAdsInput.price_type === "Floating" ? "percent" : t("price")
              }
              onChange={(event) =>
                handleInput(
                  parseFloat(event.target.value.replace(/[^0-9.]/g, "")),
                  event.target.name
                )
              }
              textAlign="center"
              width='100px'
              border={"none"}
            />
            <Spacer />
            <Image
              cursor={"pointer"}
              src={plusIcon}
              onClick={() =>
                handleInput(
                  userAdsInput.price + 1,
                  userAdsInput.price_type === "Floating"
                    ? "price_percent"
                    : "price"
                )
              }
            />
          </HStack>
        </Box>

        <HStack mt={5}>
          <Text fontSize='14px' color={mode === "dark" ? "#DCE5EF" : "#666666"}>
            {userAdsInput.price_type === "Floating" ? t("price") : t('my_price')}
          </Text>
          <Spacer />
          <Flex>
            <Text
              fontSize='14px'
              color={mode === "dark" ? "#DCE5EF" : "#666666"}
              mr={2}
            >
              {t('highest_order_price')}
            </Text>
            <Tooltip
              hasArrow
              label='Highest order price is the best price offer for a buy / sell ads'
              aria-label='A tooltip'
              placement='right-end'
            >
              <IconButton
                aria-label='Icon button'
                icon={<ExclamationIcon />}
                colorScheme='ghost'
                h='auto'
                minWidth='10px'
              />
            </Tooltip>
          </Flex>
        </HStack>
        <HStack mt={5}>
          <Text
            fontSize='20px'
            fontWeight={500}
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
          >
            {userAdsInput.price_type === "Floating"
              ? (userAdsInput.price_percent &&
                  formatDecimalNumber(
                    parseFloat(assetPrice) * (userAdsInput.price_percent / 100)
                  )) ||
                0
              : userAdsInput.price || 0}
          </Text>
          <Text
            fontSize='14px'
            pt={1}
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
          >
            {userAdsInput.fiat.currency}
          </Text>
          <Spacer />
          <Text
            fontSize='20px'
            fontWeight={500}
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
          >
            {loading &&
            userAdsInput.asset !== "" &&
            userAdsInput.fiat.currency !== ""
              ? "Loading..."
              : data && !data.getBestOrderPrice.price
              ? 0
              : data && data.getBestOrderPrice.price}
          </Text>
          <Text
            pt={1}
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
          >
            {loading ? "" : userAdsInput.fiat.currency}
          </Text>
        </HStack>
        {/* <HStack mt={3}>
          {userAdsInput.price_type === "Floating" ? null : (
            <Text
              pt={1}
              fontSize='14px'
              color={mode === "dark" ? "#DCE5EF" : "#666666"}
            >
              Rate: 1 {userAdsInput.asset} ={" "}
              {!userAdsInput.price ? 0 : userAdsInput.price}{" "}
              {isEdit ? userAdsInput.fiat : userAdsInput.fiat.currency}
            </Text>
          )}
        </HStack> */}
      </Box>
      <Flex flexDirection={"column-reverse"}>
        <Button
          mr={3}
          _hover={{
            bgColor: "",
            color: "",
          }}
          isFullWidth
          py={5}
          onClick={() => navigate(-1)}
        >
         {t('cancel')}
        </Button>
        {userAdsInput.price_type === "Floating" ||
        userAdsInput.price_type === "FLOATING" ? (
          <Button
            my={5}
            disabled={
              !userAdsInput.type ||
              !userAdsInput.asset ||
              !userAdsInput.fiat.currency ||
              !userAdsInput.price_type ||
              !userAdsInput.price_percent ||
              userAdsInput.price_percent < 80 ||
              userAdsInput.price_percent > 200 ||
              !assetPrice
            }
            _hover={{
              bgColor: "",
              color: "",
            }}
            onClick={() => {
              dispatch(setAdsBar(AdsPostSteps.APPROVEQUANTITY));
              dispatch(
                setTradeInfo({
                  type: userAdsInput.type,
                  asset: userAdsInput.asset,
                  fiat: isEdit ? userAdsInput.fiat : userAdsInput.fiat.currency,
                  price_type: userAdsInput.price_type,
                  price: userAdsInput.price_percent,
                })
              );
            }}
            isFullWidth
            variant={"brand"}
            py={5}
          >
           {t('confirm_price')}
          </Button>
        ) : (
          <Button
            my={5}
            disabled={
              !userAdsInput.type ||
              !userAdsInput.asset ||
              (!userAdsInput.fiat.currency || !userAdsInput.fiat) ||
              !userAdsInput.price_type ||
              !userAdsInput.price
            }
            _hover={{
              bgColor: "",
              color: "",
            }}
            onClick={() => {
              dispatch(setAdsBar(AdsPostSteps.APPROVEQUANTITY));
              dispatch(
                setTradeInfo({
                  type: userAdsInput.type,
                  asset: userAdsInput.asset,
                  fiat: isEdit ? userAdsInput.fiat : userAdsInput.fiat.currency,
                  price_type: userAdsInput.price_type,
                  price: userAdsInput.price,
                })
              );
            }}
            isFullWidth
            variant={"brand"}
            py={5}
          >
           {t('confirm_price')}
          </Button>
        )}
      </Flex>

      <CustomModal
        data={adsState.fiatCurrencies}
        isOpen={openModal}
        onClose={setOpenModal}
        selectedItem={currency}
        setSelectedItem={(country: any) => {
          handleInput(country, "fiat");
          setCurrency(country);
        }}
        placeholder='Search for currency'
        title='Select Currency'
      />
    </>
  );
};

export default TradeTypeAndPrice;
