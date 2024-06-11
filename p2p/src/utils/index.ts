import { getAddress } from "@ethersproject/address";
const Notify = require("../assets/RigelP2Pnotification.mp3");

export * from "./Contracts";
export * from "./addresses";
export * from "./getExplorerLink";
export * from "./getLibrary";
export * from "./utilsFunctions";

// returns the checksummed address if the address for valid address or returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch (e) {
    return false;
  }
}

export function numberWithCommas(x: number | string) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// shortens the address to the format: 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}
export function shortenInfo(text: string, chars = 14): string {

  return `${text.substring(0, chars + 2)}...${text.substring(
    text.length - chars
  )}`;
}
export function ParseFloat(str: string | number, val: number) {
  if(str){
    const value = str.toString();
  if (!value.includes(".")) return value;
  return value.slice(0, value.indexOf(".") + val + 1);
  }
}

export const formatMongodbTime = (createdDate: string | undefined,short?:boolean,type?:string) => {
  if (createdDate) {
    var created_date = new Date(parseFloat(createdDate));

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
   //  
    var year = created_date.getFullYear();
    var month = months[created_date.getMonth()];
    var date = created_date.getDate();
    var hour = created_date.getHours().toString();
    var min = created_date.getMinutes() < 9 ? `0${created_date.getMinutes()}` : created_date.getMinutes();
    var sec = created_date.getSeconds() < 9 ? `0${created_date.getSeconds()}` : created_date.getSeconds() ;
    var time =
      year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
    const timeData =  hour + ":" + min + ":" + sec 
    const dateData = year + "-" + month + "-" + date
    return short && type==="date" ? dateData : short && type==="time" ?  timeData :  time ;
  }
};



export const playSound = () => {
  const audio = new Audio(Notify);
  audio.volume = 0.5; // Set volume to 50%
  audio.play();
};

export const getNetwork = (chainid : any ) => {
  const SupportedChainName = {
    56: "binance",
    97: "binanceTest",
    137: "polygon",
    80001: "polygonTest",
  };
  return SupportedChainName[chainid]

}
