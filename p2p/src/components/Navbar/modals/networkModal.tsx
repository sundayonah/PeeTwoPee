import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import WalletOptions from "../WalletOptions";
import { connectorKey, ConnectorNames } from "../../../connectors";
import useAuth from "../../../utils/hooks/useAuth";
import { ethers } from "ethers";
import { useActiveWeb3React } from "../../../utils/hooks";

export default function NetworkModal({
  displayNetwork,
  setDisplayNetwork,
}: {
  displayNetwork: boolean;
  setDisplayNetwork: Function;
}) {
  const bgColor3 = useColorModeValue("#DEE6ED", "#4A739B");
  const shadow = useColorModeValue(
    "0px 1px 7px -2px rgba(24, 39, 75, 0.06), 0px 2px 2px rgba(24, 39, 75, 0.06)",
    "0px 2px 4px -2px rgba(178, 193, 230, 0.12), 0px 4px 4px -2px rgba(178, 193, 230, 0.08)"
  );
  const bg = useColorModeValue("#FFFFFF", "#15202B");
  const buttonBorder = useColorModeValue("gray.200", "gray.100");
    const { account, error, active } = useActiveWeb3React();

  const { login } = useAuth();

  const signMessageFunction = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const message = "Please sign this message to connect";
      const signature = await signer.signMessage(message);
      // console.log(signature);

      const verify = ethers.utils.verifyMessage(message, signature);
      // console.log(verify);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

    // const connectWallet = async (connectorID: ConnectorNames) => {
  // try {
  //   // Wait for the login process to complete
  //   const loginStatement = await login(connectorID);
  //   console.log(loginStatement, "login")
  //   // After successful login, proceed to sign the message
  //   console.log({active, account})
  //   if (active) {
  //     await signMessageFunction();
  //   }
  //   setDisplayNetwork(false);
  // } catch (error) {
  //   console.error("Failed to connect wallet:", error);
  //   setDisplayNetwork(false);
  // }

  // sessionStorage.setItem(connectorKey, connectorID);
  // };

  const connectWallet = async (connectorID: ConnectorNames): Promise<boolean> => {
  try {
    // Wait for the login process to complete
    await login(connectorID);
    // console.log(connectorID)
    // After successful login, proceed to sign the message
    setDisplayNetwork(false);
    sessionStorage.setItem(connectorKey, connectorID);
    signMessageFunction()
    return true; // Return true indicating success
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    setDisplayNetwork(false);
    return false; // Return false indicating failure
  }
  };
    

  return (
    <>
      <Modal
        isOpen={displayNetwork}
        onClose={() => setDisplayNetwork(false)}
        isCentered
       >
        <ModalOverlay />
        <ModalContent
          width='90vw'
          borderRadius='6px'
          border={"1px solid"}
          borderColor={bgColor3}
          minHeight='40vh'
          boxShadow={shadow}
          bg={bg}
        >
          <ModalCloseButton
            bg='none'
            size={"sm"}
            mt={6}
            mr={3}
            cursor='pointer'
            _focus={{ outline: "none" }}
            onClick={() => setDisplayNetwork(false)}
            p={"7px"}
            border={"1px solid"}
            borderColor={buttonBorder}
          />
          <WalletOptions connect={connectWallet} />
          {/* <WalletOptions connect={connectWallet} signMessage={signMessageFunction} /> */}
        </ModalContent>
      </Modal>
    </>
  );
}


