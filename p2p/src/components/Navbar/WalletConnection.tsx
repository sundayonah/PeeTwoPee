import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Button,
  useColorModeValue,
  useMediaQuery,
  HStack,
  Box,
  
} from "@chakra-ui/react";
import { IoWalletOutline } from "react-icons/io5";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import { useNativeBalance, useRGPBalance } from "../../utils/hooks/useBalances";
import { useRGPPrice } from "../../utils/hooks/useTokenPrices";
import NetworkModal from "./modals/networkModal";
import StatusIcon from "./StatusIcon";
import RGPModal from "./modals/RGPModal";
import { shortenAddress } from "../../utils";
import UnsupportNetwork from "./UnsupportNetwork";
import WalletModal from "./modals/walletModal";
import { uauth } from "../../connectors";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";

export default function WalletConnection() {
  const [isMobileDevice] = useMediaQuery("(max-width: 1200px)");
  const { account, error, connector } = useActiveWeb3React();
  const [userDomain, setUserDomain] = useState(null);
  const bg = useColorModeValue("#FFFFFF", "#15202B");
  const bgColor = useColorModeValue("lightBg.100", "darkBg.100");
  const bgColor2 = useColorModeValue("lightBg.200", "darkBg.100");
  const { t } = useTranslation()

  const [Balance, Symbol] = useNativeBalance();
  const [displayWallet, setDisplayWallet] = useState(false);
  const [displayNetwork, setDisplayNetwork] = useState(false);
  const [RGPBalance] = useRGPBalance();
  const [RGPPrice] = useRGPPrice();
  const [showRGP, setShowRGP] = useState(false);
  const [modalDisplay, setDisplayModal] = useState(false);

  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );
  useEffect(() => {
    const init = async () => {
      try {
        const auth = await uauth.uauth.user();
        if (auth?.sub) {
          setUserDomain(auth.sub);
        }
      } catch (e) {
        setUserDomain(null);
      }
    };
    init();
  }, [account]);

  if (account) {
    return (
      <>
        {!isDemoAccount ? (
          <Button
            display={isMobileDevice ? "none" : undefined}
            variant="rgpButton"
            bg={bgColor}
            onClick={() => setShowRGP(true)}
            fontSize="14px"
          >
            {RGPBalance} {RGPBalance ? "RGP" : "0.0000 RGP"}
          </Button>
        ) : (
          <Box width={'88.68px'} h={'40px'} p={2} borderRadius={3} bg={'#EBF6FE'}>
          <HStack >
            <svg
              width="19"
              height="9"
              viewBox="0 0 19 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9988 4.30151C18.9988 1.98764 17.1758 0.000976562 14.4879 0.000976562C12.5247 0.000976562 11.1457 0.959248 9.64984 2.61869C8.22412 1.00599 6.7984 0.000976562 4.81173 0.000976562C2.07715 0.000976562 0.324219 1.98764 0.324219 4.30151C0.324219 6.63876 2.10053 8.57868 4.76499 8.57868C6.75165 8.57868 8.154 7.57366 9.64984 5.89084C11.1223 7.57366 12.5247 8.57868 14.5113 8.57868C17.1758 8.57868 18.9988 6.63876 18.9988 4.30151ZM8.27086 4.25477C7.12561 5.63374 6.23746 6.35829 5.04546 6.35829C3.71323 6.35829 2.77833 5.56363 2.77833 4.27814C2.77833 2.99265 3.71323 2.22136 5.04546 2.22136C6.23746 2.22136 7.14898 2.94591 8.27086 4.25477ZM16.5447 4.27814C16.5447 5.56363 15.6098 6.35829 14.2776 6.35829C13.0856 6.35829 12.1741 5.63374 11.0288 4.25477C12.1507 2.94591 13.0622 2.22136 14.2542 2.22136C15.6332 2.22136 16.5447 2.99265 16.5447 4.27814Z"
                fill="#319EF6"
              />
            </svg>
         <Text pl={'11px'} fontWeight={500} fontSize='18px' color={'#319EF6'}>RGP</Text>   
          </HStack>
          </Box>
        )}
        <RGPModal
          showRGP={showRGP}
          setShowRGP={setShowRGP}
          RGPBalance={RGPBalance}
          RGPPrice={RGPPrice}
        />
        <Flex
          ml={2}
          w={isMobileDevice ? "160px" : "max-content"}
          borderRadius="md"
          border={"1px solid"}
          borderColor={bgColor2}
          h="10"
          justify="space-between"
        >
         {!isDemoAccount ?  <Flex
            display={isMobileDevice ? "none" : undefined}
            align="center"
            justify="center"
            bg={bgColor2}
            px={1}
          >
            <Text fontWeight={"bold"} fontSize='12px'>
              {Balance} {Symbol}
            </Text>
          </Flex> : 
          
          <Box width={'88.68px'} h={'38px'} p={2} borderRadius={3} bg={'#F2F5F8'}>
          <HStack >
            <svg
              width="19"
              height="9"
              viewBox="0 0 19 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9988 4.30151C18.9988 1.98764 17.1758 0.000976562 14.4879 0.000976562C12.5247 0.000976562 11.1457 0.959248 9.64984 2.61869C8.22412 1.00599 6.7984 0.000976562 4.81173 0.000976562C2.07715 0.000976562 0.324219 1.98764 0.324219 4.30151C0.324219 6.63876 2.10053 8.57868 4.76499 8.57868C6.75165 8.57868 8.154 7.57366 9.64984 5.89084C11.1223 7.57366 12.5247 8.57868 14.5113 8.57868C17.1758 8.57868 18.9988 6.63876 18.9988 4.30151ZM8.27086 4.25477C7.12561 5.63374 6.23746 6.35829 5.04546 6.35829C3.71323 6.35829 2.77833 5.56363 2.77833 4.27814C2.77833 2.99265 3.71323 2.22136 5.04546 2.22136C6.23746 2.22136 7.14898 2.94591 8.27086 4.25477ZM16.5447 4.27814C16.5447 5.56363 15.6098 6.35829 14.2776 6.35829C13.0856 6.35829 12.1741 5.63374 11.0288 4.25477C12.1507 2.94591 13.0622 2.22136 14.2542 2.22136C15.6332 2.22136 16.5447 2.99265 16.5447 4.27814Z"
                fill="#333333"
              />
            </svg>
         <Text pl={'11px'} fontWeight={500} fontSize='18px' color={'#333333'}> {Symbol}</Text>   
          </HStack>
          </Box>
          }
          {!isDemoAccount &&<Button
            onClick={() => setDisplayWallet((state) => !state)}
            variant={"ghost"}
            fontSize='12px'
          width={["120px","120px","auto"]}
            rightIcon={<StatusIcon connector={connector} />}
          >
            {userDomain ? userDomain : shortenAddress(account)}
          </Button>}
        </Flex>
        <WalletModal
          displayWallet={displayWallet}
          accounts={account}
          setDisplayWallet={setDisplayWallet}
        />
      </>
    );
  } else if (error) {
    return (
      <>
        {error.name === "UnsupportedChainIdError" ? (
          <>
            {" "}
            <Button
              bg='red.300'
              _hover={{ bg: "red.300" }}
              _active={{ bg: "red.300" }}
              rightIcon={<IoWalletOutline />}
              variant='brand'
              onClick={() => setDisplayModal((state) => !state)}
            >
              Switch Network
            </Button>
            <UnsupportNetwork
              openModal={modalDisplay}
              setDisplayModal={setDisplayModal}
            />
          </>
        ) : (
          "Error"
        )}
      </>
    );
  } else {
    return (
      <>
        <Button
          className='WalletConn'
          data-tut='reactour__WalletConnect'
          onClick={() => {
            setDisplayNetwork((state) => !state);
            sessionStorage.removeItem("walletconnect");
          }}
          rightIcon={<IoWalletOutline />}
          variant='brand'
          fontSize={["12px","12px",'14px']}
          width={["120px","120px","180px"]}
        >
         {t('connect_wallet')}
        </Button>
        <NetworkModal
          displayNetwork={displayNetwork}
          setDisplayNetwork={setDisplayNetwork}
        />
      </>
    );
  }
}
