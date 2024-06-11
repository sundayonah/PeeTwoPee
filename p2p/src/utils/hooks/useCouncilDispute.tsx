import React, { useState, useEffect } from "react";
import { CONTRACT_ADDRESSES } from "../addresses";
import {
  RigelDecentralizedP2PSystemContract,
  CouncilMemberStakeContract,
} from "../Contracts";
import { useActiveWeb3React } from "./useActiveWeb3React";

export const useCouncilDispute = (productId: number, reCheck: boolean, account : string) => {
  const [iVoted, setIVoted] = useState<boolean>(false);
  const { chainId, library } = useActiveWeb3React();

  useEffect(() => {
    async function checkDispute() {
      const p2pInstance = await RigelDecentralizedP2PSystemContract(
        CONTRACT_ADDRESSES[chainId]["P2P"],
        library
      );
      const isVoted = await p2pInstance.iVoted(productId, account);
      setIVoted(isVoted);
    }

    if (account && productId) {
      checkDispute();
    }
  }, [productId, account, reCheck, chainId]);
  return { iVoted };
};

export const useViewStateMgt = () => {
  type stateMgtT = {
    beforeVotesStart: number;
    votingEllapseTime: number;
    maxNumbersofCouncils: number;
  };

  const [stateMgt, setStateMgt] = useState<stateMgtT>();
  const { account, chainId, library } = useActiveWeb3React();

  useEffect(() => {
    async function viewStateManagement() {
      const p2pInstance = await RigelDecentralizedP2PSystemContract(
        CONTRACT_ADDRESSES[chainId]["P2P"],
        library
      );
      const viewStateMgt = await p2pInstance.viewStateManagement();

      setStateMgt({
        beforeVotesStart: Number(viewStateMgt[0]),
        votingEllapseTime: Number(viewStateMgt[1]),
        maxNumbersofCouncils: Number(viewStateMgt[2]),
      });
    }

    viewStateManagement();
  }, [account, chainId]);
  return { stateMgt };
};

export const useIsWhitelisted = () => {
  const [isWhitelistEnabled, setIsWhiteListEnabled] = useState<boolean>();
  const [isWhitelistedUser, setIsWhiteListedUser] = useState<boolean>();
  const { account, chainId, library } = useActiveWeb3React();

  useEffect(() => {
    async function getWhieListStatus() {
      const p2pInstance = await CouncilMemberStakeContract(
        CONTRACT_ADDRESSES[chainId]["STAKING"],
        library
      );
      const [whitelistStatus, useriswhtelisted] = await Promise.all([
        p2pInstance.getWhitelistStatus(),
        p2pInstance.isUserWhitelisted(account),
      ]);

      setIsWhiteListEnabled(whitelistStatus);
      setIsWhiteListedUser(useriswhtelisted);
    }
    if(account){
    getWhieListStatus();
    }
  }, [account, chainId]);
  return { isWhitelistEnabled, isWhitelistedUser };
};
