import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveAds from "./ActiveAds";
import AllAds from "./AllAds";
import PostAd from "./PostAds/PostAd";
import { useNavigate } from "react-router-dom";
import { AdsPostSteps, setAdsBar } from "../../../state/accountUi";
import { RootState } from "../../../state/store";
import {
  setAdTabIndex,
  setAllAdsEndDate,
  setAllAdsStartDate,
  setOrderStatus,
  setUserAds,
  setUserAllAdType,
  setUserAllAssetType,
  setUserAllAdStatus,
  setAllPageNumber,
  setSelectedFiat,
} from "../../../state/ads/index";
import { useQuery } from "@apollo/client";
import { FETCH_ORDER_PER_USER } from "../gql/queries";
import { useActiveWeb3React } from "../../../utils/hooks";
import AdsInputFilter from "../../../components/filter/AdsInputFilter";
import { useTranslation } from "react-i18next";

const MyAds = () => {
  const { chainId } = useActiveWeb3React();
  const inactiveColour = useColorModeValue("#666666", "#999999");
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    allPageNumber,
    recordPerPage,
    adsStartDate,
    adsEndDate,
    orderStatus,
    userAllAdType,
    userAllAssetType,
    userAllAdStatus,
    fiatCurrencies,
    fiat,
    userAdsAssetLogo,
  } = useSelector((state: RootState) => state.ads);
  const navigate = useNavigate();
  const { account } = useActiveWeb3React();
  const [refetchCounter, setrefetchCounter] = useState<number>(0);
const {t} = useTranslation()
  const { loading, error, data, refetch } = useQuery(FETCH_ORDER_PER_USER, {
    variables: {
      params: {
        fiat: fiat?.currency?.toLowerCase() === "ALLS" ? "all" : fiat?.currency,
        type:
          typeof orderType == "string" && orderType.toLowerCase() === "all"
            ? ""
            : orderType,
        asset:
          typeof userAllAssetType == "string" &&
          userAllAssetType.toLowerCase() === "all"
            ? ""
            : userAllAssetType,
        status:
          typeof userAllAdStatus == "string" &&
          userAllAdStatus.toLowerCase() === "all"
            ? ""
            : userAllAdStatus,
        recordPerPage: recordPerPage,
        start_date: adsStartDate,
        end_date: adsEndDate,
        page: allPageNumber,
        chainId: chainId ?? 97,
      },
    },
    fetchPolicy: "no-cache",
  });
  

  useEffect(() => {
    dispatch(
      setUserAds({
        userAds: data?.fetchOrderPerUser?.orders,
        adsTotal: data?.fetchOrderPerUser?.total,
      })
    );
  }, [data?.fetchOrderPerUser?.total, data?.fetchOrderPerUser?.orders])
  
  useEffect(() => {
    refetch();
  }, [chainId, account, refetchCounter]);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    dispatch(
      setAdTabIndex({
        adTabIndex: index,
      })
    );
    if (index === 2) {
      navigate("/postad");
      dispatch(setAdsBar(AdsPostSteps.TRADETYPE));
    }
  };
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  return (
    <Box
      mx={isMobileDevice ? 0 : 16}
      py={isMobileDevice ? "0px" : 10}
      mb={isMobileDevice ? 20 : 7}
    >
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList
          _active={{ color: "#319EF6" }}
          color={inactiveColour}
          fontWeight={400}
        >
          <Tab fontSize={isMobileDevice ? "14px" : "16px"}>{t('all_ads')}</Tab>
          <Tab fontSize={isMobileDevice ? "14px" : "16px"}>{t('active_ads')}</Tab>
          <Tab fontSize={isMobileDevice ? "14px" : "16px"}>{t('post_ad')}</Tab>
        </TabList>
        <AdsInputFilter
          fiat={fiat}
          currencies={fiatCurrencies}
          userAllAssetType={userAllAssetType}
          startDate={startDate}
          setStartDate={setStartDate}
          userAdsAssetLogo={userAdsAssetLogo}
          endDate={endDate}
          setEndDate={setEndDate}
          setUserAllAdType={setUserAllAdType}
          setUserAllAssetType={setUserAllAssetType}
          setUserAllAdStatus={setUserAllAdStatus}
          setAllAdsStartDate={setAllAdsStartDate}
          setAllAdsEndDate={setAllAdsEndDate}
          setAllPageNumber={setAllPageNumber}
          setOrderStatus={setOrderStatus}
          setOrderType={setOrderType}
          userAllAdStatus={userAllAdStatus}
          userAllAdType={userAllAdType}
          refetch={() => refetch()}
          adsTabIndex={tabIndex}
          setSelectedFiat={setSelectedFiat}
          showAdsStatus={true}
        />

        <TabPanels>
          <TabPanel p='0' pt={4} pb={4}>
            <AllAds refetch={refetch} setrefetchCounter={setrefetchCounter} loading={loading} />
          </TabPanel>
          <TabPanel p='0' pt={4} pb={4}>
            <ActiveAds setrefetchCounter={setrefetchCounter} />
          </TabPanel>
          <TabPanel p='0' pt={4} pb={4}>
            <PostAd />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyAds;
