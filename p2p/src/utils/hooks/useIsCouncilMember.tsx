import { ethers } from "ethers";
import React, {   useState, useMemo } from "react";
import { CONTRACT_ADDRESSES } from "../addresses";
import { CouncilMemberStakeContract } from "../Contracts";
import { useActiveWeb3React } from "./useActiveWeb3React";

const useIsCouncilMember = () => {
  const { chainId, account, library } = useActiveWeb3React();
  const [loading, setLoading] = useState(false)
  const [rank, setRankInfo] = useState<{ rank: any; amount: any }>({
    rank: null,
    amount: null,
  });

  useMemo(async () => {
    if (account) {
      try {
        setLoading(true)
        const stakingContract = await CouncilMemberStakeContract(
          CONTRACT_ADDRESSES[chainId]["STAKING"],
          library
        );

        const rankInfo = await stakingContract.getCouncilMemberStore(account);

        const merchantRankInfo = await stakingContract.getMerchantStore(
          account
        );

        setRankInfo(
            rankInfo.Rank !== "0x"
              ? {
                  rank: ethers.utils.parseBytes32String(rankInfo.Rank),
                  amount: rankInfo.amount.toString(),
                }
              : { rank: "", amount: "" }
          );
          setLoading(false)
      } 
      catch (err) {
        setLoading(false)
         
      }
    }
  }, [account, chainId]);

  return {rank, loading}
};

export default useIsCouncilMember;
