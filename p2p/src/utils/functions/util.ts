import { ethers } from "ethers";

import mainToken from "../token_list.json";
import TokenLogo from "../../assets/Null-token.svg";

export const weiToToken = (bigNumber: any, decimal: any = 18) => {
  return ethers.utils.formatUnits(bigNumber.toString(), decimal);
};

export function convertToTime(epochTime : any) {
  const date = new Date(epochTime * 1000);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const seconds = `0${date.getSeconds()}`;
  // Will display time in 10:30:23 format
  const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(
    -2,
  )}`;
  return formattedTime;
}



export const tokenToWei = (number: any, decimal: any = 18) => {
  return ethers.utils.parseUnits(number.toString(), decimal);
};

export const formatAmount = (number: string, decimals: any) => {
  const num = ethers.BigNumber.from(number).toString();
  let res = ethers.utils.formatUnits(num, decimals);
  // res = ParseFloat(res, 3)
  return res;
};

export const getTokenIcon = (symbol: string) => {
  const tokenList = mainToken;
  let tokenIcon = tokenList.find((token) => token.symbol === symbol);
  if (!tokenIcon) {
    return TokenLogo;
  }
  return tokenIcon.logoURI;
};

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const getTokenPrice = async (symbol: string, fiat: string) => {
  const coinGeckoList = await fetch(
    "https://api.coingecko.com/api/v3/coins/list"
  );

  const response = await coinGeckoList.json();
  const search = response.filter(
    (item: any) => item.symbol.toLowerCase() === symbol.toLowerCase()
  );

  const id = search[0].id;

  const coin = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  const coinResponse = await coin.json();

  const current_price =
    coinResponse.market_data?.current_price[fiat.toLowerCase()];

  return current_price;
};

export const formatDecimalNumber = (amount: any) => {
  if (amount) {
    var decimal = amount - Math.floor(amount) !== 0;

    if (!decimal) {
      // return amount;
      // add commas seperator to number
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      const numberString = amount.toString();
      const isNotZero = numberString[0] !== "0";

      if (isNotZero) {
        const splitValue = amount.toString().split(".");
        const firstValues = splitValue[0];

        const secondValue = splitValue[1]
          .split("")[0]
          .concat(splitValue[1].split("")[1] ?? "0");
        return firstValues + "." + secondValue;
      } else {
        const splitValue = amount.toString().split(".");
        const firstValues = splitValue[0];
        const secondValue = splitValue[1]
          .split("")[0]
          .concat(
            splitValue[1].split("")[1] ?? "0",
            splitValue[1].split("")[2] ?? "0",
            splitValue[1].split("")[3] ?? "0",
            splitValue[1].split("")[4] ?? "0",
            splitValue[1].split("")[5] ?? "0"
          );
        return firstValues + "." + secondValue;
      }
    }
  }
};
