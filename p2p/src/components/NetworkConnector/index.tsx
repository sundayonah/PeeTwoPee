import {
  Button,
  Modal,
  Box,
  Text,
  Flex,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Img,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BinanceIcon, EthereumIcon } from "./Icons";
import { useColorModeValue } from "@chakra-ui/react";
import { CHAIN_INFO } from "../../constants/chains";
import { switchNetwork } from "../../utils/utilsFunctions";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import MATICLOGO from "../../assets/maticlogo.png";
import OASISLOGO from "../../assets/oasis.png";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setChainId } from "../../state/user";
import { useTranslation } from "react-i18next";

function NetworkIndicator() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mode = useColorModeValue("light", "dark");
  const { chainId, library, account, error, active } = useActiveWeb3React();
  const buttonBgColor = useColorModeValue("white", "#213345");
  const textColor = useColorModeValue("#319EF6", "#4CAFFF");
  const [isUnsupportedNtwrk, setIsUnsupportedNtwrk] = useState(false);

  const { chainId: stateChainId } = useSelector(
    (state: RootState) => state.user
  );

  const {t} = useTranslation()

  const dispatch = useDispatch();

  const info = chainId ? CHAIN_INFO[chainId] : CHAIN_INFO[stateChainId];

  const networkConnected = sessionStorage.getItem("connectv2");

  const wallet: boolean = networkConnected === "injected";

  const changeNetwork = (network: string) => {
    if (account) {
      onClose();
      if (wallet) {
        const chainId = Web3.utils.hexToNumber(network);
        switchNetwork(network, account as string, library);
        dispatch(setChainId(chainId));
      }
    } else {
      onClose();
      const chainId = Web3.utils.hexToNumber(network);
      dispatch(setChainId(chainId));
    }
  };

  useEffect(() => {
    setIsUnsupportedNtwrk(false);
    if (error?.name === "UnsupportedChainIdError") {
      setIsUnsupportedNtwrk(true);
    }
  }, [error, active]);

  // if (!chainId || !info || !library) {
  //   return null;
  // }
  return (
    <>
      <Button
        display={isUnsupportedNtwrk ? "none" : undefined}
        _hover={{ bgColor: buttonBgColor }}
        _active={{ bgColor: buttonBgColor }}
        bgColor={buttonBgColor}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        onClick={onOpen}
        width={["120px","120px","auto"]}
        mr={1}
        className='Network'
      >
        <Flex alignItems='center'>
          <Box mr={2}>
            {info?.label == "Binance" ? (
              <BinanceIcon />
            ) : // <EthereumIcon />
            info?.label == "BSC Testnet" ? (
              <BinanceIcon />
            ) : info?.label == "Polygon" ? (
              <Img w='30px' src={MATICLOGO} />
            ) : info?.label == "Mumbai Testnet" ? (
              <Img w='30px' src={MATICLOGO} />
            ) : info?.label == "Oasis Emerald Testnet" ? (
              <Img w='30px' src={OASISLOGO} />
            ) : info?.label == "Oasis Emerald Mainnet" ? (
              <Img w='30px' src={OASISLOGO} />
            ) : (
              <EthereumIcon />
            )}
          </Box>
          <Text textColor={textColor} fontSize={["12px","12px",'14px']}>
            {info?.label}
          </Text>
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='sm'>
        <ModalOverlay />
        <ModalContent>
          <Flex flexDirection='column' mx={5}>
            <Flex my={4}>
              <ModalCloseButton
                border={
                  mode === "dark" ? "1px solid #FFF" : "1px solid #666666"
                }
              />
            </Flex>
            <Flex mt={8}>
              <Text
                fontSize='20px'
                lineHeight='28px'
                color={mode === "dark" ? "#F1F5F8" : "#333333"}
              >
                {t('change_network')}
              </Text>
            </Flex>
            <Flex>
              <Text
                fontSize='16px'
                lineHeight='28px'
                color={mode === "dark" ? "#F1F5F8" : "#333333"}
                mb={3}
              >
                {t('network_on')}{" "}
                <span style={{ color: "#319EF6" }}>
                  {info?.nativeCurrency.name}
                </span>{" "}
                {t('network')}.
              </Text>
            </Flex>
            {/* <Flex
              backgroundColor={mode === 'dark' ? '#15202B' : '#FFFFFF'}
              border={
                mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'
              }
              borderRadius="6px"
              py={4}
              px={3}
              mb={3}
              cursor="pointer"
              textAlign={'left'}
              onClick={() => changeNetwork('0x3')}
            >
              <Tooltip
                hasArrow
                label="Not Supported by this Wallet."
                aria-label="A tooltip"
                placement="top"
                isDisabled={wallet}
              >
                <Flex>
                  <Box px={2}>
                    <EthereumIcon />
                  </Box>
                  <Box>{CHAIN_INFO[3]?.label}</Box>
                </Flex>
              </Tooltip>
            </Flex> */}
            <Flex
              display={
                info?.label === CHAIN_INFO[56].label ? "none" : undefined
              }
              backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
              border={
                mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
              }
              borderRadius='6px'
              py={4}
              px={3}
              mb={3}
              cursor='pointer'
              onClick={() => changeNetwork("0x38")}
            >
              <Box px={2}>
                <BinanceIcon />
              </Box>
              <Box>{CHAIN_INFO[56].label} Smart Chain</Box>
            </Flex>
            <Flex
              display={
                info?.label === CHAIN_INFO[97].label ? "none" : undefined
              }
              backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
              border={
                mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
              }
              borderRadius='6px'
              py={4}
              px={3}
              mb={3}
              cursor='pointer'
              onClick={() => changeNetwork("0x61")}
            >
              <Box px={2}>
                <BinanceIcon />
              </Box>
              <Box>{CHAIN_INFO[97].label}</Box>
            </Flex>
            <Flex
              display={
                info?.label === CHAIN_INFO[137].label ? "none" : undefined
              }
              backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
              border={
                mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
              }
              borderRadius='6px'
              px={3}
              py={4}
              mb={4}
              cursor='pointer'
              onClick={() => changeNetwork("0x89")}
            >
              <Tooltip
                hasArrow
                label='Not Supported by this Wallet.'
                aria-label='A tooltip'
                placement='top'
                isDisabled={wallet}
              >
                <Flex>
                  <Box px={2}>
                    <Img w='30px' src={MATICLOGO} />
                  </Box>
                  <Box>{CHAIN_INFO[137].label}</Box>
                </Flex>
              </Tooltip>
            </Flex>
            <Flex
              backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
              border={
                mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
              }
              borderRadius='6px'
              px={3}
              py={4}
              mb={4}
              cursor='pointer'
              onClick={() => changeNetwork("0x13881")}
              display={
                info?.label === CHAIN_INFO[80001].label ? "none" : undefined
              }
            >
              <Tooltip
                hasArrow
                label='Not Supported by this Wallet.'
                aria-label='A tooltip'
                placement='top'
                isDisabled={wallet}
              >
                <Flex>
                  <Box px={2}>
                    <Img w='30px' src={MATICLOGO} />
                  </Box>
                  <Box>{CHAIN_INFO[80001].label}</Box>
                </Flex>
              </Tooltip>
            </Flex>
            {/* <Flex
              backgroundColor={mode === 'dark' ? '#15202B' : '#FFFFFF'}
              border={
                mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'
              }
              borderRadius="6px"
              px={3}
              py={4}
              mb={4}
              cursor="pointer"
              onClick={() => changeNetwork('0xa516')}
            >
              <Tooltip
                hasArrow
                label="Not Supported by this Wallet."
                aria-label="A tooltip"
                placement="top"
                isDisabled={wallet}
              >
                <Flex>
                  <Box px={2}>
                    <Img w="30px" src={OASISLOGO} />
                  </Box>
                  <Box>{CHAIN_INFO[42262].label}</Box>
                </Flex>
              </Tooltip>
            </Flex> */}
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NetworkIndicator;
