import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
   
  Text,
  useColorModeValue, 
  useMediaQuery,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { STARTTRANSACTION } from "../../../Buy/gql/mutation";
import { useMutation } from "@apollo/client";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { useMemo } from "react";
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
import { InfoOutlineIcon } from "@chakra-ui/icons";
import ApproveModal from "../../../../components/Modals/Sell/ApproveModal";
import { getTokenIcon } from "../../../../utils/functions/util";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../state/hooks";
import { RootState } from "../../../../state/store";

type ILockToken = {
  orderInfo: {
    asset: string;
    auto_reply: string;
    createdAt: string;
    crypto_amount: number;
    limit_max: number;
    limit_min: number;
    price: number;
    fiat: string;
    token_address?: string;
    _id: string;
    user: { _id: string; banks: { bank_name: string }[] };
  };
  orderOwner: {
    address: string;
    fullname: string;
    banks: {
      account_name: string;
      account_number: string;
      bank_name: string;
    }[];
  };
};

const ILockToken = ({ orderInfo, orderOwner }: ILockToken) => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const tokenListTrgiggerBgColor = useColorModeValue("#666", "#ffffff");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  const borderColor = useColorModeValue("#FFF", "#324D68");
  const toolTipBgColor = useColorModeValue("#FFFFFF", "#1A202C");
  const toolTipColor = useColorModeValue("#333333", "#ffffff");
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [amountToPay, setAmountToPay] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");
  const [buttonMessage, setButtonMessage] = useState(`Sell ${orderInfo.asset}`);
  const [reload, setReload] = useState(false);
  const [rgpReload, setRgpReload] = useState(false);
  const { fee } = useOrderFee(
    orderInfo?.asset ?? "",
    orderInfo?.token_address ?? ""
  );
  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );

  const { chainId, library, account } = useActiveWeb3React();
  const [onOpen, setonOpen] = useState(false);

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
  const { t } = useTranslation()

  const { balance: rgpBalance } = useBalances(RGPADDRESSES[chainId as number]);

  const [startTransaction, { data, loading, error }] = useMutation(
    STARTTRANSACTION,
    {
      variables: {
        transaction: {
          amount: parseFloat(amountToPay),
          id: orderInfo._id,
          chainId: chainId,
          isDemo: isDemoAccount
        },
      },
    }
  );

  const fiat = orderInfo?.fiat ?? "NGN";

  const priceObject: any = {
    Price:
      orderInfo?.price && orderInfo?.asset
        ? `1 ${orderInfo?.asset} = ${orderInfo?.price.toLocaleString()}`
        : "500.00",
    Available:
      orderInfo?.crypto_amount && orderInfo?.asset
        ? `${orderInfo?.crypto_amount} ${orderInfo?.asset}`
        : "300.76",
    Limits:
      orderInfo.limit_min && orderInfo.limit_max && orderInfo.fiat
        ? [
            `${orderInfo.limit_min.toLocaleString()} ${orderInfo?.fiat}`,
            `${orderInfo.limit_max.toLocaleString()} ${orderInfo?.fiat}`,
          ]
        : [100, 300],
    "Payment Method": "Bank Transfer",
    "Transaction Fee": fee ? `${fee} RGP` : "2.0 RGP",

    Token: orderInfo.asset ?? "USDT",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sellerInformation = {
    username: "GabrielS",
    badge: "G",
    img: "",
    orderCompleted: 45,
    orderPercentage: 34.6,
    status: "offline",
  };

  useMemo(() => {
    if (amountToPay) {
      if (orderOwner?.address === account) {
        setButtonMessage("You can't fulfill your order");
      } else if (
        orderInfo?.asset !== "RGP" &&
        parseFloat(fee) > parseFloat(rgpBalance)
      ) {
        setButtonMessage("Insufficient RGP Balance for Fee");
      } else if (
        orderInfo?.asset !== "RGP" &&
        parseFloat(fee) >
          parseFloat(
            RGPTokenAllowance
              ? ethers.utils.formatEther(RGPTokenAllowance)
              : "10"
          )
      ) {
        setButtonMessage("Approve RGP For Fee");
      } else if (parseFloat(amountToPay) > orderInfo?.crypto_amount) {
        setButtonMessage(`Sell ${priceObject?.Token}`);
      } else if (
        orderInfo?.asset === "RGP" &&
        parseFloat(fee) > parseFloat(balance)
      ) {
        setButtonMessage("Insufficient Balance");
      } else if (
        parseFloat(amountToPay) > parseFloat(balance ? balance : "10")
      ) {
        setButtonMessage("Insufficient Balance");
      } else if (
        parseFloat(amountToPay) >
        parseFloat(
          tokenAllowance ? ethers.utils.formatEther(tokenAllowance) : "10"
        )
      ) {
        setButtonMessage(`Approve ${orderInfo?.asset}`);
      } else if (parseFloat(amountToPay) > priceObject?.Available) {
        setButtonMessage("Check Available Tokens on Order");
      } else {
        setButtonMessage(`Sell ${priceObject?.Token}`);
      }
    } else {
      setButtonMessage(`Sell ${priceObject?.Token}`);
    }
  }, [amountToPay, tokenAllowance, RGPTokenAllowance]);

  useMemo(() => {
    if (amountToPay) {
      if (orderInfo?.asset === "RGP") {
        if (
          parseFloat(amountToPay) > parseFloat(balance) ||
          parseFloat(fee) > parseFloat(balance)
        ) {
          dispatch(
            addToast({
              message:
                "Insufficient RGP Balance, You can buy more RGP from Smartswap",
              error: true,
            })
          );
        } else if (parseFloat(amountToPay) > orderInfo?.crypto_amount) {
          dispatch(
            addToast({
              message: `Insufficient ${orderInfo?.asset} available to complete order`,
              error: true,
            })
          );
        }
      } else if (parseFloat(fee) > parseFloat(rgpBalance)) {
        dispatch(
          addToast({
            message:
              "Insufficient RGP Balance to complete this transaction, You can buy more RGP from Smartswap",
            error: true,
          })
        );
      } else if (parseFloat(amountToPay) > parseFloat(balance)) {
        dispatch(
          addToast({
            message: `Insufficient ${orderInfo?.asset} Balance`,
            error: true,
          })
        );
      } else if (parseFloat(amountToPay) > orderInfo?.crypto_amount) {
        dispatch(
          addToast({
            message: `Insufficient ${orderInfo?.asset} available to complete order`,
            error: true,
          })
        );
      }
    }
  }, [amountToPay]);

  useMemo(() => {
    if (data?.startTransaction.status === true) {
      dispatch(addToast({ message: "Transaction Successful", error: false }));

      navigate(`/buy/order/trade/${data?.startTransaction.transaction._id}`);
    } else if (data?.startTransaction.status === false) {
      dispatch(
        addToast({ message: data?.startTransaction.message, error: true })
      );
    }
  }, [data]);

  const approveToken = async (
    amountToApproveBy: number,
    tokenAddress: string,
    assetSymbol: string
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

  const handleLockToken = async () => {
    if (buttonMessage === `Approve ${orderInfo?.asset}`) {
      await approveToken(5, orderInfo?.token_address, orderInfo?.asset);
    } else if (buttonMessage === "Approve RGP For Fee") {
      await approveToken(5, RGPADDRESSES[chainId as number], "RGP");
    } else {
      if (parseFloat(amountToReceive) < orderInfo?.limit_min) {
        dispatch(
          addToast({
            message: `Amount to recieve is below minimum trade limit of ${orderInfo?.limit_min} ${orderInfo?.fiat}`,
            error: true,
          })
        );
        return;
      }

      if (parseFloat(amountToReceive) > orderInfo?.limit_max) {
        dispatch(
          addToast({
            message: `${t('bottom_err')} ${orderInfo?.limit_max} ${orderInfo?.fiat}`,
            error: true,
          })
        );
        return;
      }
      startTransaction();
    }
  };

  return (
    <Grid templateColumns={isMobileDevice ? "repeat(1,1fr)" : "repeat(2,1fr)"}>
      <GridItem background={backgroundColor} p='40px'>
        <Box my={4}>
          <Box>
            {Object.keys(priceObject).map((item, index: number) => {
              return (
                <Flex
                  justifyContent='space-between'
                  my={3}
                  fontSize='12px'
                  key={index}
                >
                  <Box color={tokenListTrgiggerBgColor}>{item}</Box>
                  <Flex
                    color={item === "Price" ? "#CC334F" : textColour}
                    fontWeight='500'
                  >
                    {item === "Token" && (
                      <Image
                        mx={2}
                        height={5}
                        width={4}
                        src={getTokenIcon(priceObject["Token"])}
                      />
                    )}
                    {typeof priceObject[item as keyof typeof priceObject] !==
                    "object"
                      ? priceObject[item as keyof typeof priceObject]
                      : priceObject[item as keyof typeof priceObject].join(
                          " - "
                        )}{" "}
                    {item === "Price" && fiat}
                  </Flex>
                </Flex>
              );
            })}
          </Box>
        </Box>
      </GridItem>
      <GridItem background={borderColor} p='40px'>
        <Box>
          <Text fontSize='14px' color={textColour} mb={2}>
            I want to pay {orderInfo?.asset}{" "}
            <Tooltip
              hasArrow
              label={`Input amount of ${orderInfo?.asset} you want to sell `}
              placement='top-end'
              bgColor={toolTipBgColor}
              color={toolTipColor}
            >
              <InfoOutlineIcon ml={1} mb={1} />
            </Tooltip>
          </Text>

          <InputGroup size='sm' width='100%'>
            <Input
              // placeholder={priceObject["Limits"].join(" - ")}
              height='40px'
              value={amountToPay}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setAmountToPay(e.target.value);

                  setAmountToReceive(
                    e.target.value !== ""
                      ? (
                          parseFloat(e.target.value) * orderInfo?.price
                        ).toString()
                      : ""
                  );
                }
              }}
            />
            <InputRightAddon
              children={priceObject?.Token}
              height='40px'
              color={tokenListTrgiggerBgColor}
            />
          </InputGroup>
        </Box>
        <Box my={9}>
          <Text fontSize='14px' color={textColour} mb={2}>
            I will recieve {orderInfo?.fiat}
            <Tooltip
              hasArrow
              label={`Input amount of ${orderInfo?.fiat} you want to receive from selling ${orderInfo?.asset} `}
              placement='top-end'
              bgColor={toolTipBgColor}
              color={toolTipColor}
            >
              <InfoOutlineIcon ml={1} mb={1} />
            </Tooltip>
          </Text>

          <InputGroup size='sm' width='100%'>
            <Input
              // disabled
              // placeholder={priceObject["Limits"].join(" - ")}
              height='40px'
              value={amountToReceive}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setAmountToReceive(e.target.value);
                  setAmountToPay(
                    e.target.value !== ""
                      ? (
                          parseFloat(e.target.value) / orderInfo?.price
                        ).toString()
                      : ""
                  );
                }
              }}
            />
            <InputRightAddon
              children={orderInfo?.fiat}
              height='40px'
              color={tokenListTrgiggerBgColor}
            />
          </InputGroup>
        </Box>
        <Flex justifyContent='space-between'>
          <Button
            w='100%'
            display={
              parseFloat(
                ethers.utils.formatEther(tokenAllowance ? tokenAllowance : "0")
              ) > 0 &&
              parseFloat(balance ?? "0") > parseFloat(amountToPay) &&
              parseFloat(amountToPay) >
                parseFloat(ethers.utils.formatEther(tokenAllowance ?? "0")) &&
              parseFloat(amountToPay) <= orderInfo?.crypto_amount &&
              orderInfo?.asset !== "RGP"
                ? "none"
                : undefined
            }
            borderRadius='6px'
            background='#CC334F'
            color='white'
            p='9px 45px'
            _hover={{
              background: "#CC334F",
            }}
            disabled={
              !amountToReceive ||
              !amountToPay ||
              loading ||
              (orderInfo?.asset === "RGP" &&
                parseFloat(fee) > parseFloat(balance)) ||
              parseFloat(amountToPay) > priceObject.Available ||
              parseFloat(amountToPay) > parseFloat(balance ? balance : "1") ||
              orderOwner.address === account ||
              (orderInfo?.asset !== "RGP" &&
                parseFloat(fee) > parseFloat(rgpBalance)) ||
              parseFloat(amountToPay) > orderInfo?.crypto_amount
            }
            onClick={() => handleLockToken()}
          >
            {loading ? <Spinner /> : buttonMessage}
          </Button>
        </Flex>
        {parseFloat(
          ethers.utils.formatEther(tokenAllowance ? tokenAllowance : "0")
        ) > 0 &&
          parseFloat(balance ?? "0") > parseFloat(amountToPay) &&
          parseFloat(amountToPay) >
            parseFloat(ethers.utils.formatEther(tokenAllowance ?? "0")) &&
          parseFloat(amountToPay) <= orderInfo?.crypto_amount &&
          orderInfo?.asset !== "RGP" && (
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
                  Approve {orderInfo?.asset}
                </Button>
              </Flex>
            </>
          )}

        {orderInfo?.asset !== "RGP" &&
        amountToPay &&
        parseFloat(fee) > parseFloat(rgpBalance) ? (
          <Flex mt={2} justifyContent='center'>
            <Text color='#068754' fontSize='14px' textDecoration='underline'>
              <a href='https://smartswap.rigelprotocol.com'>
                Buy RGP from Smartswap
              </a>
            </Text>
          </Flex>
        ) : orderInfo?.asset === "RGP" &&
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
                Buy RGP from Smartswap
              </a>
            </Text>
          </Flex>
        ) : null}
      </GridItem>
      <ApproveModal
        approveToken={approveToken}
        amountToPay={amountToPay}
        asset={orderInfo?.asset}
        onClose={() => setonOpen(false)}
        isOpen={onOpen}
      /> 
    </Grid>
  );
};

export default ILockToken;
