import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import Joyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import SellJumbotron from "./components/SellJumbotron";
import TokenNavbarHeader from "./components/TokenNavbarHeader";
import CurrencyInput from "./components/CurrencyInput";
import SellListData from "./components/SellListData";
import {
  FETCH_ORDER_RECORDS, 
} from "../account/gql/queries";
import Pagination from "../../components/Pagination";
import { Footer } from "../../components/footer";
import { useQuery } from "@apollo/client";
import {
  setSellPageNumber,
  setSellOrders,
  setSellSelectedAsset,
  setSellSelectedFiat,
  setSellMinAmount,
  IOrder,
} from "../../state/order";
import { RootState } from "../../state/store";
import { useEffect, useState } from "react";
import useDebounce from "../../utils/hooks/useDebounce";
import { useActiveWeb3React } from "../../utils/hooks";
import SellSkeleton from "../../components/skeleton/SellSkeleton";
import BuyModal from "./components/TradeModals/BuyModal";
import { addToDefaultTokenNav } from "../../state/user";
import { SellSteps } from "../../components/Onboarding/SellSteps";
import WelcomeModal from "../../components/Onboarding/WelcomeModal";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../state/hooks";

export default function Index() {
  const dispatch = useDispatch();
  const { asset, fiat, pageNumber, amount, recordPerPage } = useSelector(
    (state: RootState) => state.order.sellOrders
  );

  const { refetchOrders } = useSelector((state: RootState) => state.order);
  // const { chainId} = useSelector(
  //   (state: RootState) => state.user
  // );
  const { chainId : chaninID, account } = useActiveWeb3React();
  const { chainId: network, } = useSelector(
    (state: RootState) => state.user
  );
  

  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );
  
  const chainId = chaninID ? chaninID : network


  const navColor = useColorModeValue("#F2F5F8", "#213345");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#666666", "#fff");
  const bgColor = useColorModeValue("#319EF6", "#4CAFFF");
  const borderColor = useColorModeValue("#DEE6ED", "#3c6b9a");
  const [isOpen, setisOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState<IOrder>();

  const { data, loading, error, refetch } = useQuery(FETCH_ORDER_RECORDS, {
    variables: {
      params: {
        type: "buy",
        asset,
        fiat: fiat.currency,
        page: pageNumber,
        amount,
        recordPerPage,
        chainId,
      },
    },
  });

  const { t} = useTranslation()

  useEffect(() => {
    refetch();
  }, [refetchOrders]);

  if (data) {
   //  
    dispatch(
      setSellOrders({
        order: data?.fetchOrderRecords?.orders,
        totalSellOrder: data?.fetchOrderRecords?.total,
        suggestions: data?.fetchOrderRecords?.suggestions
      })
    );
  }
  const  selectAsset = (asset:any) => {
    dispatch(setSellSelectedAsset({ asset:asset.asset  }))
    dispatch(
      addToDefaultTokenNav({
        token: asset.asset,
        chainId
      })
    );
  }
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(setSellMinAmount({ amount: parseInt(debouncedQuery) }));
    }
  }, [debouncedQuery]);

  const [welcomeModal, setWelcomeModal] = useState(false);
  const [run, setRun] = useState(false);

  function strartWelcomeRide() {
    setRun(true);
  }

  useEffect(() => {
    const visits = window.localStorage.getItem("sellTour");
    if (!visits && account) {
      setWelcomeModal(true);
      window.localStorage.setItem("sellTour", "1");
    }
  }, []);
 
  return (
    <>
    <Joyride
    // @ts-ignore
        steps={SellSteps}
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
          window.localStorage.setItem("sellTour", "1");
          setWelcomeModal((state) => !state);
        }}
        textHeader={t('welcome_to_p2p_text')}
        welcomeText={t('sell_text')}
      />
      <Box>
        <Box minH='100vh' zIndex={1} flexWrap='wrap' overflowX='hidden'>
          <SellJumbotron
             head={t('sell_jumbotron_header')}
             text={t('sell_jumbotron_text')}
          />
          <Box width='90%' margin='0 auto'>
            <TokenNavbarHeader
              selectedAsset={asset}
              setSelectedAsset={(asset) =>
                dispatch(setSellSelectedAsset({ asset }))
              }
              selectedFiat={fiat}
              setSelectedFiat={(fiat) => dispatch(setSellSelectedFiat({ fiat }))}
              onChange={(value) =>
                setSearchQuery(value === "" ? "0" : value)
              }
              totalOrder={data?.fetchOrderRecords?.total}
            />
            <CurrencyInput
              selectedFiat={fiat}
              setSelectedFiat={(fiat) =>
                dispatch(setSellSelectedFiat({ fiat }))
              }
              reFetchInfo={() => refetch()}
              onChange={(value) => setSearchQuery(value)}
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
              <>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <SellSkeleton key={index} />
                ))}
              </>
            ) : (
              <SellListData
                page='sell'
                orders={isDemoAccount ?  data?.fetchOrderRecords?.orders.filter((items : IOrder)=>items.user.address == '0x51A01dCA9a9D79FB3f45E6e49B86c00a442513de') : data?.fetchOrderRecords?.orders.filter((items : IOrder)=>items.user.address !== '0x51A01dCA9a9D79FB3f45E6e49B86c00a442513de')}
                setOrderInfo={setOrderInfo}
                setisOpen={setisOpen}
                suggestions={data?.fetchOrderRecords?.suggestions}
                selectAsset={selectAsset}
              />
            )}
            <Pagination
              pageSize={recordPerPage}
              currentPage={pageNumber}
              siblingCount={1}
              totalCount={data?.fetchOrderRecords?.total}
              onPageChange={(page) => dispatch(setSellPageNumber({ page }))}
            />
          </Box>
          <Footer />
        </Box>
      </Box>
      {/* <SellModal
        orderInfo={orderInfo}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
      /> */}
      <BuyModal
        orderInfo={orderInfo}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
      />
    </>
  );
}

//orderinfo
//isopen
//onclose
