import React, { useState } from "react";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import BackBtn from "./components/BackBtn";
import CloseBtn from "./components/CloseBtn";
import ContentBox from "./components/ContentBox";
import DoneBtn from "./components/DoneBtn";
import NextBtn from "./components/NextBtn";
import SkipBtn from "./components/SkipBtn";
import TitleBox from "./components/TitleBox";


export const buySteps = [
  {
    target: ".Null",
    title: <TitleBox>Null</TitleBox>,
    content: "I purposely left this step empty",
  },
  {
    target: ".TokenSelect",
    title: <TitleBox>Token Selection</TitleBox>,
    content: (
      <ContentBox>
        You can select the token / cryptocurrency you'll like to buy. Selecting a
        token means you'll only see <span style={{fontWeight : 'bold'}}>BUY ads</span> for that particular token.
      </ContentBox>
    ),
    placement: "left-start",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".FIatCurrency",
    title: <TitleBox> FIat Currency</TitleBox>,
    content: (
      <ContentBox>
        Fiat currencies are your local currencies, such as the US dollar,
        Nigerian Naira, Euro, British Pound, etc., and are used to buy tokens or
        cryptocurrencies. You need to select a fiat currency to buy token / crypto
      </ContentBox>
    ),
    //placement: "right-start",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".Amount",
    title: <TitleBox>Amount</TitleBox>,
    content: (
      <ContentBox>
        This amount refers to the price of the token or cryptocurrency. You can
        choose to enter an amount of token price to filter the results of the
        BUY ads.
      </ContentBox>
    ),
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".PayMethod",
    title: <TitleBox>Payment methods</TitleBox>,
    content: (
      <ContentBox>
        Vendors on the platform might have different payment methods. When
        selecting a vendor, ensure their payment method matches your prefered
        method of payment
      </ContentBox>
    ),
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".BuyAds",
    title: <TitleBox>Buy Ads</TitleBox>,
    content: (
      <ContentBox>
        We have displayed <span style={{fontWeight : 'bold'}}>BUY ads </span> from different vendors across. They all have
        details like <span style={{fontWeight : 'bold'}}> Name of Vendor, Completion Rate, Cryto Price ,Limit and
        Available Quality, Payment Methods,</span>etc .
      </ContentBox>
    ),
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
    title: <TitleBox>BUY TOKEN</TitleBox>,
    content: (
      <ContentBox>
        Once you see a vendor that matches your taste, you can start the trading
        process by clicking on the <span style={{fontWeight : 'bold'}}>BUY BUTTON.</span></ContentBox>
    ),
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
];
