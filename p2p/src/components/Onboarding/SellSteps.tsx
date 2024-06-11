
import BackBtn from "./components/BackBtn";
import CloseBtn from "./components/CloseBtn";
import ContentBox from "./components/ContentBox";
import DoneBtn from "./components/DoneBtn";
import NextBtn from "./components/NextBtn";
import SkipBtn from "./components/SkipBtn";
import TitleBox from "./components/TitleBox";
// export const SellSteps = function (){
//   return
// }
export const SellSteps = [
  {
    target: ".Null",
    title: <TitleBox>Null</TitleBox>,
    content: "I purposely left this step empty",
  },

  {
    target: ".BuyAds",
    title: <TitleBox>Sell Ads </TitleBox>,
    content: (  
      <ContentBox>

       We have displayed SELL ads from different vendors across. They all have detailsblike Name of Vendor, Completion Rate, Cryto price, Limit and Available Quality, Payment Method, etc.
      </ContentBox>
    ),
    placement: "left",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
  {
    target: ".BuyTkn",
    title: <TitleBox>Sell TOKEN</TitleBox>,
    content: (
      <ContentBox>
      once you see a vendor that matches your taste, you can start the trading process by clicking on the SELL BUTTON
      </ContentBox>
    ),
    placement: "left",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  }, 
];
