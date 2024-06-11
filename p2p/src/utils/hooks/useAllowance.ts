import { ethers } from "ethers";
import { useState, useMemo } from "react";
import { useActiveWeb3React } from ".";
import { ERC20Token } from "..";
// import { STAKINGCONTRACTADDRESS } from "../constants/constants";

export const useAllowance = (
  tokenAddress: string,
  inputValue: string,
  spender: string,
  reload: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [tokenAllowance, setAllowance] = useState("");
  const { account, chainId, library } = useActiveWeb3React();

  useMemo(async () => {
    if (account) {
      try {
        const RigelToken = await ERC20Token(tokenAddress, library);
        const allowance = await RigelToken.allowance(account, spender);

        setAllowance(allowance.toString());
        if (reload) {
          setReload(false);
        }
      } catch (err) {
         
      }
    }
  }, [reload, account, chainId, inputValue]);

  return { tokenAllowance };
};
