import MultiCall from "@indexed-finance/multicall";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import { CONTRACT_ADDRESSES, PRGP } from "../addresses";
import { useActiveWeb3React } from "./useActiveWeb3React";
import rewardabi from "../abis/reward.json";

export const useFetchEarnData = (currentEvent: string, reload: number) => {
  const { chainId, account, library } = useActiveWeb3React();
  const [data, setData] = useState<any>();
  const [hasStaked, setHasStaked] = useState(false);
  const [userInfo, setuserInfo] = useState<any>();
  const [allInfo, setallInfo] = useState<any[]>();
  const [TimeFrame, setTimeFrame] = useState(0);

  useMemo(async () => {
    if (account) {
      try {
        const multi = new MultiCall(library);

        const prgpBalanceData = await multi.getBalancesAndAllowances(
          [PRGP[chainId as number]],
          account,
          CONTRACT_ADDRESSES[chainId as number]["REWARD"]
        );

        const address = PRGP[chainId as number];

        const userEventInfo = await multi.multiCall(rewardabi, [
          {
            target: CONTRACT_ADDRESSES[chainId as number]["REWARD"],
            function: "userStakedOnEvent",
            args: [account, currentEvent],
          },
        ]);

         

        const timeFrameReq = await multi.multiCall(rewardabi, [
          {
            target: CONTRACT_ADDRESSES[chainId as number]["REWARD"],
            function: "timeFrame",
            args: [],
          },
        ]);

        const allStakedUserInfo = await multi.multiCall(rewardabi, [
          {
            target: CONTRACT_ADDRESSES[chainId as number]["REWARD"],
            function: "getRangeOfAllUsers",
            args: [currentEvent],
          },
        ]);

        const hasStaked = userEventInfo[1][0].userStaked;
        const allUserInfo = allStakedUserInfo[1][0];

        //  

        setData([
          {
            prgpTokenBalance: ethers.utils.formatEther(
              prgpBalanceData[1][address].balance.toString()
            ),
            prgpTokenAllowance: ethers.utils.formatEther(
              prgpBalanceData[1][address].allowance.toString()
            ),
          },
        ]);

        setTimeFrame(parseFloat(timeFrameReq[1][0].toString()));

        if (hasStaked && allUserInfo.length > 0) {
          const result = allUserInfo?.filter((info) => info.user === account);
          // const allUserResult = allUserInfo?.filter(
          //   (info) => info.user == !account
          // );

          setuserInfo(result[0]);
          setallInfo(allUserInfo);
          setHasStaked(true);
        } else if (!hasStaked) {
          setallInfo(allUserInfo);
          setHasStaked(false);
          // setuserInfo(userEventInfo[1][0]);
          setuserInfo({
            acruedReward: "0",
            amountDeposit: "0",
            user: account,
            timeDeposit: currentEvent,
          });
        }
      } catch (err) {
         
      }
    }
  }, [chainId, account, currentEvent, reload]);

   

  return { allInfo, userInfo, data, hasStaked, TimeFrame };
};
