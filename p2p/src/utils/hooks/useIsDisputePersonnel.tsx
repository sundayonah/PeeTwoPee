import React, { useEffect } from "react";
import { CONTRACT_ADDRESSES } from "../addresses";
import { 
  RigelDecentralizedP2PSystemContract,
} from "../Contracts";
import { useActiveWeb3React } from "./useActiveWeb3React";

type disputePersonnel = {
  isLocked: boolean;
  isResolving: boolean;
  joined: number;
  tFee4WrongVotes: number;
  totalVotes: number;
  wrongVote: number;
};

const useIsDisputePersonnel = () => {
  const { account, chainId, library } = useActiveWeb3React();
  const [disputePersonnelData, setDisputePersonnelData] = React.useState<
    disputePersonnel
  >();

  useEffect(() => {
    async function getDisputePErsonnel() {
      if (account) {
        try {
          const p2pInstance = await RigelDecentralizedP2PSystemContract(
            CONTRACT_ADDRESSES[chainId]["P2P"],
            library
          );

          const isDisputePersonel = await p2pInstance.disputesPersonnel(
            account
          );

         //  
          setDisputePersonnelData(isDisputePersonel);
        } catch (error) {
           
        }
      }
    }

    getDisputePErsonnel();
  }, [account, chainId]);

  return disputePersonnelData;
};

export default useIsDisputePersonnel;
