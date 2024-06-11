import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import ERC20Token from "./abis/erc20.json";

export const getERC20Token = async (
  address: string,
  library: Web3Provider | undefined
) => {
  const token = new Contract(address, ERC20Token, library?.getSigner());
  return token;
};
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const switchNetwork = async (
  chainId: string,
  account: string,
  library: Web3Provider | undefined
) => {
  const polygonParams = {
    chainId: "0x89",
    chainName: "Matic",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  };
  const ropstenParams = {
    chainId: "0x3",
    chainName: "Ropsten Test Network",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  };
  const binanceParams = {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  };
  const oasisParams = {
    chainId: "0xa516",
    chainName: "Emerald Mainnet",
    nativeCurrency: {
      name: "ROSE",
      symbol: "ROSE",
      decimals: 18,
    },
    rpcUrls: ["https://emerald.oasis.dev"],
    blockExplorerUrls: ["https://explorer.emerald.oasis.dev"],
  };

  const mumbaiParams = {
    chainId: "0x13881",
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  };

  const bsctestnetParamsm = {
    chainId: "0x61",
    chainName: "Binance SmartChain Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  };
  if (chainId === "0x1") {
    library?.send("wallet_switchEthereumChain", [{ chainId }, account]);
  } else if (chainId === "0x3") {
    try {
      await library?.send("wallet_switchEthereumChain", [
        { chainId: "0x3" },
        account,
      ]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library?.send("wallet_addEthereumChain", [
            ropstenParams,
            account,
          ]);
        } catch (addError) {
          // handle "add" error
          console.error(`Add chain error ${addError}`);
        }
      }
      console.error(`Switch chain error ${switchError}`);
      // handle other "switch" errors
    }
  } else if (chainId === "0x38") {
    try {
      await library?.send("wallet_switchEthereumChain", [
        { chainId: "0x38" },
        account,
      ]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library?.send("wallet_addEthereumChain", [
            binanceParams,
            account,
          ]);
        } catch (addError) {
          // handle "add" error
          console.error(`Add chain error ${addError}`);
        }
      }
      console.error(`Switch chain error ${switchError}`);
      // handle other "switch" errors
    }
  } else if (chainId === "0x89") {
    try {
      await library?.send("wallet_switchEthereumChain", [
        { chainId: "0x89" },
        account,
      ]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library?.send("wallet_addEthereumChain", [
            polygonParams,
            account,
          ]);
        } catch (addError) {
          // handle "add" error
          console.error(`Add chain error ${addError}`);
        }
      }
      console.error(`Switch chain error ${switchError}`);
      // handle other "switch" errors
    }
  } else if (chainId === "0xa516") {
    try {
      await library?.send("wallet_switchEthereumChain", [
        { chainId: "0xa516" },
        account,
      ]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library?.send("wallet_addEthereumChain", [
            oasisParams,
            account,
          ]);
        } catch (addError) {
          // handle "add" error
          console.error(`Add chain error ${addError}`);
        }
      }
      console.error(`Switch chain error ${switchError}`);
      // handle other "switch" errors
    }
  } else if (chainId === "0x13881") {
    try {
      await library?.send("wallet_switchEthereumChain", [
        { chainId: "0x13881" },
        account,
      ]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library?.send("wallet_addEthereumChain", [
            mumbaiParams,
            account,
          ]);
        } catch (addError) {
          // handle "add" error
          console.error(`Add chain error ${addError}`);
        }
      }
      console.error(`Switch chain error ${switchError}`);
      // handle other "switch" errors
    }
  } else if (chainId === "0x61") {
    try {
      await library?.send("wallet_switchEthereumChain", [
        { chainId: "0x61" },
        account,
      ]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library?.send("wallet_addEthereumChain", [
            bsctestnetParamsm,
            account,
          ]);
        } catch (addError) {
          // handle "add" error
          console.error(`Add chain error ${addError}`);
        }
      }
      console.error(`Switch chain error ${switchError}`);
      // handle other "switch" errors
    }
  }
};

export const formatMongodbTime = (
  createdDate: string | undefined,
  short?: boolean
) => {
  if (createdDate) {
    var created_date = new Date(createdDate);

    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = created_date.getFullYear();
    var month = months[created_date.getMonth()];
    var date = created_date.getDate();
    var hour = created_date.getHours().toString();
    var min = created_date.getMinutes();
    var sec = created_date.getSeconds();
    var time =
      year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;

    return short ? date + "/" + month + "/" + year : time;
  }
};

export const formatTime = (createdDate: string | undefined) => {
  if (createdDate) {
    var created_date = new Date(createdDate);

    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = created_date.getFullYear();
    var month = months[created_date.getMonth()];
    var date = created_date.getDate();
    var hour = created_date.getHours().toString();
    var min = created_date.getMinutes();
    var sec = created_date.getSeconds();
    var time =
      month + " " + date + "," + " " + year + "," + " " + hour + ":" + min;

    return time;
  }
};

export const formatDate = (createdDate: number | undefined) => {
  if (createdDate) {
    var created_date = new Date(createdDate);

    var year = created_date.getFullYear();
    var month =
      created_date.getMonth() > 9
        ? created_date.getMonth()
        : `0${created_date.getMonth()}`;
    var date =
      created_date.getDate() > 9
        ? created_date.getDate()
        : `0${created_date.getDate()}`;

    var time = year + "-" + month + "-" + date;

    return time;
  }
};
