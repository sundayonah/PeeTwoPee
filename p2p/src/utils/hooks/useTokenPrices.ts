import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';
import { ethers } from 'ethers';
import { smartSwapLPTokenPoolOne, SMARTSWAPLP_TOKEN1ADDRESSES } from '../index';
import { SMARTSWAPLP_TOKEN3ADDRESSES } from '../addresses';

export const useRGPPrice = () => {
  const { chainId, library } = useActiveWeb3React();


  const [RGPPrice, setRGPPrice] = useState<string | number>(0);

  useEffect(() => {
    const getRGPprice = async () => {
      try {

        const RGPBUSDToken = await smartSwapLPTokenPoolOne(
          SMARTSWAPLP_TOKEN1ADDRESSES[chainId as number],
          library
        );

        const reserves = await RGPBUSDToken.getReserves();

        setRGPPrice(
          ethers.utils.formatUnits(reserves[0].mul(10000).div(reserves[1]), 4)
        );
      } catch (error) {
        setRGPPrice(0);
      }
    };
    getRGPprice();
  }, [chainId, library]);
  return [RGPPrice];
};


export const useBNBPrice = () => {
  const { chainId, library } = useActiveWeb3React();


  const [BNBPrice, setBNBPrice] = useState<string | number>(0);

  useEffect(() => {
    const getRGPprice = async () => {
      try {

        const BNBBUSDToken = await smartSwapLPTokenPoolOne(
          SMARTSWAPLP_TOKEN3ADDRESSES[chainId as number],
          library
        );

        const reserves = await BNBBUSDToken.getReserves();

        setBNBPrice(
          ethers.utils.formatUnits(reserves[1].mul(10000).div(reserves[0]), 4)
        );
      } catch (error) {
        setBNBPrice(0);
         
      }
    };
    getRGPprice();
  }, [chainId, library]);
  return [BNBPrice];
};
