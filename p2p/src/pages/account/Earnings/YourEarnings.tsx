import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setAllPageNumber } from "../../../state/tradeHistory/index";
import Trade from "./components/Earn";
import Pagination from "../../../components/Pagination";
import { useActiveWeb3React } from "../../../utils/hooks";
import { useMediaQuery } from "@chakra-ui/react";

import YourEarnMobile from "./components/YourEarnMobile";
import YourEarn from "./components/YourEarn";
import { useFetchEarnData } from "../../../utils/hooks/useFetchEarnData";

const YourEarnings = ({
  userData,
  currentEvent,
  claimpRGP,
  openStakeModal,
  TimeFrame,
  userInfo,
  data,
  claimReward,
  buttonText,
}: {
  userData: any;
  currentEvent: string;
  claimpRGP: () => void;
  openStakeModal: () => void;
  TimeFrame: number;
  userInfo: any;
  data: any;
  claimReward: () => void;
  buttonText:boolean
}) => {
  const { account, chainId, library } = useActiveWeb3React();
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
        <YourEarnMobile
          currentEvent={currentEvent}
          userInfo={userInfo}
          TimeFrame={TimeFrame}
          claimpRGP={claimpRGP}
          userData={userData}
          earnList={data}
          openStakeModal={openStakeModal}
          claimReward={claimReward}
        />
      ) : (
        <YourEarn
          currentEvent={currentEvent}
          userInfo={userInfo}
          TimeFrame={TimeFrame}
          claimpRGP={claimpRGP}
          userData={userData}
          earnList={data}
          buttonText={buttonText}
          openStakeModal={openStakeModal}
          claimReward={claimReward}
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

export default YourEarnings;
