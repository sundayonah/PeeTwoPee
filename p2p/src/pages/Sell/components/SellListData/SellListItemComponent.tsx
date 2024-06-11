import {
  Flex,
  Box,
  useMediaQuery,
  Text,
  Button,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { IOrder } from "../../../../state/order";
import SellerInformation from "../SellerInformation";
import { useLogin } from "../../../../utils/hooks";
import { useNavigate } from "react-router-dom";

import { useActiveWeb3React } from "../../../../utils/hooks";
import { addToast } from "../../../../components/Toast/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { STARTTRANSACTION } from "../../../Buy/gql/mutation";
import { useMutation } from "@apollo/client";
import { useMemo, useState } from "react";
import NetworkModal from "../../../../components/Navbar/modals/networkModal";
import { formatDecimalNumber } from "../../../../utils/functions/util";
import { GOpenedAnAd } from "../../../../utils/GAnalytics/gTrade";
import { getNetwork } from "../../../../utils";
import { RootState } from "../../../../state/store";
import { useTranslation } from "react-i18next";

type IPageProps = {
  page: string;
  checkForConnection: (page: string) => void;
  data: IOrder;
  setOrderInfo: React.Dispatch<React.SetStateAction<IOrder>>;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SellListItemComponent({
  page,
  checkForConnection,
  data,
  setOrderInfo,
  setisOpen,
}: IPageProps) {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#666666", "#fff");
  const lightTextColor = useColorModeValue("#333333", "#aba7a7");
  const navColor = useColorModeValue("#F2F5F8", "#213345");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const { chainId, library, account } = useActiveWeb3React();
  const { t } = useTranslation()

  // 

  const { chainId: network, defaultTokenNav } = useSelector(
    (state: RootState) => state.user
  );

  const chainTouse = chainId ? chainId : network;
  const { authenticated } = useLogin(),
    [displayModal, setDisplayModal] = useState(false),
    sellerInformation = {
      username: data?.user?.username ?? "---",
      badge: data?.user?.userRankInfo
        ? data?.user?.userRankInfo[getNetwork(chainTouse)]?.rank
        : "",

      img: "",
      orderCompleted: data?.user?.completed_orders ?? 0,
      orderPercentage: data?.user?.order_completion_rate ?? "0",
      status: data?.status ?? "online",
    };

  const [startTransaction, { data: startTransactionData, loading, error }] =
    useMutation(STARTTRANSACTION, {
      variables: {
        transaction: {
          id: Number(data?._id),
          amount: data?.crypto_amount,
          chainId: chainId,
        },
      },
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useMemo(() => {
    if (startTransactionData?.startTransaction.status === true) {
      dispatch(addToast({ message: "Transaction Started", error: false }));
      navigate(
        `/buy/order/trade/${startTransactionData?.startTransaction.transaction._id}`
      );
    } else if (startTransactionData?.startTransaction.status === false) {
      dispatch(
        addToast({
          message: startTransactionData?.startTransaction.message,
          error: true,
        })
      );
    }
  }, [startTransactionData]);

  const handleBuyOrSell = async () => {
    if (data?.user?.address === account) {
      dispatch(
        addToast({
          message: "You cannot buy from yourself",
          error: true,
        })
      );
    } else if (authenticated) {
      if (page === "buy") {
        // navigate(`/buy/order/${data._id}`);
        // setOpenModal(true);
        setisOpen(true);
        setOrderInfo(data);
        GOpenedAnAd(data?.user?.username ?? "---",page,data.asset,data.fiat,data?.user?.userRankInfo
        ? data?.user?.userRankInfo[getNetwork(chainTouse)]?.rank
        : "",chainTouse)
      } else {
        setisOpen(true);
        setOrderInfo(data);
      }
    } else {
      if (!account) {
        setDisplayModal(true);
      } else {
        navigate("/app");
      }
    }
  };

  //  isMobileDevice &&
  if (isMobileDevice) {
    return (
      <div>
        <Box
          opacity={
            data?.user?.address === account || !authenticated ? "0.4" : 1
          }
          title={
            data?.user?.address === account &&
            "you cannot interact with your own trade"
          }
          my='20px'
        >
          <Box
            padding='18px 10px'
            fontSize='14px'
            color={textColor}
            border={`1px solid ${borderColor}`}
            borderRadius='6px'
          >
            <Box>
              <SellerInformation seller={sellerInformation} />
            </Box>
            <Box mt='15px'>
              <Box mb={2}>
                <Flex justifyContent='space-between'>
                  <Text>{t('price')}</Text>
                  <Flex>
                    <Text
                      fontWeight='500'
                      fontSize='20px'
                      color={lightTextColor}
                    >
                      {formatDecimalNumber(data.price)}
                    </Text>
                    <Text ml={2} mt='6px' fontSize='14px'>
                      {data.fiat}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Box mb={2}>
                <Flex justifyContent='space-between'>
                  <Text>mode</Text>
                  {/* <Text>{priceObject['Payment Method']}</Text> */}
                  <Text>{t('payment_method')}</Text>
                </Flex>
              </Box>
              <Box mb={2}>
                <Flex justifyContent='space-between'>
                  <Text>{t('available')}</Text>
                  <Text data-testid='available'>
                    {formatDecimalNumber(data.crypto_amount)} {data.asset}
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Flex justifyContent='space-between'>
                  <Text>Limit</Text>
                  <Text data-testid='limit'>
                    {data.fiat} {data?.limit_min?.toFixed(2)} - {data.fiat}{" "}
                    {data?.limit_max?.toFixed(2)}
                  </Text>
                </Flex>
              </Box>
              <Box mt={5}>
                <Flex justifyContent='flex-end' >
                  <Button
                    // disabled={!authenticated || data?.user?.address===account ? true : false}
                    background={
                      page.toLowerCase() === "buy" ? "#0CCB80" : " #FF3358"
                    }
                    _hover={   { bg:  `${page.toLowerCase() === "buy" ? '#0a6b45' : '#a31730'}`}}
                   // _hover={  bg:  page.toLowerCase() === "buy" ? '#0a6b45' : '#a31730'  }
                    color='white'
                    height='40px'
                    width='100%'
                    fontSize='14px'
                    data-testid='button'
                    onClick={() => handleBuyOrSell()}
                 
                  >
                    {data?.user?.address === account
                      ? t("your_ads")
                      : page === "buy"
                      ? `${t('buy')} ${data.asset}`
                      : `${t('sell')} ${data.asset}`}
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
        <NetworkModal
          displayNetwork={displayModal}
          setDisplayNetwork={setDisplayModal}
        />
      </div>
    );
  } else {
    return (
      <>
        <Box>
          <Box
            opacity={
              data?.user?.address === account || !authenticated ? "0.4" : 1
            }
            title={
              data?.user?.address === account &&
              t('user_trade_txt')
            }
          >
            <Grid
              templateColumns='repeat(5, 1fr)'
              gap={4}
              padding='18px 10px'
              fontSize='14px'
              color={textColor}
              borderBottom={`1px solid ${borderColor}`}
            >
              <GridItem>
                <SellerInformation seller={sellerInformation} />
              </GridItem>
              <GridItem>
                <Flex>
                  <Text fontWeight='500' fontSize='20px' color={lightTextColor}>
                    {formatDecimalNumber(data.price)}
                  </Text>
                  <Text ml={2} mt='6px' fontSize='14px'>
                    {data.fiat}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex justifyContent='space-between'>
                  <Text
                    color={textColor}
                    fontWeight='400'
                    fontSize='12px'
                    mt='4px'
                  >
                    {t('available')}
                  </Text>
                  <Text
                    color={lightTextColor}
                    fontWeight='400'
                    fontSize='14px'
                    data-testid='available'
                  >
                    {formatDecimalNumber(data.crypto_amount)} {data.asset}
                  </Text>
                </Flex>
                <Flex justifyContent='space-between'>
                  <Text
                    color={textColor}
                    fontWeight='400'
                    fontSize='12px'
                    mt='2px'
                  >
                    {t('limit')}
                  </Text>
                  <Text
                    color={lightTextColor}
                    fontWeight='400'
                    fontSize='14px'
                    data-testid='limit'
                  >
                    {" "}
                    {data.fiat} {data.limit_min?.toFixed(2)} - {data.fiat}{" "}
                    {data.limit_max?.toFixed(2)}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem fontSize='12px' fontWeight='400' color={textColor}>
                <Flex justifyContent='center'>
                  <Box
                    background={navColor}
                    px='10px'
                    fontSize='12px'
                    height='20px'
                    borderRadius='4px'
                  >
                    {data?.payment_method==="BANK TRANSFER" ? t("bank_transfer") : data?.payment_method}
                  </Box>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex justifyContent='flex-end' className="BuyTkn" >
                  <Button
                    // disabled={!authenticated || data?.user?.address===account ? true : false}
                    background={
                      page.toLowerCase() === "buy" ? "#0CCB80" : " #FF3358"
                    }
                    _hover={   { bg:  `${page.toLowerCase() === "buy" ? '#0a6b45' : '#a31730'}`}}
                  
                    color='white'
                    height='40px'
                    width='148px'
                    fontSize='14px'
                    data-testid='button'
                    onClick={() => handleBuyOrSell()}
                  >
                    {data?.user?.address === account
                      ? t("your_ads")
                      : page === "buy"
                      ? `${t('buy')} ${data.asset}`
                      : `${t('sell')} ${data.asset}`}
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Box>

          <NetworkModal
            displayNetwork={displayModal}
            setDisplayNetwork={setDisplayModal}
          />
        </Box>
        {/* <SellModal
          orderInfo={data}
          onClose={() => setOpenModal(false)}
          isOpen={openModal}
        /> */}
      </>
    );
  }
}
