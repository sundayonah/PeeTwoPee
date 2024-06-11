import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setAllPageNumber } from "../../../state/tradeHistory/index";
import Trade from "./components/Trade";
import Pagination from "../../../components/Pagination";
import { useActiveWeb3React } from "../../../utils/hooks";
import { useMediaQuery } from "@chakra-ui/react";
import TradeMobilePage from "./components/TradeMobilePage";

const AllTrades = ({ loading }: { loading: boolean }) => {
  const { account, chainId } = useActiveWeb3React();
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const tradeRecords = useSelector(
    (state: RootState) => state.tradeHistory.tradeRecords
  );

  const { recordPerPage, page, total } = useSelector(
    (state: RootState) => state.tradeHistory
  );

  const dispatch = useDispatch();


  return (
    <>
      {isMobileDevice ? (
        <TradeMobilePage tradeRecords={tradeRecords} account={account} />
      ) : (
        <Trade
          tradeRecords={tradeRecords}
          account={account}
          loading={loading}
        />
      )}
      <Pagination
        pageSize={recordPerPage}
        currentPage={page}
        siblingCount={1}
        totalCount={total}
        onPageChange={(page) => {
          dispatch(setAllPageNumber({ page }));
        }}
      />
    </>
  );
};

export default AllTrades;
