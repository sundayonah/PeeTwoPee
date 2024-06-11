import { Button, Flex, Image, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalContent, ModalOverlay, Text, useColorModeValue, useMediaQuery, Spinner, Tooltip, Divider, InputRightElement,
} from "@chakra-ui/react";
import { IOrder } from "../../../../state/order";
import { useFetchOrderById } from "../../../../utils/hooks/useOrder";
import { addToast } from "../../../../components/Toast/toastSlice";
import { useAllowance } from "../../../../utils/hooks/useAllowance";
import { useBalances } from "../../../../utils/hooks/useBalances";
import {
  CONTRACT_ADDRESSES,
  getERC20Token,
  RGPADDRESSES,
} from "../../../../utils";
import { ethers } from "ethers";
import { setOpenModal, TrxState } from "../../../../state/application";
import { useOrderFee } from "../../../../utils/hooks/useOrder";
import ApproveModal from "../../../../components/Modals/Sell/ApproveModal";
import {
  formatDecimalNumber,
  getTokenIcon,
} from "../../../../utils/functions/util";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { useDispatch } from "react-redux";

import {
  PROCESS_TRADE_REQUEST,
  STARTTRANSACTION,
} from "../../../Buy/gql/mutation";

import { useMutation } from "@apollo/client";
import { useState, useMemo, useEffect } from "react";
import FeeInfoModal from "./FeeInfoModal";
import { useNavigate } from "react-router-dom";
import { GInteractedWithAd } from "../../../../utils/GAnalytics/gTrade";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../../state/store";
import { useAppSelector } from "../../../../state/hooks";
interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  orderInfo: IOrder;
}

const BuyModal = ({ onClose, isOpen, orderInfo }: ModalProps) => {
  const leftSideBgColor = useColorModeValue("#F2F5F8", "#213345");
  const rightSideBgColor = useColorModeValue("#FFFFFF", "#15202B");
  const logoBgColor = useColorModeValue("#319EF6", "#4CAFFF");
  const logoTextColor = useColorModeValue("#FFFFFF", "#15202B");
  const nameTextColor = useColorModeValue("#319EF6", "#4CAFFF");
  const termsandconditionsBorder = useColorModeValue("#DEE5ED", "#324D68");
  const termsandconditionsBgColor = useColorModeValue("#FFFFFF", "#15202B");
  const allButtonColor = useColorModeValue("#D6EEF5", "#213345");
  const allButtonTextColor = useColorModeValue("#3CB1D2", "#1B90B1");
  const assetBgColor = useColorModeValue("#F2F5F8", "#213345");
  const assetTextCOlor = useColorModeValue("#666666", "#DCE5EF");
  const cancelBorderColor = useColorModeValue("#666666", "#DCE6EF");
  const cancelTextColor = useColorModeValue("#666666", "#DCE5EF");
  const buyBgColor = useColorModeValue("#0CCB80", "#0CCB80");
  const buyTextColor = useColorModeValue("#FFFFFF", "#F1F5F8");

  const sellBgColor = useColorModeValue("#CC334F", "#CC334F");
  const sellTextColor = useColorModeValue("#FFFFFF", "#F1F5F8");
  const finalTextColor = useColorModeValue("#666666", "#DCE5EF");
  const priceColor = useColorModeValue("#0CCB80", "#0CCB80");
  const inputerrorBorderColor = useColorModeValue("#CC334F", "#FF3358");
  const inputBorderColor = useColorModeValue("#DEE5ED", "#324D68");
  const errorTextColor = useColorModeValue("#FF3358", "#FF3358");
  const toolTipBgColor = useColorModeValue("#FFFFFF", "#1A202C");
  const toolTipColor = useColorModeValue("#333333", "#ffffff");

  const { t } = useTranslation()
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderOwner } = useFetchOrderById(orderInfo?._id);

  const [amountToPay, setAmountToPay] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");
  const [bottomerrorMessage, setbottomerrorMessage] = useState("");
  const [buttonMessage, setButtonMessage] = useState(
    `Sell ${orderInfo?.asset}`
  );
  const [errorMessage, seterrorMessage] = useState("");
  const [reload, setReload] = useState(false);
  const [rgpReload, setRgpReload] = useState(false);
  const { fee } = useOrderFee(
    orderInfo?.asset ?? "",
    orderInfo?.token_address ?? "",
    orderInfo?.type
  );
  const { chainId, library, account } = useActiveWeb3React();

  const [onOpen, setonOpen] = useState(false);
  const [allcheckpassed, setallcheckpassed] = useState(false);
  const [infoModal, setinfoModal] = useState(false);

  const { tokenAllowance } = useAllowance(
    chainId ? orderInfo?.token_address : "",
    amountToPay,
    chainId ? CONTRACT_ADDRESSES[chainId]["P2P"] : "",
    reload,
    setReload
  );

  const { tokenAllowance: RGPTokenAllowance } = useAllowance(
    chainId ? RGPADDRESSES[chainId as number] : "",
    fee,
    chainId ? CONTRACT_ADDRESSES[chainId]["P2P"] : "",
    rgpReload,
    setRgpReload
  );

  const { balance } = useBalances(orderInfo?.token_address);
  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );

  const { balance: rgpBalance } = useBalances(RGPADDRESSES[chainId as number]);

  const [startTransaction, { data, loading, error }] = useMutation(
    STARTTRANSACTION,
    {
      variables: {
        transaction: {
          amount:
            orderInfo?.type === "buy"
              ? parseFloat(amountToPay)
              : parseFloat(amountToReceive),
          id: orderInfo?._id,
          chainId: chainId,
          isDemo: isDemoAccount
        },
      },
      onCompleted: async (data) => {
        if (data?.startTransaction.status === true) {
          await processTradeRequest({
            variables: {
              chainId: chainId,
              requestType: "sent",
              transaction_id: data?.startTransaction?.transaction._id,
            },
          });
          navigate(
            `/buy/order/trade/${data?.startTransaction.transaction._id}`
          );
        } else if (data?.startTransaction.status === false) {
          dispatch(
            addToast({ message: data?.startTransaction.message, error: true })
          );
        }
      },
    }
  );

  const [
    processTradeRequest,
    {
      loading: tradeRequestLoading,
      error: tradeRequestError,
      data: tradeRequestdata,
    },
  ] = useMutation(PROCESS_TRADE_REQUEST, {
    onCompleted: (data) => {
      if (data?.processTradeRequest.status === true) {
        // navigate(`/buy/order/trade/${data?.startTransaction.transaction._id}`);
        GInteractedWithAd(data?.user?.username ?? "---",orderInfo?.type,data.asset,data.fiat,chainId)
      } else if (data?.processTradeRequest.status === false) {
        dispatch(
          
          addToast({ message: t(data?.processTradeRequest.message), error: true })
        );
      }
    },
  });

  useEffect(() => {
    if (orderInfo?.type === "buy") {
      setButtonMessage(`Sell ${orderInfo?.asset}`);
    } else {
      setButtonMessage(`Buy ${orderInfo?.asset}`);
    }
  }, [orderInfo, isOpen]);

  useMemo(() => {
    if (orderInfo?.type === "buy") {
      if (amountToPay) {
        if (orderOwner?.address === account) {
          setButtonMessage("You can't fulfill your order");
        } else if (
          (orderInfo?.asset !== "RGP" &&
          parseFloat(fee) > parseFloat(rgpBalance)) && !isDemoAccount
        ) {
          setButtonMessage("Insufficient RGP Balance for Fee");
        } else if (
          (orderInfo?.asset !== "RGP" &&
          parseFloat(fee) >
            parseFloat(
              RGPTokenAllowance
                ? ethers.utils.formatEther(RGPTokenAllowance)
                : "10"
            )) && !isDemoAccount
        ) {
          setButtonMessage("Approve RGP For Fee");
        } else if (parseFloat(amountToPay) > orderInfo?.crypto_amount) {
          setButtonMessage(`Sell ${orderInfo?.asset}`);
        } else if (
         ( orderInfo?.asset === "RGP" &&
          parseFloat(fee) > parseFloat(balance) && !isDemoAccount)
        ) {
          setButtonMessage("Insufficient Balance");
        } else if (
         ( parseFloat(amountToPay) > parseFloat(balance ? balance : "10")) && !isDemoAccount
        ) {
          setButtonMessage("Insufficient Balance");
        } else if (
          parseFloat(amountToPay) >
          parseFloat(
            tokenAllowance ? ethers.utils.formatEther(tokenAllowance) : "10"
          )
        ) {
          setButtonMessage(`Approve ${orderInfo?.asset}`);
        } else if (parseFloat(amountToPay) > orderInfo?.crypto_amount) {
          setButtonMessage("Check Available Tokens on Order");
        } else {
          setButtonMessage(`Sell ${orderInfo?.asset}`);
        }
      } else {
        setButtonMessage(`Sell ${orderInfo?.asset}`);
      }
    }
  }, [amountToPay, tokenAllowance, RGPTokenAllowance, isDemoAccount]);

  useMemo(() => {
    if (orderInfo?.type === "buy") {
      if (amountToPay) {
        if (orderInfo?.asset === "RGP") {
          if (
         (   parseFloat(amountToPay) > parseFloat(balance) ||
            parseFloat(fee) > parseFloat(balance)) && !isDemoAccount
          ) {
            seterrorMessage(t('insuf_rgp'));
            return;
          } else {
            seterrorMessage("");
          }
          if (parseFloat(amountToPay) > orderInfo?.crypto_amount) {
            seterrorMessage(
              `Insufficient (${orderInfo?.crypto_amount}) ${orderInfo?.asset} available to complete order`
            );
            return;
          } else {
            seterrorMessage("");
          }
        }
        if ((parseFloat(fee) > parseFloat(rgpBalance)) && !isDemoAccount) {
          seterrorMessage(t('insuf_rgp2') );
          return;
        } else {
          seterrorMessage("");
        }
        if (parseFloat(amountToPay) > parseFloat(balance)) {
          seterrorMessage(`${t('insuf')} ${orderInfo?.asset} ${t('balance')}`);
          return;
        } else {
          seterrorMessage("");
        }
        if (parseFloat(amountToPay) > orderInfo?.crypto_amount) {
          seterrorMessage(
            `${t('insuf')} ${orderInfo?.asset} ${t('avail_complete')}`
          );
          return;
        } else {
          seterrorMessage("");
        }
      }
    }
  }, [amountToPay, isDemoAccount]);

  const approveToken = async (
    amountToApproveBy: number,
    tokenAddress: string,
    assetSymbol: string
  ) => {
    try {
      dispatch(
        setOpenModal({
          message: t('req_access'),
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const token = await getERC20Token(tokenAddress, library);
      const balance = await token.balanceOf(account);
      const decimals = await token.decimals();
      const approveAmount = ethers.utils.parseUnits(
        (parseFloat(amountToPay) * amountToApproveBy).toString(),
        decimals
      );
      const allowanceTx = await token.approve(
        CONTRACT_ADDRESSES[chainId.toString()]["P2P"],
        assetSymbol === "RGP" ? balance.toString() : approveAmount.toString(),
        {
          from: account,
        }
      );

      const { confirmations } = await allowanceTx.wait();

      if (confirmations >= 1) {
        setReload(true);
        setRgpReload(true);
        setonOpen(false);
        dispatch(
          setOpenModal({
            message: `Transaction Approved Successful`,
            trxState: TrxState.TransactionSuccessful,
          })
        );
      }
    } catch (err) {
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
    }
  };

  useMemo(() => {
    if (orderInfo?.type === "buy") {
      if (amountToReceive) {
        if (parseFloat(amountToReceive) < orderInfo?.limit_min) {
          setbottomerrorMessage(
            `Amount to recieve is below minimum trade limit of ${orderInfo?.limit_min} ${orderInfo?.fiat}`
          );
          return;
        } else {
          setbottomerrorMessage("");
        }

        if (parseFloat(amountToReceive) > orderInfo?.limit_max) {
          setbottomerrorMessage(
            `${t('bottom_err')} ${orderInfo?.limit_max} ${orderInfo?.fiat}`
          );
          return;
        } else {
          setbottomerrorMessage("");
        }
      } else {
        setbottomerrorMessage("");
      }
    } else {
      if (amountToPay) {
        if (parseFloat(amountToPay) < orderInfo?.limit_min) {
          seterrorMessage(
            `${t('amt_to_pay')} ${orderInfo?.limit_min} ${orderInfo?.fiat}`
          );
          return;
        } else {
          seterrorMessage("");
        }

        if (parseFloat(amountToPay) > orderInfo?.limit_max) {
          seterrorMessage(
            `${t('max_amt_to_pay')} ${orderInfo?.limit_max} ${orderInfo?.fiat}`
          );
          return;
        } else {
          seterrorMessage("");
        }

        if (
          (parseFloat(fee) / 100) * parseFloat(amountToReceive) >
          parseFloat(amountToReceive)
        ) {
          seterrorMessage(
            `${t('fee_amt')} (${fee ? fee : ""})`
          );
          return;
        } else {
          seterrorMessage("");
        }
      } else {
        seterrorMessage("");
      }
    }
  }, [amountToReceive, amountToPay]);

  const handleLockToken = async () => {
    if (buttonMessage === `Approve ${orderInfo?.asset}`) {
      await approveToken(5, orderInfo?.token_address, orderInfo?.asset);
    } else if (buttonMessage === "Approve RGP For Fee") {
      await approveToken(5, RGPADDRESSES[chainId as number], "RGP");
    } else {
      startTransaction();
    }
  };


  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        size={isMobileDevice ? "sm" : "3xl"}
        isOpen={isOpen}
        isCentered={isMobileDevice ? false : true}
      >
        <ModalOverlay />
        <ModalContent h='400px'>
          <ModalBody  p={0}>
            <Flex
              w='100%'
              h='100%'
              flexDirection={isMobileDevice ? "column" : undefined}
              flex='1'
            >
              <Flex
                p={6}
                flexDirection={"column"}
                bgColor={leftSideBgColor}
                flex='0.5'
              >
                <Flex alignItems={"center"}>
                  <Flex
                    mr={2}
                    borderRadius={"50%"}
                    py={1}
                    px={3}
                    bgColor={logoBgColor}
                    color={logoTextColor}
                    fontWeight={"500"}
                  >
                    {orderInfo?.user.username
                      ? orderInfo?.user?.username[0]?.toUpperCase()
                      : orderInfo?.user?.fullname
                      ? orderInfo?.user?.fullname[0]?.toUpperCase()
                      : ""}
                  </Flex>
                  <Flex flexDirection={"column"}>
                    <Flex>
                      <Text
                        color={nameTextColor}
                        fontWeight={"500"}
                        fontSize={"14px"}
                        mb={1}
                      >
                        {orderInfo?.user.username
                          ? orderInfo?.user.username
                          : orderInfo?.user.fullname}
                      </Text>
                    </Flex>
                    <Text fontSize={"12px"}>
                      {orderInfo?.user.completed_orders === null
                        ? 0
                        : orderInfo?.user.completed_orders}{" "}
                      {t('order(s)')} |{" "}
                      {orderInfo?.user.order_completion_rate === null
                        ? 0
                        : orderInfo?.user.order_completion_rate}
                      % {t('completion')}
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  border={"1px"}
                  mt={5}
                  borderColor={termsandconditionsBorder}
                  flexDirection={"column"}
                  w='100%'
                  bgColor={termsandconditionsBgColor}
                >
                  < Text className="BuymodalsClass" p={1} fontSize={"12px"}>
                   {t("TC")}
                  </Text>
                  <Divider borderColor={termsandconditionsBorder} />
                  <Flex h='80px' overflowY={"scroll"}>
                    <Text p={2} fontSize={"12px"}>
                      {" "}
                      {orderInfo?.terms}
                    </Text>
                  </Flex>
                </Flex>

                <Flex 
                mt={5} fontSize={"12px"} flexDirection={"column"}>
                  <Flex justifyContent={"space-between"}>
                    <Text>{t('price')}:</Text>
                    <Text
                      color={
                        orderInfo?.type === "buy" ? sellBgColor : priceColor
                      }
                      fontWeight={"500"}
                    >
                      1 {orderInfo?.asset} = {orderInfo?.price}{" "}
                      {orderInfo?.fiat}
                    </Text>
                  </Flex>
                  <Flex mt={3} justifyContent={"space-between"}>
                    <Text>{t('available')}:</Text>
                    <Text fontWeight={"500"}>
                      {formatDecimalNumber(orderInfo?.crypto_amount)}{" "}
                      {orderInfo?.asset}
                    </Text>
                  </Flex>
                  <Flex mt={3} justifyContent={"space-between"}>
                    <Text>{t('limits')}:</Text>
                    <Text fontWeight={"500"}>
                      {orderInfo?.limit_min} {orderInfo?.fiat} -{" "}
                      {orderInfo?.limit_max} {orderInfo?.fiat}
                    </Text>
                  </Flex>
                  <Flex mt={3} justifyContent={"space-between"}>
                    <Text>{t('payment_method')}:</Text>
                    <Text fontWeight={"500"}>{orderInfo?.payment_method.toLowerCase()==="bank transfer" ? t('bank_transfer') : orderInfo?.payment_method }</Text>
                  </Flex>
                  <Flex mt={3} justifyContent={"space-between"}>
                    {orderInfo?.type === "sell" ? (
                      <Text>
                        {t('transaction_fee')} ({" "}
                        {orderInfo?.type === "sell" && orderInfo?.asset})
                      </Text>
                    ) : (
                      <Text>{t('transaction_fee')}</Text>
                    )}
                    <Text fontWeight={"500"}>
                      {fee
                        ? `${fee} ${orderInfo?.type === "buy" ? "RGP" : "%"}`
                        : ""}
                    </Text>
                  </Flex>
                  <Flex mt={3} justifyContent={"space-between"}>
                    <Text>{t('token')}:</Text>
                    <Flex>
                      <Image
                        mr={2}
                        height={5}
                        width={4}
                        src={getTokenIcon(orderInfo?.asset)}
                      />
                      <Text fontWeight={"500"}>{orderInfo?.asset}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex p={6} flex='0.5' bgColor={rightSideBgColor}>
                <Flex w='100%' flexDirection={"column"}>
                  <Flex mb={3} alignItems={"center"}>
                    <Text fontSize={"14px"}>
                      {t('want_to_pay')}
                    </Text>
                    <Tooltip
                      hasArrow
                      label={
                        orderInfo?.type === "sell"
                          ? `Input amount of ${orderInfo?.fiat} you want to buy ${orderInfo?.asset} with `
                          : `Input amount of ${orderInfo?.asset} you want to sell `
                      }
                      placement='top-end'
                      bgColor={toolTipBgColor}
                      color={toolTipColor}
                    >
                      <InfoOutlineIcon ml={2} />
                    </Tooltip>
                  </Flex>
                  <InputGroup
                    border={"1px"}
                    borderRadius={"6px"}
                    _hover={{
                      borderColor: errorMessage
                        ? inputerrorBorderColor
                        : inputBorderColor,
                    }}
                    _active={{
                      borderColor: errorMessage
                        ? inputerrorBorderColor
                        : inputBorderColor,
                    }}
                    _focus={{
                      borderColor: errorMessage
                        ? inputerrorBorderColor
                        : inputBorderColor,
                    }}
                    borderColor={
                      errorMessage ? inputerrorBorderColor : inputBorderColor
                    }
                  >
                    {orderInfo?.type === "buy" ? (
                      <Input
                        _focus={{ borderColor: "none" }}
                        _hover={{ borderColor: "none" }}
                        borderRight={"none"}
                        value={amountToPay}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setAmountToPay(e.target.value);

                            setAmountToReceive(
                              e.target.value !== ""
                                ? (
                                    parseFloat(e.target.value) *
                                    orderInfo?.price
                                  ).toString()
                                : ""
                            );
                          }
                        }}
                      />
                    ) : (
                      <Input
                        _focus={{ borderColor: "none" }}
                        _hover={{ borderColor: "none" }}
                        borderRight={"none"}
                        value={amountToPay}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setAmountToPay(e.target.value);

                            setAmountToReceive(
                              e.target.value !== ""
                                ? (
                                    parseFloat(e.target.value) /
                                    orderInfo?.price
                                  ).toString()
                                : ""
                            );
                          }
                        }}
                      />
                    )}
                    <InputRightElement
                      onClick={() => {
                        if (orderInfo?.type === "sell") {
                          setAmountToPay(orderInfo?.limit_max.toString());
                          setAmountToReceive(
                            (orderInfo?.limit_max / orderInfo?.price).toString()
                          );
                        } else {
                          setAmountToPay(orderInfo?.crypto_amount.toString());
                          setAmountToReceive(
                            (
                              orderInfo?.crypto_amount * orderInfo?.price
                            ).toString()
                          );
                        }
                      }}
                      cursor={"pointer"}
                    >
                      <Flex
                        borderRadius={"4px"}
                        py={0.8}
                        px={2}
                        mr={36}
                        bgColor={allButtonColor}
                      >
                        <Text fontSize={"12px"} color={allButtonTextColor}>
                          All
                        </Text>
                      </Flex>
                    </InputRightElement>
                    <InputRightAddon bgColor={assetBgColor}>
                      <Flex>
                        <Text fontSize={"14px"} color={assetTextCOlor}>
                          {orderInfo?.type === "buy"
                            ? orderInfo?.asset
                            : orderInfo?.fiat}
                        </Text>
                      </Flex>
                    </InputRightAddon>
                  </InputGroup>
                  <Text mt={1} color={errorTextColor} fontSize={"12px"}>
                    {errorMessage}
                  </Text>

                  <Flex mt={10} mb={3} alignItems={"center"}>
                    <Text fontSize={"14px"}>
                      {t('will_receive')}
                    </Text>
                    <Tooltip
                      hasArrow
                      label={
                        orderInfo?.type === "sell"
                          ? `${t('input_amt')} ${orderInfo?.asset} ${t('buy_in')} `
                          : `${t('input_amt')} ${orderInfo?.fiat} ${t('sell_in')} ${orderInfo?.asset} `
                      }
                      placement='top-end'
                      bgColor={toolTipBgColor}
                      color={toolTipColor}
                    >
                      <InfoOutlineIcon ml={2} />
                    </Tooltip>
                  </Flex>
                  <InputGroup
                    border={"1px"}
                    borderRadius={"6px"}
                    borderColor={
                      bottomerrorMessage
                        ? inputerrorBorderColor
                        : inputBorderColor
                    }
                    _hover={{
                      borderColor: bottomerrorMessage
                        ? inputerrorBorderColor
                        : inputBorderColor,
                    }}
                    _active={{
                      borderColor: bottomerrorMessage
                        ? inputerrorBorderColor
                        : inputBorderColor,
                    }}
                    _focus={{
                      borderColor: bottomerrorMessage
                        ? inputerrorBorderColor
                        : inputBorderColor,
                    }}
                  >
                    {orderInfo?.type === "buy" ? (
                      <Input
                        _focus={{ borderColor: "none" }}
                        _hover={{ borderColor: "none" }}
                        borderRight={"none"}
                        value={amountToReceive}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setAmountToReceive(e.target.value);
                            setAmountToPay(
                              e.target.value !== ""
                                ? (
                                    parseFloat(e.target.value) /
                                    orderInfo?.price
                                  ).toString()
                                : ""
                            );
                          }
                        }}
                      />
                    ) : (
                      <Input
                        _focus={{ borderColor: "none" }}
                        _hover={{ borderColor: "none" }}
                        borderRight={"none"}
                        value={
                          orderInfo?.type === "buy"
                            ? amountToReceive
                            : formatDecimalNumber(amountToReceive)
                        }
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setAmountToReceive(e.target.value);
                            setAmountToPay(
                              e.target.value !== ""
                                ? (
                                    parseFloat(e.target.value) *
                                    orderInfo?.price
                                  ).toString()
                                : ""
                            );
                          }
                        }}
                      />
                    )}

                    <InputRightAddon bgColor={assetBgColor}>
                      <Flex>
                        <Text fontSize={"14px"} color={assetTextCOlor}>
                          {orderInfo?.type === "buy"
                            ? orderInfo?.fiat
                            : orderInfo?.asset}
                        </Text>
                      </Flex>
                    </InputRightAddon>
                  </InputGroup>
                  <Text mt={1} color={errorTextColor} fontSize={"12px"}>
                    {bottomerrorMessage}
                  </Text>
                  <Flex width={"100%"} justifyContent={"space-between"} mt={10}>
                    <Button
                      onClick={() => {
                        onClose();
                        setAmountToPay("");
                        setAmountToReceive("");
                        setButtonMessage("");
                        seterrorMessage("");
                        setbottomerrorMessage("");
                      }}
                      border='1px'
                      borderColor={cancelBorderColor}
                      _hover={{ bgColor: "transparent" }}
                      _active={{ bgColor: "transparent" }}
                      bgColor={"transparent"}
                      fontWeight={"500"}
                      fontSize={"14px"}
                      _focus={{ borderColor: "none" }}
                      w='45%'
                      color={cancelTextColor}
                    >
                      {t('cancel')}
                    </Button>

                    {orderInfo?.type === "buy" ? (
                      <>
                        <Button
                          display={
                            parseFloat(
                              ethers.utils.formatEther(
                                tokenAllowance ? tokenAllowance : "0"
                              )
                            ) > 0 &&
                            parseFloat(balance ?? "0") >
                              parseFloat(amountToPay) &&
                            parseFloat(amountToPay) >
                              parseFloat(
                                ethers.utils.formatEther(tokenAllowance ?? "0")
                              ) &&
                            parseFloat(amountToPay) <=
                              orderInfo?.crypto_amount &&
                            orderInfo?.asset !== "RGP"
                              ? "none"
                              : undefined
                          }
                          disabled={
                            !amountToReceive ||
                            !amountToPay ||
                            loading ||
                            (orderInfo?.asset === "RGP" &&
                              parseFloat(fee) > parseFloat(balance)) ||
                            parseFloat(amountToPay) >
                              orderInfo?.crypto_amount ||
                            parseFloat(amountToPay) >
                              parseFloat(balance ? balance : "1") ||
                            orderOwner?.address === account ||
                            (orderInfo?.asset !== "RGP" &&
                              parseFloat(fee) > parseFloat(rgpBalance)) ||
                            parseFloat(amountToPay) > orderInfo?.crypto_amount
                          }
                          bgColor={sellBgColor}
                          _active={{ bgColor: sellBgColor }}
                          _focus={{ borderColor: "none" }}
                          _hover={{ bgColor: sellBgColor }}
                          color={sellTextColor}
                          fontWeight={"500"}
                          fontSize={"14px"}
                          w='45%'
                          px={2}
                          onClick={() => handleLockToken()}
                        >
                          {loading ? <Spinner /> : buttonMessage}
                        </Button>

                        {parseFloat(
                          ethers.utils.formatEther(
                            tokenAllowance ? tokenAllowance : "0"
                          )
                        ) > 0 &&
                          parseFloat(balance ?? "0") >
                            parseFloat(amountToPay) &&
                          parseFloat(amountToPay) >
                            parseFloat(
                              ethers.utils.formatEther(tokenAllowance ?? "0")
                            ) &&
                          parseFloat(amountToPay) <= orderInfo?.crypto_amount &&
                          orderInfo?.asset !== "RGP" && !isDemoAccount && (
                            <>
                              <Flex flexDirection='column'>
                                <Button
                                  onClick={() => setonOpen(true)}
                                  w='100%'
                                  mt={3}
                                  borderRadius='6px'
                                  background='#CC334F'
                                  color='white'
                                  p='9px 45px'
                                  _hover={{
                                    background: "#CC334F",
                                  }}
                                >
                                  {t('approve')} {orderInfo?.asset}
                                </Button>
                              </Flex>
                            </>
                          )}
                      </>
                    ) : (
                      <Button
                        bgColor={buyBgColor}
                        _active={{ bgColor: buyBgColor }}
                        _focus={{ borderColor: "none" }}
                        _hover={{ bgColor: buyBgColor }}
                        color={buyTextColor}
                        fontWeight={"500"}
                        fontSize={"14px"}
                        p={2}
                        w='45%'
                        disabled={
                          !amountToReceive ||
                          !amountToPay ||
                          loading ||
                          bottomerrorMessage !== "" ||
                          errorMessage !== ""
                        }
                        onClick={() => setinfoModal(true)}
                      >
                        {loading ? <Spinner /> : buttonMessage}
                      </Button>
                    )}
                  </Flex>

                  {orderInfo?.type === "buy" &&
                  orderInfo?.asset !== "RGP" &&
                  amountToPay &&
                  parseFloat(fee) > parseFloat(rgpBalance) ? (
                    <Flex mt={2} justifyContent='center'>
                      <Text
                        color='#068754'
                        fontSize='14px'
                        textDecoration='underline'
                      >
                        <a href='https://smartswap.rigelprotocol.com'>
                          {t('buy_rgp')}
                        </a>
                      </Text>
                    </Flex>
                  ) : orderInfo?.type === "buy" &&
                    orderInfo?.asset === "RGP" &&
                    amountToPay &&
                    (parseFloat(amountToPay) > parseFloat(balance) ||
                      parseFloat(fee) > parseFloat(balance)) ? (
                    <Flex mt={2} justifyContent='center'>
                      <Text
                        cursor='pointer'
                        fontSize='14px'
                        color='#068754'
                        textDecoration='underline'
                      >
                        <a href='https://smartswap.rigelprotocol.com'>
                          {t('buy_rgp')}
                        </a>
                      </Text>
                    </Flex>
                  ) : null}

                  <Text
                    color={finalTextColor}
                    fontWeight={"500"}
                    fontSize={"12px"}
                    mt={6}
                  >
                    {t('time_frame')}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {orderInfo?.type === "sell" && (
        <FeeInfoModal
          loading={loading}
          amountToReceive={formatDecimalNumber(amountToReceive)}
          fee={(
            (parseFloat(fee) / 100) *
            parseFloat(formatDecimalNumber(amountToReceive))
          ).toString()}
          asset={orderInfo?.asset}
          isOpen={infoModal}
          onClose={() => setinfoModal(false)}
          startTransaction={() => startTransaction()}
        />
      )}
      <ApproveModal
        approveToken={approveToken}
        amountToPay={amountToPay}
        asset={orderInfo?.asset}
        onClose={() => setonOpen(false)}
        isOpen={onOpen}
      />
    </>
  );
};

export default BuyModal;
