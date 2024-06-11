import React, { useState } from "react";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import BackBtn from "./components/BackBtn";
import CloseBtn from "./components/CloseBtn";
import ContentBox from "./components/ContentBox";
import DoneBtn from "./components/DoneBtn";
import NextBtn from "./components/NextBtn";
import SkipBtn from "./components/SkipBtn";
import TitleBox from "./components/TitleBox";
import { Link,Box,Flex } from "@chakra-ui/react";
import { ExternalLinkIcon } from "../../theme/components/Icons";
import LinkBox from "./components/LinkBox";

// export const DropdownSteps = [
//   {
//     target: ".Null",
//     title: <TitleBox>Null</TitleBox>,
//     content: "I purposely left this step empty",
//   },
//   {
//     target: ".wallet_onboard",
//     title: <TitleBox>Wallet</TitleBox>,
//     content: (
//       <ContentBox>
//      You can access balances and manange your wallet here. Wiew transactions, add tokens, etc.
//       </ContentBox>
//     ),
//     placement: "bottom",
//     locale: {
//       next: <NextBtn />,
//       back: <BackBtn />,
//       close: <CloseBtn />,
//       last: <DoneBtn />,
//       skip: <SkipBtn />,
//     },
//   },
//   {
//     target: ".current_onboard",
//     title: <TitleBox>Current Trade</TitleBox>,
//     content: (
//       <ContentBox>
//      If you have ongoing trades with vendors, you can quickly access them from here.
//       </ContentBox>
//     ),
//     placement: "bottom",
//     locale: {
//       next: <NextBtn />,
//       back: <BackBtn />,
//       close: <CloseBtn />,
//       last: <DoneBtn />,
//       skip: <SkipBtn />,
//     },
//   },
//   {
//     target: ".my_ads_onboard",
//     title: <TitleBox>My Ads</TitleBox>,
//     content: (
//       <ContentBox>
//    Your BUY and SELL ads can be viewed from here. You can manage existing ads or create new ones.
//       </ContentBox>
//     ),
//     placement: "bottom",
//     locale: {
//       next: <NextBtn />,
//       back: <BackBtn />,
//       close: <CloseBtn />,
//       last: <DoneBtn />,
//       skip: <SkipBtn />,
//     },
//   },
//   {
//     target: ".profile_onboard",
//     title: <TitleBox>Profile</TitleBox>,
//     content: (
//       <ContentBox>
//    Your profile page contains your account details, payment methods, etc. You can become a merchant or a council member from here.
//       </ContentBox>
//     ),
//     placement: "bottom",
//     locale: {
//       next: <NextBtn />,
//       back: <BackBtn />,
//       close: <CloseBtn />,
//       last: <DoneBtn />,
//       skip: <SkipBtn />,
//     },
//   },
//   {
//     target: ".disputes_onboard",
//     title: <TitleBox>Disputes</TitleBox>,
//     content: (
//       <ContentBox>
//   Disputes are handled by council members or merchants and handling disputes depend on how much your stake value holds.
//       </ContentBox>
//     ),
//     placement: "bottom",
//     locale: {
//       next: <NextBtn />,
//       back: <BackBtn />,
//       close: <CloseBtn />,
//       last: <DoneBtn />,
//       skip: <SkipBtn />,
//     },
//   },
//   {
//     target: ".demo_onboard",
//     title: <TitleBox>Demo Account</TitleBox>,
//     content: (
//       <ContentBox>
//  As an account holder, you can switch between Demo or Live Accounts. Demo accounts allow you trade with unlimited tokens for free, to allow you familiarize with the system.
//       </ContentBox>
//     ),
//     placement: "bottom",
//     locale: {
//       next: <NextBtn />,
//       back: <BackBtn />,
//       close: <CloseBtn />,
//       last: <DoneBtn />,
//       skip: <SkipBtn />,
//     },
//   },
// ];


export const DropdownSteps = [
    {
      target: ".Null",
      title: <TitleBox>Null</TitleBox>,
      content: "I purposely left this step empty",
    },
      {
      target: ".Wallet",
      title: <TitleBox>Wallet</TitleBox>,
      content: (
        <ContentBox>
         You can access balances and manage your wallet here. View transactions, add tokens, etc.
        </ContentBox>
      ),
      placement: "bottom",
      locale: {
        next: <NextBtn />,
        back: <BackBtn />,
        close: <CloseBtn />,
        last: <DoneBtn />,
        skip: <SkipBtn />,
      },
    },
  
    {
      target: ".Trades",
      title: <TitleBox>Current Trade</TitleBox>,
      content: (
        <ContentBox>
      If you have ongoing trades with vendors, you can quickly access them from here.
        </ContentBox>
      ),
      placement: "bottom",
      locale: {
        next: <NextBtn />,
        back: <BackBtn />,
        close: <CloseBtn />,
        last: <DoneBtn />,
        skip: <SkipBtn />,
      },
    },
    {
      target: ".MyAds",
      title: <TitleBox>My Ads</TitleBox>,
      content: (
        <ContentBox>
        Your BUY and SELL ads can be viewed from here. You can manage existing ads or create new ones.
        </ContentBox>
      ),
      placement: "bottom",
      locale: {
        next: <NextBtn />,
        back: <BackBtn />,
        close: <CloseBtn />,
        last: <DoneBtn />,
        skip: <SkipBtn />,
      },
    },
    {
      target: ".Profile",
      title: <TitleBox>Profile</TitleBox>,
      content: (
        <ContentBox>
        Your profile page contains your account details, payment methods, etc. You can become a merchant or a council member from here.
        </ContentBox>
      ),
      placement: "bottom",
      locale: {
        next: <NextBtn />,
        back: <BackBtn />,
        close: <CloseBtn />,
        last: <DoneBtn />,
        skip: <SkipBtn />,
      },
    },
  
    {
      target: ".Dispute",
      title: <TitleBox>Disputes</TitleBox>,
      content: (
        <ContentBox>
        Disputes are handled by council members or merchants, and handling disputes depend on how much your stake value holds.
        </ContentBox>
      ),
      placement: "bottom",
      locale: {
        next: <NextBtn />,
        back: <BackBtn />,
        close: <CloseBtn />,
        last: <DoneBtn />,
        skip: <SkipBtn />,
      },
    },
  
    {
      target: ".Demo",
      title: <TitleBox>Demo Account</TitleBox>,
      content: (
        <ContentBox>
       As an account holder, you can switch between Demo or Live Accounts. Demo accounts allow you trade with unlimited tokens for free, to allow you familiarize with the system.
        </ContentBox>
      ),
      placement: "bottom",
      locale: {
        next: <NextBtn />,
        back: <BackBtn />,
        close: <CloseBtn />,
        last: <DoneBtn />,
        skip: <SkipBtn />,
      },
    },
   
  ];
  