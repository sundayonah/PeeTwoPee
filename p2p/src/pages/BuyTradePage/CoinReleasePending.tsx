import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useMediaQuery,
  Spinner,
} from "@chakra-ui/react";
import InformationTag from "../../components/InformationTag";
import { useActiveWeb3React } from "../../utils/hooks";
import { refetchOrders, transactionData } from "../../state/order";
import { PAYMENTCOMPLETE } from "../Buy/gql/mutation";
import { GFailedEvent, GReleasedToken } from "../../utils/GAnalytics/gTrade";
import { useMutation } from "@apollo/client";
import { useMemo, useEffect, useState } from "react";
import { addToast } from "../../components/Toast/toastSlice";
import { useDispatch } from "react-redux";
import { ITradeInfo } from "../../utils/hooks/useOrder";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";

type IPayment = {
  startDispute: () => void;
  disableDisputeButton: boolean;
  tradeInfo: ITradeInfo;
  setTransactionState: React.Dispatch<React.SetStateAction<transactionData>>;
  orderId: string;
  sendMessageToDatabase: (type: string, text: string) => void;
  isSecondDisputePerson: boolean;
  startDisputeAppeal: () => void;
};

export default function CoinReleasePending({
  startDispute,
  disableDisputeButton,
  tradeInfo,
  sendMessageToDatabase,
  setTransactionState,
  orderId,
  isSecondDisputePerson,
  startDisputeAppeal,
}: IPayment) {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#333333", "#fff");
  const warningColor = useColorModeValue("#FEF8E7", "#213345");
  const waitColor = useColorModeValue("#F2F5F8", "#213345");
  const disabledBgColor = useColorModeValue("#A7D6FB", "#4A739B");
  const [errors,setError] = useState('')
  const { account, chainId } = useActiveWeb3React();
  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );

  const dispatch = useDispatch();
  const {t} = useTranslation()

  const [paymentComplete, { data, loading, error }] = useMutation(
    PAYMENTCOMPLETE,
    {
      variables: {
        transaction: {
          id: tradeInfo?._id,
          chainId: chainId,
          isDemo: isDemoAccount
        },
      },
    }
  );



  const handleReleaseCrypto = () => {
    paymentComplete();
    // setTransactionState(3);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if(tradeInfo?._id && isDemoAccount && tradeInfo?.tradeRequestAccepted && tradeInfo?.tradeRequestSent && tradeInfo.order_type == "sell" && tradeInfo.to == account) {
        paymentComplete()
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [tradeInfo?._id , isDemoAccount, tradeInfo?.tradeRequestAccepted, tradeInfo?.tradeRequestSent ]);
  

  useMemo(() => {
    if (data?.paymentComplete.status === true) {
      dispatch(
        addToast({ message: "Coin Released Successfully", error: false })
      );
      GReleasedToken(tradeInfo.asset,tradeInfo.fiat, tradeInfo.crypto_amount,tradeInfo._id,chainId)
      sendMessageToDatabase("releasedCoin", `The seller has released ${tradeInfo.crypto_amount} ${tradeInfo.asset} to your wallet`);
      dispatch(refetchOrders());
      setTransactionState(3);
    } else if (data?.paymentComplete.status === false) {
      dispatch(
        addToast({ message: data?.paymentComplete.message, error: true })
      );
      setError(data?.paymentComplete.message)
      GFailedEvent("releaseCoin","Release coin failed",tradeInfo._id,chainId,tradeInfo.asset)
    }
  }, [data]);

  return (
    <Box minWidth='100%'>
      <Flex my={3}>
        {!isMobileDevice && <InformationTag />}
        <Box ml={[0, 0, 4]} mt={-1} fontSize='14px'>
          <Text color={textColor} fontSize='16px' fontWeight='500'>
            {t('release_pending')}. <InfoOutlineIcon ml={2} />
          </Text>
          <Box
            background={waitColor}
            padding={4}
            borderRadius='4px'
            minWidth='100%'
            my={5}
          >
            <Text color={textColor}>
              {account === tradeInfo?.from
                ? t('paid')
                : t('wait')}
            </Text>
          </Box>
          {account === tradeInfo?.from ? (
            <Box>
 <Flex my={3}>
              <Box my={6}>
                <Button
                  height='48px'
                  variant={"brand"}
                  onClick={() => handleReleaseCrypto()}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : t('pay_rec')}
                </Button>
              </Box>
            </Flex>
            {/* <Flex
                mt={4}
                border={"1px"}
                borderColor="#D9AA0F"
                borderRadius={"4px"}
                p={4}
                flexDirection={"column"}
                color="#D9AA0F"
              >
                <InfoOutlineIcon color='#D9AA0F' mb={2} />
                <Text fontSize={"14px"} >
                Please be careful to make sure that you verify the payment before sending the crypto to the buyer as it might not be possible to retrieve it otherwise.    </Text>

<Text mt="10px" >If you sense any foul play, you can request the buyer cancel the transaction or wait for the trade to time out and start a dispute which would enable our moderators help solve the issue.</Text>
             
              </Flex> */}
              </Box>
           
          ) : null}
          <Flex
          mt={4}
          border={"1px"}
          borderColor="#D9AA0F"
          borderRadius={"4px"}
          p={4}
          flexDirection={"column"}
          color="#D9AA0F"
          >
          <InfoOutlineIcon color='#D9AA0F' mb={2} />
            <Text>
             {t('caution')}
            </Text>
          </Flex>
        </Box>
      </Flex>
        <Box my={6} mx={[0,0,8]}>
          {isSecondDisputePerson ? (
            <Button
              height='48px'
              bg={disabledBgColor}
              width={['100%', '100%', 'auto']}
              onClick={startDisputeAppeal}
              disabled={disableDisputeButton}
            >
              Join dispute
            </Button>
          ) : (
            <Button
              height='48px'
             bg={disabledBgColor}
              width={['100%', '100%', 'auto']}
              onClick={startDispute}
              disabled={disableDisputeButton || isDemoAccount}
            >
              {t('start_dispute')}
            </Button>
          )}
        </Box>
    </Box>
  );
}
