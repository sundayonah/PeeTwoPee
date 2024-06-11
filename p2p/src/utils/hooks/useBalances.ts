import { useEffect, useMemo, useState } from "react";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ethers } from "ethers";
import {
  SupportedChainSymbols,
  SupportedChainName,
  SupportedChainLogo,
} from "../constants/chain";
import { BUSD, RGPADDRESSES, USDT } from "../addresses";
import { getERC20Token } from "../utilsFunctions";

export const useNativeBalance = () => {
  const { account, chainId, library } = useActiveWeb3React();
  const [Balance, setBalance] = useState<string>("");
  const [Symbol, setSymbol] = useState(SupportedChainSymbols[56]);
  const [Name, setName] = useState(SupportedChainName[56]);
  const [Logo, setLogo] = useState(SupportedChainLogo[56]);

  const trxState = useSelector<RootState>(
    (state) => state.application.modal?.trxState
  );
  const stateChanged: boolean = trxState === 2;

  useEffect(() => {
    const getBalance = async () => {
      if (account) {
        try {
          const balance = await library?.getBalance(account as string);
          setBalance(
            parseFloat(ethers.utils.formatEther(balance as any)).toFixed(4)
          );
          setSymbol(SupportedChainSymbols[chainId as number]);
          setName(SupportedChainName[chainId as number]);
          setLogo(SupportedChainLogo[chainId as number]);
        } catch (err) {
          // window.location.reload();
        }
      } else {
        setSymbol(SupportedChainSymbols[56]);
        setName(SupportedChainName[56]);
        setLogo(SupportedChainLogo[56]);
      }
    };
    getBalance();
  }, [account, library, chainId, stateChanged]);

  return [Balance, Symbol, Name, Logo];
};

export const useRGPBalance = () => {
  const { chainId, account, library } = useActiveWeb3React();
  const [RGPBalance, setRGPBalance] = useState("");

  const trxState = useSelector<RootState>(
    (state) => state.application.modal?.trxState
  );
  const stateChanged: boolean = trxState === 2;

  useEffect(() => {
    const getBalance = async () => {
      if (account) {
        try {
          const token = await getERC20Token(
            RGPADDRESSES[chainId as number],
            library
          );
          const balance = await token.balanceOf(account);
          setRGPBalance(
            parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
          );
        } catch (err) {
          setRGPBalance("");
        }
      } else {
         
      }
    };

    getBalance();
  }, [account, chainId, stateChanged]);

  return [RGPBalance];
};

export const useBUSDBalance = () => {
  const { chainId, account, library } = useActiveWeb3React();
  const [BUSDBalance, setBUSDBalance] = useState("");

  const trxState = useSelector<RootState>(
    (state) => state.application.modal?.trxState
  );
  const stateChanged: boolean = trxState === 2;

  useEffect(() => {
    const getBalance = async () => {
      if (account) {
        try {
          const token = await getERC20Token(BUSD[chainId as number], library);
          const balance = await token.balanceOf(account);
          setBUSDBalance(
            parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
          );
        } catch (err) {
          setBUSDBalance("");
        }
      } else {
      }
    };

    getBalance();
  }, [account, chainId, stateChanged]);

  return [BUSDBalance];
};

export const useUSDBalance = () => {
  const { chainId, account, library } = useActiveWeb3React();
  const [USDTBalance, setUSDTBalance] = useState("");

  const trxState = useSelector<RootState>(
    (state) => state.application.modal?.trxState
  );
  const stateChanged: boolean = trxState === 2;

  useEffect(() => {
    const getBalance = async () => {
      if (account) {
        try {
          const token = await getERC20Token(USDT[chainId as number], library);
          const balance = await token.balanceOf(account);
          setUSDTBalance(
            parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
          );
        } catch (err) {
          setUSDTBalance("");
        }
      } else {
        //  
      }
    };

    getBalance();
  }, [account, chainId, stateChanged]);

  return [USDTBalance];
};

export const useBalances = (tokenAddress: string) => {
  const [balance, setBalance] = useState("");
  const { account, chainId, library } = useActiveWeb3React();

  useMemo(async () => {
    if (account) {
      if (tokenAddress) {
        const token = await getERC20Token(tokenAddress, library);

        const tokenBalance = await token.balanceOf(account);
        const tokenDecimal = await token.decimals();

        setBalance(
          ethers.utils.formatUnits(tokenBalance.toString(), tokenDecimal)
        );
      }
    }
  }, [account, tokenAddress]);

  return { balance };
};
