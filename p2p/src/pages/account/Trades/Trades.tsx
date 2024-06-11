import { Box, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import Current from "./Current";
// import Completed from "./Completed";
import AllTrades from "./AllTrades";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { FETCH_TRANSACTION_RECORDS } from "../gql/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  setUserAllAdType,
  setUserAllAssetType,
  setAllTradesStartDate,
  setAllTradesEndDate,
  setAllPageNumber,
  setSelectedFiat,
  setTradeRecords,
  setUserAllTradeStatus,
} from "../../../state/tradeHistory/index";
import TradeInputFilter from "../../../components/filter/TradeInputFilter";
import { useActiveWeb3React } from "../../../utils/hooks";
import { useLocation } from "react-router-dom";

const Trades = () => {
  const dispatch = useDispatch();
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const {
    recordPerPage,
    page,
    AllTradesStartDate,
    AllTradesEndDate,
    userAllTradeLogo,
    userAllAdType,
    userAllAssetType,
    userAllTradestatus,
    fiat,
  } = useSelector((state: RootState) => state.tradeHistory);

  const [orderStatus, setOrderStatus] = useState("");
  const [refetchTrade, setRefetchTrade] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const adsState = useSelector((state: RootState) => state.ads);
  const { chainId } = useActiveWeb3React();
  const [tabIndex, setTabIndex] = useState(0);
  let location = useLocation();

  const [fetchTrade, { data, loading }] = useLazyQuery(
    FETCH_TRANSACTION_RECORDS,
    {
      variables: {
        filter: {
          asset: userAllAssetType,
          type: userAllAdType,
          recordPerPage: recordPerPage,
          page: page,
          fiat: fiat.currency.toLowerCase() === "alls" ? "All" : fiat.currency,
          status:
            userAllTradestatus === ""
              ? "all"
              : userAllTradestatus.toLowerCase(),
          start_date: AllTradesStartDate,
          end_date: AllTradesEndDate,
          chainId: chainId ?? 97,
        },
      },
      fetchPolicy: "no-cache",
    }
  );
  useEffect(() => {
    fetchTrade();
  }, [page, tabIndex]);

  //This effect sets the trades as CURRENT tab when user lands on the page
  useEffect(() => {
    if (location?.pathname == "/profile/trades/current") {
      setTabIndex(1);
    } else if (location?.pathname == "/profile/ads") {
      setTabIndex(2);
    }
  }, []);


  dispatch(
    setTradeRecords({
      tradeRecords: data?.fetchTransactionRecords?.transactions,
      total: data?.fetchTransactionRecords?.total,
    })
  );

  return (
    <>
      <Box
        mx={isMobileDevice ? 0 : 16}
        py={isMobileDevice ? "0px" : 0}
        mb={isMobileDevice ? 20 : 0}
      >
    
        <TradeInputFilter
          userAllAssetType={userAllAssetType}
          userAllTradeLogo={userAllTradeLogo}
          fiat={fiat}
          currencies={adsState.fiatCurrencies}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setUserAllAdType={setUserAllAdType}
          setUserAllTradeStatus={setUserAllTradeStatus}
          setUserAllAssetType={setUserAllAssetType}
          setAllTradesStartDate={setAllTradesStartDate}
          setSelectedFiat={setSelectedFiat}
          setAllTradesEndDate={setAllTradesEndDate}
          setAllPageNumber={setAllPageNumber}
          setOrderStatus={setOrderStatus}
          userAllTradestatus={userAllTradestatus}
          userAllAdType={userAllAdType}
          refetch={() => setRefetchTrade(true)}
        />
        <AllTrades loading={loading} />

        {/* <TabPanels>
            <TabPanel p='0' pt={4} pb={4}>
             
            </TabPanel>
            <TabPanel p='0' pt={4} pb={4}>
              <Current loading={loading}/>
            </TabPanel>
            <TabPanel p='0' pt={4} pb={4}>
              <Completed />
            </TabPanel>
          </TabPanels> */}
        {/* </Tabs> */}
      </Box>
    </>
  );
};

export default Trades;
