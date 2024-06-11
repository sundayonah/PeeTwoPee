import { Box, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react";

import AnimationYello from "../../assets/animation.svg";
import React from "react";

import detectEthereumProvider from "@metamask/detect-provider";
const MATICLOGO = require("../../assets/maticlogo.png");
const UnsupportedNetwork = () => {
  const checkMetamask = () => {
    const provider = detectEthereumProvider();
    return !!provider;
  };

  const switchToSupportedNetwrk = async (chain: string) => {
    if (checkMetamask()) {
      try {
        const provider: any = await detectEthereumProvider();
        await provider?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chain }],
        });
        window.location.reload();
      } catch (switchError) {
      }
    }
  };

  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  return (
    <Flex
      justifyContent='center'
      my={10}
      mt={10}
      mx={isMobileDevice ? 10 : 5}
      alignItems='center'
      flexDirection={"column"}
    >
      <Box>
        <Img src={AnimationYello} />
      </Box>
      <Text fontSize={32} fontWeight={700} color='#FF3358'>
        Unsupported network connected
      </Text>

      <Text my={5} size='16px' fontWeight={400} color='#DCE5EF'>
        The wallet you connected isn’t supported on this platform. Try to
        connect a different wallet.
      </Text>

      <Text size='16px' fontWeight={400} color='#4CAFFF'>
        {" "}
        See supported networks here
      </Text>
      <Box mt={7}>
        <Flex
          cursor={"pointer"}
          onClick={() => switchToSupportedNetwrk("0x38")}
        >
          <Box ml={8}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'
                fill='#F0B90B'
              />
              <path
                d='M7.52459 11.9998L5.68859 13.8486L3.83984 11.9998L5.68859 10.1511L7.52459 11.9998ZM11.9998 7.52459L15.1618 10.6866L17.0106 8.83784L13.8486 5.68859L11.9998 3.83984L10.1511 5.68859L7.00184 8.83784L8.85059 10.6866L11.9998 7.52459ZM18.3111 10.1511L16.4751 11.9998L18.3238 13.8486L20.1598 11.9998L18.3111 10.1511ZM11.9998 16.4751L8.83784 13.3131L7.00184 15.1618L10.1638 18.3238L11.9998 20.1598L13.8486 18.3111L17.0106 15.1491L15.1618 13.3131L11.9998 16.4751ZM11.9998 13.8486L13.8486 11.9998L11.9998 10.1511L10.1511 11.9998L11.9998 13.8486Z'
                fill='#15202B'
              />
            </svg>
          </Box>

          <Text ml={2} size='16px' fontWeight={400}>
            Binance Smartchain
          </Text>
        </Flex>

        <Flex
          my={5}
          cursor={"pointer"}
          onClick={() => switchToSupportedNetwrk("0x61")}
        >
          <Box ml={8}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'
                fill='#F0B90B'
              />
              <path
                d='M7.52459 11.9998L5.68859 13.8486L3.83984 11.9998L5.68859 10.1511L7.52459 11.9998ZM11.9998 7.52459L15.1618 10.6866L17.0106 8.83784L13.8486 5.68859L11.9998 3.83984L10.1511 5.68859L7.00184 8.83784L8.85059 10.6866L11.9998 7.52459ZM18.3111 10.1511L16.4751 11.9998L18.3238 13.8486L20.1598 11.9998L18.3111 10.1511ZM11.9998 16.4751L8.83784 13.3131L7.00184 15.1618L10.1638 18.3238L11.9998 20.1598L13.8486 18.3111L17.0106 15.1491L15.1618 13.3131L11.9998 16.4751ZM11.9998 13.8486L13.8486 11.9998L11.9998 10.1511L10.1511 11.9998L11.9998 13.8486Z'
                fill='#15202B'
              />
            </svg>
          </Box>

          <Text ml={2} size='16px' fontWeight={400}>
            Binance Smartchain Testnet
          </Text>
        </Flex>

        <Flex
          my={5}
          cursor='pointer'
          onClick={() => switchToSupportedNetwrk("0x89")}
        >
          <Box ml={8}>
            <Img w='25px' src={MATICLOGO} />
          </Box>

          <Text ml={2} size='16px' fontWeight={400}>
            Polygon Mainnet
          </Text>
        </Flex>

        <Flex
          cursor={"pointer"}
          onClick={() => switchToSupportedNetwrk("0x13881")}
        >
          <Box ml={8}>
            <Img w='25px' src={MATICLOGO} />
          </Box>

          <Text ml={2} size='16px' fontWeight={400}>
            Mumbai Testnet
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UnsupportedNetwork;
