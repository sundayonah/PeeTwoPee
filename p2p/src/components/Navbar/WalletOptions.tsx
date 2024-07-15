import React, { useEffect, useState } from 'react';
import { Flex, Text } from "@chakra-ui/layout";
import {
  Button,
  Image,
  ModalBody,
  ModalHeader,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { ethers } from 'ethers';
import MetaMaskImage from "../../assets/metamask.svg";
import TrustWallet from "../../assets/TrustWallet.svg";
import BinanceWallet from "../../assets/BNB.svg";
import WalletConnect from "../../assets/walletconnect-logo.svg";
import SafePal from "../../assets/safepal-sfp.svg";
import Unstoppable from "../../assets/unstoppable.svg";

import { ConnectorNames } from "../../connectors";
import { useActiveWeb3React } from '../../utils/hooks';

const WalletItem = ({
  name,
  image,
  connect,
  mobile,
}: {
  name: string;
  image: string;
  connect: Function;
  mobile: boolean;
}) => {
  const borderColor = useColorModeValue("lightBg.200", "darkBg.100");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");


  return (
    <Flex
      display={isMobileDevice && !mobile ? "none" : undefined}
      h='50px'
      cursor='pointer'
      _hover={{ border: "1px solid #4CAFFF" }}
      alignItems='center'
      p={9}
      my={4}
      border={"1px solid"}
      borderColor={borderColor}
      borderRadius={"6px"}
      onClick={() => connect()}
    >
      <Image src={image} alt='wallet image' mr={4} boxSize={"30px"} />
      <Text _hover={{ color: "#4CAFFF" }}>{name}</Text>
    </Flex>
  );
};

const WalletOptions = ({ connect }: { connect: Function }) => {

  const walletItems = [
    {
      name: "MetaMask",
      image: MetaMaskImage,
      id: ConnectorNames.Injected,
      connect,
      mobile: false,
    },
    {
      name: "Trust Wallet",
      image: TrustWallet,
      id: ConnectorNames.Injected,
      connect,
      mobile: false,
    },
    {
      name: "Binance Chain Wallet",
      image: BinanceWallet,
      id: ConnectorNames.BSC,
      connect,
      mobile: false,
    },
    {
      name: "Unstoppable Login",
      image: Unstoppable,
      id: ConnectorNames.UAUTH,
      connect,
      mobile: true,
    },
    {
      name: "Wallet Connect",
      image: WalletConnect,
      id: ConnectorNames.WalletConnect,
      connect,
      mobile: true,
    },
    {
      name: "SafePal",
      image: SafePal,
      id: ConnectorNames.Injected,
      connect,
      mobile: true,
    },
  ];
  return (
    <>
      <ModalHeader mt={4} fontWeight='regular' fontSize={"20px"}>
        Choose a wallet
      </ModalHeader>
      <ModalBody mt={4}>
        {walletItems.map((item, i) => (
          <WalletItem
            key={i}
            name={item.name}
            image={item.image}
            connect={() => item.connect(item.id)}
            mobile={item.mobile}
            />
          ))}

      </ModalBody>
    </>
  );
};

export default WalletOptions;

//   // Function to sign the message
// async function signMessage() {
//   try {
//      const message = "Please sign this message to connect";
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const privateKey = '159034a2e73b4b3b3fea3892a9fec896f9cda831c905c7c06e2c711e6a317343'; // Replace with your actual private key
//     const wallet = new ethers.Wallet(privateKey);
//     console.log(wallet)
//     const signature = await wallet.signMessage(message);
//     console.log(`Signature: ${signature}`);
//     // Handle the signature as needed
//   } catch (error) {
//     console.error("Error signing message:", error);
//   }
// }


