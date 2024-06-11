import { useEffect, useState } from "react";
import { getERC20Token } from "../utilsFunctions";
import { useActiveWeb3React } from "./useActiveWeb3React";
import {
  CONTRACT_ADDRESSES,
} from "../addresses";
import { ethers } from "ethers";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useAllTokens } from "../../utils/hooks/Tokens";

export const useCreateOrderAllowance = (
  checkTokenApproval: number,
  cryptoAmount: string,
  assetSymbol: string
) => {
  const { account, chainId, library } = useActiveWeb3React();
  // const userAssetType = useSelector(
  //   (state: RootState) => state.ads.userAssetType
  // );
  const cryptoAddress =
    useSelector((state: RootState) => state.ads.tokenAddress) || "";
  const lists = useAllTokens();
  const [hasTokenBeenApproved, setHasTokenBeenApproved] = useState(false);

  let currencyMatch = Object.values(lists).find(
    (currency) => currency?.tokenInfo?.symbol === assetSymbol
  );

  // useEffect(() => {
  //   let currencyMatch = Object.values(lists).find(currency => currency?.tokenInfo?.symbol === assetSymbol);
  //   setTokenAddress(currencyMatch?.tokenInfo?.address)
  // },[assetSymbol]);

  useEffect(() => {
    const getAllowance = async () => {
      if (account && cryptoAmount) {
        try {
          const orderAsset = await getERC20Token(
            currencyMatch?.tokenInfo?.address,
            library
          );
          const [allowanceA, decimalsA] = await Promise.all([
            orderAsset.allowance(
              account,
              CONTRACT_ADDRESSES[chainId as number]["P2P"]
            ),
            orderAsset.decimals(),
          ]);

         //  

          const isTokenApproved =
            allowanceA.toString() >=
            parseFloat(
              ethers.utils.parseUnits(cryptoAmount, decimalsA).toString()
            );
         //  
          setHasTokenBeenApproved(isTokenApproved);
        } catch (e) {
           
        }
      }
    };
    getAllowance();
  }, [checkTokenApproval, assetSymbol, account, cryptoAmount]);

  return { hasTokenBeenApproved };
};
