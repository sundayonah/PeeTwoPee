import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setAllPageNumber } from "../../../state/tradeHistory/index";
import Trade from "./components/Earn";
import Pagination from "../../../components/Pagination";
import { useActiveWeb3React } from "../../../utils/hooks";
import { useMediaQuery } from "@chakra-ui/react";
import TradeMobilePage from "./components/EarningMobilePage";

const Earnings = ({
  currentEvent,
  openStakeModal,
  claimpRGP,
  allInfo,
  claimReward,
  TimeFrame,
}: {
  currentEvent: string;
  openStakeModal: () => void;
  claimpRGP: () => void;
  allInfo: any[];
  claimReward: () => void;
  TimeFrame: number;
}) => {
  const { account, chainId } = useActiveWeb3React();
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const earningRecords = useSelector(
    (state: RootState) => state.earning.earningRecords
  );

  const { recordPerPage, page, total } = useSelector(
    (state: RootState) => state.earning
  );

  const dispatch = useDispatch();

  return (
    <>
      {isMobileDevice ? (
        <TradeMobilePage
          TimeFrame={TimeFrame}
          currentEvent={currentEvent}
          openStakeModal={openStakeModal}
          claimpRGP={claimpRGP}
          allInfo={allInfo}
          claimReward={claimReward}
        />
      ) : (
        <Trade
          openStakeModal={openStakeModal}
          claimReward={claimReward}
          claimpRGP={claimpRGP}
          allInfo={allInfo}
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

export default Earnings;
