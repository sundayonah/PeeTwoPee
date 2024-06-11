import { CopyIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useMediaQuery,
  useClipboard,
  Spinner,
} from "@chakra-ui/react";
import InformationTag from "../../components/InformationTag";
import { transactionData } from "../../state/order";
import { useActiveWeb3React } from "../../utils/hooks";
import { CONTRACT_ADDRESSES, RGPADDRESSES } from "../../utils/addresses";
import { RigelDecentralizedP2PSystemContract } from "../../utils/Contracts";
import { FETCH_USER_BY_ADDRESS } from "../Home/gql/mutations";
import {
  GFailedEvent,
  GLockedTokens,
  GSentMoney,
  GUnlockTokens,
} from "../../utils/GAnalytics/gTrade";
import { useQuery, useMutation } from "@apollo/client";
import { ethers } from "ethers";
import p2pAbi from "../../utils/abis/p2p.json";
// import abiDecoder from "abi-decoder";
import decode from "../../utils/functions/decode";
import {
  UPDATE_TRANSACTION_PRODUCT_ID,
  BUYER_PAID_UPDATE,
  PROCESS_TRADE_REQUEST,
} from "../Buy/gql/mutation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../components/Toast/toastSlice";
import { setOpenModal, TrxState } from "../../state/application";
import { ITradeInfo, useOrderFee } from "../../utils/hooks/useOrder";
import Timer from "../BuyTradePage/components/Timer";
import { useAllowance } from "../../utils/hooks/useAllowance";
import { getERC20Token } from "../../utils/utilsFunctions";
import { formatDecimalNumber } from "../../utils/functions/util";
import { useTranslation } from "react-i18next";
import { RootState } from "../../state/store";
import { useAppSelector } from "../../state/hooks";
import { ParseFloat } from "../../utils";

type IPayment = {
  bankDetails: Object;
  sendMessageToDatabase: (type: string, text: string) => void;
  cancelOrder: () => void;
  orderId: string;
  setTransactionState: React.Dispatch<React.SetStateAction<transactionData>>;
  tradeInfo: ITradeInfo;
  settransactionTimeElapsed: React.Dispatch<React.SetStateAction<boolean>>;
  transactionTimeElapsed: boolean;
  cancelTransaction: any;
  setopenSetTimeNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

type PayData = {
  item: string;
  key: any;
  children: JSX.Element;
};
//bankDetails[item as keyof typeof bankDetails]
function PaymentData({ item, children, key }: PayData) {
  const lightColor = useColorModeValue("#666666", "#DCE5EF");
  const textColor = useColorModeValue("#333333", "#fff");
 
  const {t} = useTranslation()
  const { hasCopied, onCopy } = useClipboard(children.props.children);

  return (
    <Flex justifyContent='space-between' my={3} fontSize='14px' key={key}>
      <Box color={lightColor}>{t(item)}</Box>
      <Spacer />

      <Tooltip
        hasArrow
        label={hasCopied ? "Copied!" : "Copy"}
        bg='gray.300'
        color='black'
      >
        <Box color={textColor} fontWeight='500'>
          {children} <CopyIcon onClick={onCopy} cursor='pointer' />
        </Box>
      </Tooltip>
    </Flex>
  );
}

export default function PaymentInfo({
  bankDetails,
  sendMessageToDatabase,
  cancelOrder,

  tradeInfo,
  setTransactionState,
  settransactionTimeElapsed,
  transactionTimeElapsed,
  cancelTransaction,
  setopenSetTimeNotification,
}: IPayment) {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#333333", "#fff");
  const lightColor = useColorModeValue("#666666", "#DCE5EF");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const warningBgColor = useColorModeValue("#FEF8E7", "transparent");
  const warningTextColor = useColorModeValue("#333333", "#FFCC24");
  const warningBorderColor = useColorModeValue("#ffffff", "#FFCC24");

  const secondwarningBgColor = useColorModeValue("transparent", "transparent");
  const secondwarningTextColor = useColorModeValue("#CC334F", "#CC334F");
  const secondwarningBorderColor = useColorModeValue("#CC334F", "#CC334F");
  const { account, library, chainId } = useActiveWeb3React();
  const [Loading, setLoading] = useState(false);
  const [transactionTime, settransactionTime] = useState("");
  const [reload, setReload] = useState(false);
  const [rgpReload, setRgpReload] = useState(false);
  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );

  const { fee } = useOrderFee(
    tradeInfo?.asset ?? "",
    tradeInfo?.token_address ?? "",
    tradeInfo?.order_type
  );

  const { tokenAllowance: assetAllowance } = useAllowance(
    tradeInfo?.token_address,
    tradeInfo?._id,
    CONTRACT_ADDRESSES[chainId as number]["P2P"],
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

 
  const { loading, data, error } = useQuery(FETCH_USER_BY_ADDRESS, {
    variables: {
      address: account,
    },
  });

  const [
    updateTransactionProductId,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_TRANSACTION_PRODUCT_ID);

  const [processTradeRequest, { loading: tradeRequestLoading , error :  tError}, ] = useMutation(
    PROCESS_TRADE_REQUEST,
    {
      variables: {
        chainId: chainId,
        requestType: "accepted",
        transaction_id: tradeInfo?._id,
      },
    }
  );

  const [updateTransactionBuyerPaid, { data: buyerPaidData }] =
    useMutation(BUYER_PAID_UPDATE);
const { t } = useTranslation()
  const dispatch = useDispatch();

  useEffect(() => {
    if (tradeInfo?.status === "completed") {
      setTransactionState(3);
    } else {
      if (tradeInfo?.buyer_paid === true && tradeInfo?.productId !== null) {
        setTransactionState(2);
      }
    }
  }, [account, tradeInfo]);

  useEffect(() => {
    if (
      account === tradeInfo?.from &&
      tradeInfo?.order_type === "sell" &&
      !tradeInfo?.tradeRequestAccepted
    ) {
      processTradeRequest();
    }
  }, [account, tradeInfo?.from]);

  // useEffect(() => {
  //   if (tradeInfo?.status === "cancelled") {
  //     settransactionTimeElapsed(true);
  //   }
  // }, [tradeInfo?.status]);

  useMemo(() => {
    if (updateData?.updateTransactionProductId.status === true) {
      dispatch(
        addToast({ message: "Token Locked Successfully", error: false })
      );

      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionSuccessful,
        })
      );
      // setTransactionState(2);
    } else if (updateData?.updateTransactionProductId.status === false) {
      dispatch(
        addToast({
          message: updateData?.updateTransactionProductId.message,
          error: true,
        })
      );
    }
  }, [updateData]);

  useMemo(() => {
    if (buyerPaidData?.updateTransactionBuyerPaid.status === true) {
      setTransactionState(2);
    } else if (buyerPaidData?.updateTransactionBuyerPaid.status === false) {
      dispatch(
        addToast({
          message: buyerPaidData?.updateTransactionBuyerPaid.message,
          error: true,
        })
      );
    }
  }, [buyerPaidData]);

  const buyerCancelTx = async () => {
    try {
      dispatch(
        setOpenModal({
          message: t('wallet_req'),
          trxState: TrxState.WaitingForConfirmation,
        })
      );

      const p2pInstance = await RigelDecentralizedP2PSystemContract(
        CONTRACT_ADDRESSES[chainId as number]["P2P"],
        library
      );

      const cancelTx = await p2pInstance.buyerRevertTradeStatus(
        tradeInfo?.productId
      );

      const { confirmations } = await cancelTx.wait();

      if (confirmations >= 1) {
        cancelTransaction();
        dispatch(
          setOpenModal({
            message: ``,
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

  const buyerPaymentComplete = async () => {
    if(isDemoAccount){
      try {
          updateTransactionBuyerPaid({
            variables: {
              chainId: chainId,
              productId: tradeInfo?.productId,
              transaction_id: tradeInfo?._id,
              isDemo: isDemoAccount
            },
          });

          sendMessageToDatabase(
            "paymentMade",
            "The buyer has marked the payment complete"
          );
      } catch (error) { 
        dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
      }

      
    }
    else{
      try {
        dispatch(
          setOpenModal({
            message: t('wallet_req'),
            trxState: TrxState.WaitingForConfirmation,
          })
        );
  
        const p2pInstance = await RigelDecentralizedP2PSystemContract(
          CONTRACT_ADDRESSES[chainId as number]["P2P"],
          library
        );
  
        const paymentCompleteTx = await p2pInstance.buyerConfirmTradeStatus(
          tradeInfo?.productId
        );
  
        const { confirmations } = await paymentCompleteTx.wait();
  
        if (confirmations >= 1 || isDemoAccount) {
          dispatch(
            setOpenModal({
              message: ``,
              trxState: TrxState.TransactionSuccessful,
            })
          );
  
          sendMessageToDatabase(
            "paymentMade",
            t('buyer_marked')
          );
          updateTransactionBuyerPaid({
            variables: {
              chainId: chainId,
              productId: tradeInfo?.productId,
              transaction_id: tradeInfo?._id,
              isDemo :isDemoAccount
            },
          });
        }
        GSentMoney(tradeInfo?._id,tradeInfo?.asset,tradeInfo?.crypto_amount,chainId)
      } catch (err) {
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionFailed,
          })
        );
        GFailedEvent(`payment completed failed`,tradeInfo?.asset,tradeInfo?._id,chainId)
      }
  };
}

  function generateNumber() {
    const randomNum = Math.floor(Math.random() * (100000 - 4002)) + 4002; // Generate a random number between 4002 and 100000
    return randomNum // Convert the number to a string and return it
  }


 
  useEffect(() => {
    //
    if (
      tradeInfo?.to == account &&
      tradeInfo?.order_type == "sell"  &&
      tradeInfo?.tradeRequestSent &&
      !tradeInfo.tradeRequestAccepted &&
      isDemoAccount
    ) {
      processTradeRequest();

      updateTransactionProductId({
        variables: {
          chainId: chainId,
          productId: generateNumber(),
          transaction_id: tradeInfo?._id,
        },
      });
      sendMessageToDatabase(
        "lockedToken",
        `${tradeInfo?.crypto_amount} ${tradeInfo?.asset} has been locked in the smart contract.`
      );

      
    }
  }, [isDemoAccount]);
  


  useEffect(() => {
    if (
      tradeInfo?.from === account &&
      tradeInfo?.order_type === "buy" &&
      tradeInfo?.tradeRequestSent &&
      !tradeInfo.tradeRequestAccepted &&
      isDemoAccount
    ) {
      const timer = setTimeout(() => {
          processTradeRequest();
      }, 4000);
  
      return () => clearTimeout(timer);
    }
  }, [isDemoAccount, account, tradeInfo?.from]);
  
  const handleUnlockToken = async () => {
    try {
      dispatch(
        setOpenModal({
          message: t('wallet_req'),
          trxState: TrxState.WaitingForConfirmation,
        })
      );

      const p2pInstance = await RigelDecentralizedP2PSystemContract(
        CONTRACT_ADDRESSES[chainId as number]["P2P"],
        library
      );

      const cancelTx = await p2pInstance.sellerRevertTrade(
        tradeInfo?.productId
      );

      const { confirmations } = await cancelTx.wait();

      if (confirmations >= 1) {
        cancelTransaction();
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionSuccessful,
          })
        );
        GUnlockTokens(
          "Unlocking token success",
          tradeInfo?.asset,
          tradeInfo?.crypto_amount,
          chainId
        );
      }
    } catch (err) {
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
      GFailedEvent(
        "unlocking token",
        `unlocking token failed ${tradeInfo?.crypto_amount} ${tradeInfo?.asset}`,
        tradeInfo?._id,
        chainId
      );
    }
  };

  const approveToken = async (
    amountToApproveBy: number,
    tokenAddress: string,
    assetSymbol: string,
    amountToPay: string
  ) => {
    try {
      dispatch(
        setOpenModal({
          message: t('wallet_req'),
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
        setReload(!reload);
        setRgpReload(!rgpReload);
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
const handleCompleteDemo = async () => {
    sendMessageToDatabase(
      "lockedToken",
      `${tradeInfo?.crypto_amount} ${tradeInfo?.asset} has been locked in the smart contract.`
    );
    //const ID: string = decode(p2pAbi, transactionReceipt);
    updateTransactionProductId({
      variables: {
        chainId: chainId,
        productId: generateNumber(),
        transaction_id: tradeInfo?._id,
      },
    });
   
}
useEffect(() => {
  const handleBuyerPaymentComplete = async () => {
    await buyerPaymentComplete();

  };

  if (isDemoAccount && tradeInfo?.productId && tradeInfo?.from === account && tradeInfo.order_type === 'buy') {
    handleBuyerPaymentComplete();
  }
}, [tradeInfo?.productId]);



  const handleComplete = async () => {
    if (account === tradeInfo?.from) {
      try {
        if (
          parseFloat(ethers.utils.formatEther(RGPTokenAllowance)) <
          parseFloat(fee)
        ) {
          await approveToken(2, RGPADDRESSES[chainId as number], "RGP", fee);
        } else if (
          parseFloat(ethers.utils.formatEther(assetAllowance)) <
          tradeInfo?.crypto_amount
        ) {
          await approveToken(
            5,
            tradeInfo?.token_address,
            tradeInfo?.asset,
            tradeInfo.crypto_amount.toString()
          );
        } else {
          dispatch(
            setOpenModal({
              message: t('wallet_req'),
              trxState: TrxState.WaitingForConfirmation,
            })
          );
          const assetAddress = tradeInfo?.token_address;
          const amount = tradeInfo?.crypto_amount.toString();
          const fromAddress = account;
          const toAddress = tradeInfo?.to;
          const referralAddress = data?.userByAddress.user.referral
            ? data?.userByAddress.user.referral
            : "0x0000000000000000000000000000000000000000";


          const p2pInstance = await RigelDecentralizedP2PSystemContract(
            CONTRACT_ADDRESSES[chainId as number]["P2P"],
            library
          );
          const lockTokenTx = await p2pInstance.makeSellOrder(
            assetAddress,
            ethers.utils
              .parseUnits(formatDecimalNumber(amount), "5")
              .toString(),
            // "833000",
            fromAddress,
            toAddress,
            referralAddress,

            {
              from: account,
            }
          );

          const transactionReceipt = await lockTokenTx.wait(1);

          if (transactionReceipt.confirmations >= 1) {
            sendMessageToDatabase(
              "lockedToken",
              `${tradeInfo?.crypto_amount} ${tradeInfo?.asset} ${t('lock')}`
            );
            const ID: string = decode(p2pAbi, transactionReceipt);
            updateTransactionProductId({
              variables: {
                chainId: chainId,
                productId: parseFloat(ID),
                transaction_id: tradeInfo?._id,
              },
            });
            GLockedTokens(
              "successfully locked token",
              tradeInfo?.asset,
              tradeInfo?.crypto_amount,
              chainId
            );
          }
        }
      } catch (err) {
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionFailed,
          })
        );
        GFailedEvent("lock token", tradeInfo?.asset, tradeInfo?._id, chainId);
      }
    } else {
      await buyerPaymentComplete();
    }
  };

  // useMemo(() => {
  //   if (tradeInfo?.status === "cancelled") {
  //     settransactionTimeElapsed(true);
  //   }
  // }, [tradeInfo?.status]);

  //TODO: Current time should not be greater than start time
  const getLockTokenTime = () => {
    if (tradeInfo?.productId !== null && tradeInfo?.tStartTime !== null) {
      const startTimeDate = new Date(parseFloat(tradeInfo?.tStartTime));

      if (startTimeDate) {
        const timeDifference = Math.abs(
          Number(new Date(startTimeDate.getTime() + 0 * 60000)) -
            Number(new Date())
        );

        setopenSetTimeNotification(false);
        const seconds = Math.floor(timeDifference / 1000);

        if (seconds < 3600) {
          const secondsDiff = 3600 - seconds;
          settransactionTime(secondsDiff?.toString());
          settransactionTimeElapsed(false);
        } else if (seconds >= 3600) {
          settransactionTimeElapsed(true);
          if (!tradeInfo?.buyer_paid) {
            settransactionTimeElapsed(true);
          }
        }
      }
      // }
    }
  };

 

  useMemo(() => {
    getLockTokenTime();
  }, [tradeInfo?.productId, tradeInfo?.tStartTime]);

  const inactiveColour = useColorModeValue("#666666", "#999999");
  return (
    <Box minWidth='100%'>
      <Flex my={3} width="100%">
        {!isMobileDevice && <InformationTag />}
        <Box ml={[0, 0, 4]} mt={-1} width="100%">
          <Text
            color={textColor}
            fontSize={["14px", "14px", "16px"]}
            fontWeight='500'
          >
           {t('order_info')}. <InfoOutlineIcon ml={2} />
          </Text>
          <Flex
            justifyContent='space-between'
            background={backgroundColor}
            border={`1px solid ${borderColor}`}
            padding={[3, 3, 6]}
            borderRadius='4px'
            minWidth='100%'
            flexGrow={1}
            maxWidth='100%'
            my={5}
            className='OrdeInfo'
          >
            <Flex
              flexDirection='column'
              justifyContent='space-between'
              mt={[2, 2, 0]}
            >
              <Text fontSize='14px' fontWeight='400' color={lightColor}>
                {account === tradeInfo.from
                  ? t('amt_to_rec')
                  : t('amount_to_pay')}
              </Text>
              <Text
                color='#0CCB80'
                fontSize={["14px", "14px", "16px"]}
                mt={[0, 0, 3]}
              >
                {tradeInfo.price * tradeInfo.crypto_amount} {tradeInfo.fiat}
              </Text>
            </Flex>
            <Flex
              flexDirection='column'
              mx={isMobileDevice ? "15px" : "70px"}
              pl={isMobileDevice ? 0 : 4}
              borderLeft={isMobileDevice ? 0 : "1px solid #DEE6ED"}
              justifyContent='space-between'
              mt={[2, 2, 0]}
            >
              <Text fontSize='14px' fontWeight='400' color={lightColor}>
                {t('price')}
              </Text>
              <Text
                fontSize={["14px", "14px", "16px"]}
                mt={[-1, -1, 3]}
                color={lightColor}
              >
                {tradeInfo.price} {tradeInfo.fiat}
              </Text>
            </Flex>
            <Flex
              flexDirection='column'
              mx={isMobileDevice ? "15px" : "70px"}
              pl={isMobileDevice ? 0 : 4}
              borderLeft={isMobileDevice ? 0 : "1px solid #DEE6ED"}
              justifyContent='space-between'
              mt={[2, 2, 0]}
            >
              <Text fontSize='14px' fontWeight='400' color={lightColor}>
                {account === tradeInfo.from ? "Pay" : "Receive"}
              </Text>
              <Text
                fontSize={["14px", "14px", "16px"]}
                mt={[1, 1, 3]}
                color={lightColor}
              >
                {formatDecimalNumber(tradeInfo.crypto_amount)} {tradeInfo.asset}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex my={3}>
        {!isMobileDevice && <InformationTag />}
        <Box ml={[0, 0, 4]} 
              className="SellerAccinfo" mt={-1} width="100%">
          <Text
            color={textColor}
            fontSize={["14px", "14px", "16px"]}
            fontWeight='500'
          >
            {tradeInfo?.from === account
              ? t('seller_acct_info')
              : t('seller_acct')}{" "}
            <InfoOutlineIcon ml={2} />
          </Text>
          <Box my={5} width="100%">
            <Flex
              justifyContent='space-between'
              borderRadius='4px'
              minWidth='100%'
              alignItems="center"
            >
              <Text
                padding='10px 28px'
                background={backgroundColor}
                color={textColor}
                fontSize={["12px", "12px", "16px"]}
              >
                1. {t('bank_transfer')}
              </Text>
            </Flex>
            {(tradeInfo?.to === account && tradeInfo?.productId === null) ||
            (transactionTimeElapsed &&
              tradeInfo?.productId !== null &&
              tradeInfo?.to === account) ? (
              <Box
               
                background={backgroundColor}
                px={8}
                py={10}
                border={`1px solid ${borderColor}`}
                borderRadius='4px'
              >
                <Text>
                  {t('seller_acct_locked')}
                </Text>
              </Box>
            ) : (
              <Box
                background={backgroundColor}
                px={[4, 4, 8]}
                py={5}
                border={`1px solid ${borderColor}`}
                borderRadius='4px'
              >
                {Object.keys(bankDetails).map((item, index: number) => {
                  return (
                    <PaymentData key={index} item={item}>
                      <>{bankDetails[item as keyof typeof bankDetails]}</>
                    </PaymentData>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
      <Flex my={3}>
        {!isMobileDevice && <InformationTag />}
        <Box ml={[0, 0, 4]} mt={-1}>
          <Text
            color={textColor}
            fontSize={["14px", "14px", "16px"]}
            fontWeight='500'
          >
            {tradeInfo.from === account
              ? t('lock_tokens')
              : t('seller_acct')}{" "}
            <InfoOutlineIcon ml={2} />
          </Text>
          {transactionTime &&
            tradeInfo?.status !== "cancelled" &&
            tradeInfo?.to === account && (
              <Flex
                mt={4}
                border={"1px"}
                borderColor={warningBorderColor}
                borderRadius={"4px"}
                bgColor={warningBgColor}
                p={4}
                flexDirection={"column"}
              >
                <InfoOutlineIcon color='#D9AA0F' mb={2} />
                <Text color={warningTextColor} fontSize={"14px"}>
                  {t('pay_info')}
                </Text>
              </Flex>
            )}

          {transactionTimeElapsed &&
            tradeInfo?.productId !== null &&
            tradeInfo?.to === account && (
              <Flex
                mt={4}
                border={"1px"}
                borderColor={secondwarningBorderColor}
                borderRadius={"4px"}
                bgColor={secondwarningBgColor}
                p={4}
                flexDirection={"column"}
              >
                <InfoOutlineIcon color='#D9AA0F' mb={2} />
                <Text color={secondwarningTextColor} fontSize={"14px"}>
                  If you did not make payment within the 60 minutes time
                  interval, avoid sending funds now. As you might lose your
                  funds.
                </Text>
              </Flex>
            )}

          {tradeInfo?.tradeRequestAccepted &&
            tradeInfo?.productId === null &&
            tradeInfo?.status !== "cancelled" &&
            tradeInfo?.from === account && (
              <Flex
                mt={4}
                border={"1px"}
                borderColor={warningBorderColor}
                borderRadius={"4px"}
                bgColor={warningBgColor}
                p={4}
                flexDirection={"column"}
              >
                <Text color={warningTextColor} fontSize={"14px"}>
                  {t('lock_tokens_text')}
                </Text>
              </Flex>
            )}
          <Flex my={6} flexDirection={["column", "column", "row"]}>
            {tradeInfo?.from === account && !tradeInfo?.tradeRequestSent ? (
              <Button
                height='48px'
                variant={"brand"}
                disabled={
                  tradeRequestLoading ||
                  (tradeInfo?.tradeRequestSent &&
                    !tradeInfo?.tradeRequestAccepted)
                }
                onClick={() => processTradeRequest()}
              >
                {tradeRequestLoading ? <Spinner /> : "Send Trade Request"}
              </Button>
            ) : tradeInfo?.to === account &&
              (tradeInfo?.order_type === "sell"
                ? !tradeInfo?.tradeRequestSent
                : !tradeInfo?.tradeRequestAccepted) ? (
              <Button
                height='48px'
                variant={"brand"}
                disabled={
                  !tradeInfo?.tradeRequestSent ||
                  tradeRequestLoading ||
                  tradeInfo?.tradeRequestAccepted
                }
                onClick={() => processTradeRequest()}
              >
                {tradeRequestLoading ? <Spinner /> : t('accept_trade')}
              </Button>
            ) : tradeInfo?.from === account &&
              tradeInfo?.tradeRequestSent &&
              tradeInfo?.productId === null ? (
              <Button
                height='48px'
                variant={"brand"}
                _hover={{ bg: "#23527D" }}
                disabled={!tradeInfo.tradeRequestAccepted}
                onClick={() =>{isDemoAccount ? handleCompleteDemo() :  handleComplete()}}
              >
                {!tradeInfo.tradeRequestAccepted
                  ? t('accept_trade_txt')
                  : parseFloat(
                      !RGPTokenAllowance
                        ? "1"
                        : ethers.utils.formatEther(RGPTokenAllowance)
                    ) <
                    (parseFloat(fee) / 100) * tradeInfo?.crypto_amount
                  ? "Approve RGP for fee"
                  : tradeInfo?.asset !== "RGP" &&
                    parseFloat(
                      !assetAllowance
                        ? "1"
                        : ethers.utils.formatEther(assetAllowance)
                    ) < tradeInfo?.crypto_amount
                  ? `Approve ${tradeInfo?.asset} to Continue`
                  : t('lock_token')}
              </Button>
            ) : tradeInfo?.to === account &&
              (tradeInfo?.order_type === "sell"
                ? tradeInfo?.tradeRequestSent
                : tradeInfo?.tradeRequestAccepted) ? (
              <Button
                height='48px'
                variant={"brand"}
                _hover={{ bg: "#23527D" }}
                disabled={
                  (account === tradeInfo?.to &&
                    tradeInfo?.productId === null) ||
                  (account === tradeInfo?.from &&
                    tradeInfo?.productId !== null) ||
                  (tradeInfo?.whoCancelled.from && tradeInfo?.whoCancelled.to)
                }
                onClick={() => handleComplete()}
              >
                {tradeInfo?.productId === null
                  ? t('waiting_for_seller')
                  :t('notify_seller')}
              </Button>
            ) : (
              <Flex alignItems={"center"}>
                <Button
                  mr={5}
                  height='48px'
                  variant={"brand"}
                  disabled={
                    tradeInfo?.whoCancelled.from ||
                    !tradeInfo?.whoCancelled.to ||
                    !transactionTimeElapsed
                  }
                  onClick={() => handleUnlockToken()}
                >
                  {transactionTimeElapsed || tradeInfo?.whoCancelled.to
                    ? t('unlock')
                    : t('unlock')}
                </Button>
                {transactionTime &&
                  !tradeInfo?.whoCancelled.to &&
                  !tradeInfo?.whoCancelled.from && (
                    <Timer
                      updateUI={() => settransactionTimeElapsed(true)}
                      secs={transactionTime}
                    />
                  )}
              </Flex>
            )}
            <Flex
              display={
                tradeInfo?.productId !== null && tradeInfo?.from === account
                  ? "none"
                  : undefined
              }
            >
              <Button
                mx={[0, 0, 6]}
                my={[3, 3, 0]}
                mr={[3, 3, 3]}
                colorScheme='red'
                height='48px'
                variant='outline'
                px='50px'
                width={["100%", "100%", "auto"]}
                onClick={
                  tradeInfo?.productId === null
                    ? cancelOrder
                    : () => buyerCancelTx()
                }
                // onClick={() => startPolling(500)}
              >
                {t('cancel')}
              </Button>
              {transactionTime &&
                tradeInfo?.status !== "cancelled" &&
                tradeInfo?.to === account && (
                  <Timer
                    updateUI={() => {
                      cancelTransaction();
                      settransactionTimeElapsed(true);
                    }}
                    secs={transactionTime}
                  />
                )}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
