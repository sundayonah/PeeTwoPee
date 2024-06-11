import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Img,
  Button,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import BetaDarkLogo from "./../../assets/logo/betalogodark.svg";
import BetaLightLogo from "./../../assets/logo/betlogolight.svg";
// import ChristmasLightLogo from "./../../assets/logo/ChristmasP2Plight.svg";
// import ChristmasDarkLogo from "./../../assets/logo/ChristmasP2Pdark.svg";
import DappDropdown from "./DappsDropdown";
import { NavLink } from "react-router-dom";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import MobileNavDrawer from "./MobileNavDrawer";
import AccountDropDown from "./AccountDropDown";
import WalletConnection from "./WalletConnection";
import SocialMedia from "./SocialMedia";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import NetworkConnector from "../NetworkConnector";
import Notification from "./Notification";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";
export const Nav = ({
  to,
  label,
}: {
  to: string;
  label: string;
  isActive?: boolean;
}) => (
  <NavLink
    to={to}
    style={({ isActive }) => (isActive ? { color: "#319EF6" } : {})}
  >
    {label}
  </NavLink>
);

export default function Index() {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const Logo = useColorModeValue(BetaLightLogo,BetaDarkLogo);
  const {t} = useTranslation()
  const mobileNavColor = useColorModeValue("#FFFFFF", "#15202B");
  const mobileNavBorderColor = useColorModeValue("#DEE5ED", "#324D68");
  const { account } = useActiveWeb3React();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );

  return (
    <>
      {location === "/" ? null : (
        <Flex px={6} py={2} boxShadow='sm'>
          {isMobileDevice ? (
            <>
              <Flex w='100%' justifyContent='space-between' h='10'>
                <Box mr={6}>
                  <NavLink to='/'>
                    {" "}
                    <Img src={Logo} />
                  </NavLink>
                </Box>
                {account && <Notification />}
                <MobileNavDrawer />
              </Flex>
              <Flex
                h='70px'
                zIndex='2'
                position='fixed'
                left={0}
                bottom={0}
                justifyContent='space-between'
                alignItems='center'
                borderTop='1px'
                borderColor={mobileNavBorderColor}
                w='100%'
                bgColor={mobileNavColor}
                mr={2}
                
              >
                <Flex ml="2px">
                  <WalletConnection />
                </Flex>
                <Flex mr={2} alignItems='center'>
                  <NetworkConnector />
                  <ColorModeSwitcher />
                  <SocialMedia />
                  <LanguageSwitcher />
                </Flex>
              </Flex>
            </>
          ) : (
            <>
              <Flex h='10'>
                <Box mr={4}>
                  <NavLink to='/'>
                    {" "}
                    <Img src={Logo} />{" "}
                  </NavLink>
                </Box>
                <DappDropdown />

                <Flex
                  mr='4px'
                  w='360px'
                  h='10'
                  align='center'
                  justify='space-around'
                  fontSize='14px'
                  className='HeaderRide'
                >
                  <Nav label={t('buy')} to='/trade/buy' />
                  <Nav label={t('sell')} to='/trade/sell' />

                  <AccountDropDown />
                  {account && (
                    <Box mr={2}>
                      <Notification />
                    </Box>
                  )}
                </Flex>
              </Flex>
              <Spacer />

              <Flex h='8' justify='flex-end' >
                <Flex>
                 {!isDemoAccount && <Button
                    variant={"brand"}
                    mr={2}
                    onClick={() => {
                      navigate("/postad");
                    }}
                  >
                     {t('create_ads')}
                  </Button>}
                </Flex>
                <NetworkConnector />
                <Flex h='8' justify='flex-end' className='Wallet'>
                  <WalletConnection />
                </Flex>
                <Flex mt="4px">
                  <SocialMedia />
                <ColorModeSwitcher />
                <LanguageSwitcher />
                </Flex>
                
              </Flex>
            </>
          )}
        </Flex>
      )}
    </>
  );
}
