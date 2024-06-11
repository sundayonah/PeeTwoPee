import React, { useState } from "react";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import BackBtn from "./components/BackBtn";
import CloseBtn from "./components/CloseBtn";
import ContentBox from "./components/ContentBox";
import DoneBtn from "./components/DoneBtn";
import NextBtn from "./components/NextBtn";
import SkipBtn from "./components/SkipBtn";
import TitleBox from "./components/TitleBox";
import LinkBox from "./components/LinkBox";
import { Link,Box,Flex } from "@chakra-ui/react";
import { ExternalLinkIcon } from "../../theme/components/Icons";


export const welcomeSteps = [
  {
    target: ".Null",
    title: <TitleBox>Null</TitleBox>,
    content: "I purposely left this step empty",
  },

  {
    target: ".WalletConn",
    title: <TitleBox>Download Wallet</TitleBox>,
    content: (
      <ContentBox>
    To interact with the P2P Dapp, you need a web3 wallet to connect to our platform
    <LinkBox>
         <Link href="https://www.binance.com/en/desktop-download" isExternal  >
    <Flex gap="5px">Download Wallet here <Box mt="4px">
         <ExternalLinkIcon />
          </Box>
    </Flex>
</Link> 
    </LinkBox>
      </ContentBox>
    ),
    placement: "bottom",
    locale: {
      next: <NextBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
  {
    target: ".WalletConn",
    title: <TitleBox>Connect Wallet </TitleBox>,
    content: (
      <ContentBox>
      To start the journey, you have to connect a supported wallet before you can trade.
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
    target: ".CreateAccount",
    title: <TitleBox>Create Account</TitleBox>,
    content: (
      <ContentBox>
      After connecting your wallet, you can go ahead to creating your P2P account for trading.
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
    target: ".TutVideo",
    title: <TitleBox>Tutorial Videos</TitleBox>,
    content: (
      <ContentBox>
      You can always go back to watching tutorial videos in case you get stuck trying to do something.
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
    target: ".AccDrop",
    title: <TitleBox>Account Dropdown</TitleBox>,
    content: (
      <ContentBox>
       On the Account dropdown, you can have quick access to different pages on the platform.
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
