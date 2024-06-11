import {
  Box,
  useColorModeValue,
  useMediaQuery,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import Joyride from "react-joyride";
import SellJumbotron from "../Sell/components/SellJumbotron";
import TokenNavbarHeader from "../Sell/components/TokenNavbarHeader";
import CurrencyInput from "../Sell/components/CurrencyInput";
import SellListData from "../Sell/components/SellListData";
import Pagination from "../../components/Pagination";
import { Footer } from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useQuery } from "@apollo/client";
import { FETCH_ORDER_RECORDS } from "../account/gql/queries";
import {
  IOrder,
  setBuyMinAmount,
  setBuyOrders,
  setBuyPageNumber,
  setBuySelectedAsset,
  setBuySelectedFiat,
} from "../../state/order";
import { useEffect, useState } from "react";
import useDebounce from "../../utils/hooks/useDebounce";
import { useActiveWeb3React } from "../../utils/hooks";
import SellSkeleton from "../../components/skeleton/SellSkeleton";
import BuyModal from "../Sell/components/TradeModals/BuyModal";
import WelcomeModal from "../../components/Onboarding/WelcomeModal";
import { buySteps } from "../../components/Onboarding/BuySteps";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../state/hooks";

export default function Index() {
  const { asset, fiat, pageNumber, amount, recordPerPage } = useSelector(
    (state: RootState) => state.order.buyOrders
  );

  const [isOpen, setisOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState<IOrder>();

  const { refetchOrders } = useSelector((state: RootState) => state.order);
  const navColor = useColorModeValue("#F2F5F8", "#213345");
  const borderColor = useColorModeValue("#DEE6ED", "#3c6b9a");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#666666", "#DCE6EF");
  const bgColor = useColorModeValue("#319EF6", "#4CAFFF");

  // const { chainId } = useSelector((state: RootState) => state.user);
  const { chainId: chainID , account} = useActiveWeb3React();

  const { chainId: network } = useSelector((state: RootState) => state.user);

  const chainId = chainID ? chainID : network;

  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );



  const dispatch = useDispatch();
  const { data, loading, error, refetch } = useQuery(FETCH_ORDER_RECORDS, {
    variables: {
      params: {
        type: "sell",
        asset,
        fiat: fiat.currency,
        page: pageNumber,
        amount,
        recordPerPage,
        chainId,
      },
    },
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const {t} = useTranslation()
  useEffect(() => {
    refetch();
  }, [refetchOrders]);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(setBuyMinAmount({ amount: parseInt(debouncedQuery) }));
    }
  }, [debouncedQuery]);
  if (data) {
    dispatch(
      setBuyOrders({
        order: data?.fetchOrderRecords?.orders,
        totalBuyOrder: data?.fetchOrderRecords?.total,
        suggestions: data?.fetchOrderRecords?.suggestions,
      })
    );
  }

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(setBuyMinAmount({ amount: parseInt(debouncedQuery) }));
    }
  }, [debouncedQuery]);
  const selectAsset = (asset: any) => {
    dispatch(setBuySelectedAsset({ asset: asset.asset }));
  };
  if (data) {
    dispatch(
      setBuyOrders({
        order: data?.fetchOrderRecords?.orders,
        totalBuyOrder: data?.fetchOrderRecords?.total,
        suggestions: data?.fetchOrderRecords?.suggestions,
      })
    );
  }

  const [welcomeModal, setWelcomeModal] = useState(false);
  const [run, setRun] = useState(false);

  function strartWelcomeRide() {
    setRun(true);
  }

  useEffect(() => {
    const visits = window.localStorage.getItem("buyTour");
    if (!visits && account) {
      setWelcomeModal(true);
      window.localStorage.setItem("buyTour", "1");
    }
  }, []);

  return (
    <>
      <Joyride
      // @ts-ignore
        steps={buySteps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        styles={{
          options: {
            arrowColor: bgColor,
            backgroundColor: bgColor,
            textColor: "#FFFFFF",
            primaryColor: bgColor,
          },
        }}
      />
      <WelcomeModal
        startToure={strartWelcomeRide}
        openModal={welcomeModal}
        closeModal={() => {
          window.localStorage.setItem("buyTour", "1");
          setWelcomeModal((state) => !state);
        }}
        textHeader={t('welcome_to_p2p_text')}
        welcomeText={t('welcome_to_p2p_sub_text')}
      />
      <Box>
        <Box minH="100vh" zIndex={1} flexWrap="wrap" overflowX="hidden">
          <SellJumbotron
            head={t('sell_jumbotron_header')}
            text={t('sell_jumbotron_text')}
          />
          <Box  width="90%" margin="0 auto">
            <TokenNavbarHeader
              selectedAsset={asset}
              setSelectedAsset={(asset) =>
                dispatch(setBuySelectedAsset({ asset }))
              }
              selectedFiat={fiat}
              setSelectedFiat={(fiat) => dispatch(setBuySelectedFiat({ fiat }))}
              onChange={(value) =>
                setSearchQuery(value === "" ? "0" : value)
              }
              totalOrder={data?.fetchOrderRecords?.total}
            />
            <CurrencyInput
              selectedFiat={fiat}
              setSelectedFiat={(fiat) => dispatch(setBuySelectedFiat({ fiat }))}
              reFetchInfo={() => refetch()}
              onChange={(value) =>
                setSearchQuery(value === "" ? "0" : value)
              }
            />
            {!isMobileDevice && (
              <Grid
                templateColumns="repeat(5, 1fr)"
                gap={4}
                background={navColor}
                padding="18px 10px"
                fontSize="14px"
                color={textColor}
                borderTop="1px solid"
                borderBottom="1px solid"
                borderTopColor={borderColor}
                borderBottomColor={borderColor}
              >
                <GridItem>{t('vendor')}</GridItem>
                <GridItem>{t('price')}</GridItem>
                <GridItem>{t('limit')} | {t('available')}</GridItem>
                <GridItem>
                  <Flex justifyContent="center">{t('payment_method')}</Flex>
                </GridItem>
                <GridItem>
                  <Flex justifyContent="center">{t('action')}</Flex>
                </GridItem>
              </Grid>
            )}

            {loading ? (
              // <Box>Loading</Box>
              <>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <SellSkeleton key={index} />
                ))}
              </>
            ) : (
              <SellListData
                setOrderInfo={setOrderInfo}
                setisOpen={setisOpen}
                page="buy"
                orders={isDemoAccount ?  data?.fetchOrderRecords?.orders.filter((items : IOrder)=>items.user.address == '0x51A01dCA9a9D79FB3f45E6e49B86c00a442513de') : data?.fetchOrderRecords?.orders.filter((items : IOrder)=>items.user.address !== '0x51A01dCA9a9D79FB3f45E6e49B86c00a442513de')}
                suggestions={data?.fetchOrderRecords?.suggestions}
                selectAsset={selectAsset}
              />
            )}
            <Pagination
              pageSize={recordPerPage}
              currentPage={pageNumber}
              siblingCount={1}
              totalCount={data?.fetchOrderRecords?.total}
              onPageChange={(page) => dispatch(setBuyPageNumber({ page }))}
            />
          </Box>
          <Footer />
        </Box>
      </Box>
      <BuyModal
        orderInfo={orderInfo}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
      />
    </>
  );
}
