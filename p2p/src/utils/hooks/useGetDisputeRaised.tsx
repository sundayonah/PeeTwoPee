import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { CONTRACT_ADDRESSES } from "../addresses";
import { RigelDecentralizedP2PSystemContract } from "../Contracts";
import { useActiveWeb3React } from "./useActiveWeb3React";

export type disputeRaiseResponse = {
    who: string;
    against: string;
    token: string;
    isResolved: boolean;
    amount: number;
    payment: any;
    time: number;
    votesCommence: number;
    votesEnded: number;
  };
  

const useGetDisputeRaised = (productId : number) => {
    const [disputeRaised, setDisputeRaised]= useState <disputeRaiseResponse>()
    const {chainId,account, library} = useActiveWeb3React()
    useEffect(() => {
      async function getRaisedDispute() {
        const p2pInstance = await RigelDecentralizedP2PSystemContract(
          CONTRACT_ADDRESSES[chainId]["P2P"],
          library
        );
        const raised = await p2pInstance.getDisputeRaised(productId);
  
        setDisputeRaised({
          who: raised.who,
          against: raised.against, 
          token: raised.token,
          isResolved: raised.isResolved,
          amount: Number(raised.amount) ,
          payment: ethers.utils.formatEther(raised.payment) ,
          time: Number(raised.time),
          votesCommence: Number(raised.votesCommence),
          votesEnded: Number(raised.votesEnded)
        })
      }
      getRaisedDispute();
    }, [productId, account]);
  return (disputeRaised)
}

export default useGetDisputeRaised