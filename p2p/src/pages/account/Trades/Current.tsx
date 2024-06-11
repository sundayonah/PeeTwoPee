
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination";
import { setAllPageNumber } from "../../../state/tradeHistory/index";
import { RootState } from "../../../state/store";
import Trade from "./components/Trade";
import { useActiveWeb3React } from "../../../utils/hooks";
import TradeMobilePage from "./components/TradeMobilePage";
import { useMediaQuery } from "@chakra-ui/react";

const Current = ({loading}:{loading:boolean}) => {
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();

  const {   recordPerPage, page, tradeRecords, total } = useSelector(
    (state: RootState) => state.tradeHistory
  );

  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');

  return (
    <>
      {isMobileDevice
      ? <TradeMobilePage tradeRecords={tradeRecords} account={account} /> :
      <Trade tradeRecords={tradeRecords} loading={loading} account={account} />
      }
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

export default Current;
