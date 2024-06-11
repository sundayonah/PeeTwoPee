import { useState, useMemo } from "react";
import { CouncilMemberStakeContract } from "..";
import { useActiveWeb3React } from ".";
import { CONTRACT_ADDRESSES } from "../addresses";
import { ethers } from "ethers";
import { RANKSBYTES } from "../constants/constants";

interface useSelectBadgeInterface {
  priceInput: string | undefined;
  setSelectedBadgeIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  setPriceInput: React.Dispatch<React.SetStateAction<string>>;
  badges: Array<{ rank: string; min: string; id: number }> | undefined;
}

export enum PROFILE_MOBILE {
  TRADING_INFORMATION = "TRADING_INFORMATION",
  PAYMENT_METHODS = "PAYMENT_METHODS",
  PROFILE_INFORMATION = "PROFILE_INFORMATION",
}

export const useSelectBadge = ({
  priceInput,
  setSelectedBadgeIndex,
  setPriceInput,
  badges,
}: useSelectBadgeInterface) => {
  const pickHighest = (
    arr: Array<{ rank: string; min: string; id: number }>
  ) => {
    const res = {
      rank: "",
      min: -Infinity,
      id: -Infinity,
    };
    arr.forEach((el) => {
      const { rank, min, id } = el;
      if (parseFloat(ethers.utils.formatEther(min)) > res.min) {
        res.rank = rank;
        res.min = parseFloat(ethers.utils.formatEther(min));
        res.id = id;
      }
    });
    return res;
  };

  useMemo(() => {
    if (priceInput !== "0") {
      if (badges) {
        const Badges = [...badges];
        const filteredBadges = Badges.filter(
          (badge) =>
            parseFloat(priceInput as string) >=
            parseFloat(ethers.utils.formatEther(badge.min))
        );
        const highestBadge = pickHighest(filteredBadges);
        setSelectedBadgeIndex(
          highestBadge.id === -Infinity ? undefined : highestBadge.id
        );
      }
    } else {
      setSelectedBadgeIndex(undefined);
    }
  }, [priceInput]);
};

export const useRigelBadge = () => {
  const { account, chainId, library } = useActiveWeb3React();
  const [Badges, setBadges] =
    useState<Array<{ rank: string; min: string; id: number }>>();

  const fetchBadges = async () => {
    const StakingContract = await CouncilMemberStakeContract(
      CONTRACT_ADDRESSES[chainId]["STAKING"],
      library
    );
    const badges = [];
    for (let i = 0; i < 5; i++) {
      try {
        const badge = await StakingContract.getSetsBadgeForCouncilMembers([i]);
        badges.push({
          rank: ethers.utils.parseBytes32String(badge[0].Rank),
          // rank: "",
          min: badge[0].minAmountToStake.toString(),
          maxToJoin: badge[0].maxAmountOnDisputeToJoin.toString(),

          id: i,
        });
      } catch (err) {
         
      }
    }
    return badges;
  };

  useMemo(async () => {
    if (account) {
      const badges = await fetchBadges();
      setBadges(badges);
    }
  }, [account, chainId]);

  return { Badges };
};

export const useMerchantBadge = () => {
  const { account, chainId, library } = useActiveWeb3React();
  const [Badges, setBadges] =
    useState<Array<{ rank: string; min: string; id: number }>>();

  const fetchBadges = async () => {
    const StakingContract = await CouncilMemberStakeContract(
      CONTRACT_ADDRESSES[chainId]["STAKING"],
      library
    );
    const badges = [];
    for (let i = 0; i < RANKSBYTES.length; i++) {
      try {
        const badge = await StakingContract.getSetsBadgeForMerchant(
          RANKSBYTES[i].bytes
        );

        badges.push({
          rank: ethers.utils.parseBytes32String(badge.otherRank),
          // rank: "",
          min: badge.maxRequireJoin.toString(),
          badge: ethers.utils.parseBytes32String(badge.Rank),

          id: i,
        });

      } catch (err) {
         
      }
    }
    return badges;
  };

  useMemo(async () => {
    if (account) {
      const badges = await fetchBadges();
      setBadges(badges);
    }
  }, [account, chainId]);

  return { Badges };
};

export const useRank = (
  reload: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { account, chainId, library } = useActiveWeb3React();
  const [loading, setLoading] = useState(false);
  const [rank, setRankInfo] = useState<{ rank: string; amount: string }>({
    rank: "",
    amount: "",
  });

  const [merchantRank, setMerchantRank] = useState<{
    rank: string;
    amount: string;
  }>({
    rank: "",
    amount: "",
  });

  useMemo(async () => {
    if (account) {
      try {
        setLoading(true);
        const stakingContract = await CouncilMemberStakeContract(
          CONTRACT_ADDRESSES[chainId]["STAKING"],
          library
        );

        const rankInfo = await stakingContract.getCouncilMemberStore(account);

        const merchantRankInfo = await stakingContract.getMerchantStore(
          account
        );

        setMerchantRank(
          merchantRankInfo.Rank !== "0x"
            ? {
                rank: ethers.utils.parseBytes32String(merchantRankInfo.Rank),
                amount: merchantRankInfo.maxAmountToJoin.toString(),
              }
            : { rank: "", amount: "" }
        );
        setRankInfo(
          rankInfo.Rank !== "0x"
            ? {
                rank: ethers.utils.parseBytes32String(rankInfo.Rank),
                amount: rankInfo.amount.toString(),
              }
            : { rank: "", amount: "" }
        );
        if (reload) {
          setReload(false);
        }

        setLoading(false);
      } catch (err) {
         

        setLoading(false);
      }
    }
  }, [account, chainId, reload]);
  return { rank, merchantRank, loading };
};
