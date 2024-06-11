import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
  Box,
  useColorModeValue
} from '@chakra-ui/react';
import { DropdownSteps } from "../Onboarding/DropdownSteps";
import WelcomeModal from "../Onboarding/WelcomeModal";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import Joyride from "react-joyride";
import { useTranslation } from 'react-i18next';
import { useActiveWeb3React } from '../../utils/hooks';
export const Nav = ({
  to,
  label,
  text,
  margin,
}: {
  to: string;
  label: string;
  text?: string;
  isActive?: boolean;
  margin?: string;
}) => (
  <NavLink
    to={to}
    style={({ isActive }) =>
      isActive
        ? {
            color: "#319EF6",
            margin: `${margin ? margin : 0}`,
            fontSize: "16px",
          }
        : { margin: `${margin ? margin : 0}`, fontSize: "16px" }
    }
  >
    {label}
    {text && (
      <Text mt="9px" fontWeight="400" fontSize="12px">
        {text}
      </Text>
    )}
  </NavLink>
);

function AccountDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation()

 const {accountDropDown  } = useAppSelector(
    (state: RootState) => state.accountUi
  );

  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );



  const handleSwitchDemo = ( ) => {
    try {
      if(isDemoAccount){
        localStorage.setItem('isDemo', '0')
      }else {
        localStorage.setItem('isDemo', '1')
      }
      window.location.reload();
    } catch (error) {
    }
  }



  useEffect(() => {
    
    if(accountDropDown == true){
      setIsOpen(true)
    }else {
      setIsOpen(false)
    }
  }, [accountDropDown])
  
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  const [welcomeModal, setWelcomeModal] = useState(false);
  const { chainId: chainID , account} = useActiveWeb3React();
  const [run, setRun] = useState(false);
  const bgColor = useColorModeValue("#319EF6", "#4CAFFF");
  
  const handleClose = () => {
    setIsOpen(false);
  };


  const handleClick = () => {
    setRun(true)
    setIsOpen(!isOpen);
  };

  function strartWelcomeRide() {
    setRun(true);
  }
  useEffect(() => {
    const visits = window.localStorage.getItem("dropdownTour");
    if (!visits && account) {
      setWelcomeModal(true);
      window.localStorage.setItem("dropdownTour", "1");
    }
  }, []);
  return (
    <Menu  isOpen={isOpen} onClose={handleClose} >
       <Joyride
      // @ts-ignore
        steps={DropdownSteps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        styles={{
          options: {
            arrowColor: bgColor,
            backgroundColor: bgColor,
            textColor: "#FFFFFF",
            primaryColor: bgColor,
          },
        }}
      />
      <MenuButton
        variant="ghost"
        onClick={handleClick}
        as={Button}
        transition="all 0.2s"
        rightIcon={<ChevronDownIcon />}
        fontWeight={200}
        _focus={{ color: "#319EF6" }}
        fontSize="14px"
        textTransform={"capitalize"}
      >
       <Text className='AccDrop' >{t('account')}</Text> 
      </MenuButton>

      <MenuList>
        <MenuItem className="Wallet" _focus={{ color: "#319EF6" }}>
          <Nav
          
            label={t('wallet')}
            to="/account/balance"
            //text="Access all your wallet balances"
          />
        </MenuItem>
        <MenuItem className="Trades" _focus={{ color: "#319EF6" }}>
          <Nav
            label={t('current_trades')}
            to="/profile/trades/current"
            //   margin="10px 0"
            //  text="View all your active trades"
          />
        </MenuItem>
        <MenuItem className="MyAds" _focus={{ color: "#319EF6" }}>
          <Nav
            label={t('my_ads')}
            to="/profile/ads"
            //   margin="10px 0"
            //  text="View all your active trades"
          />
        </MenuItem>
        <MenuItem className="Profile" _focus={{ color: "#319EF6" }}>
          <Nav
            label={t('profile')}
            to="/profile/account"
            // text="View or edit your profile information"
          />
        </MenuItem>
        <MenuItem className="Dispute" _focus={{ color: "#319EF6" }}>
          <Nav
            label={t('dispute')}
            to="/council/dispute"
            // text="Vote on active trade disputes"
          />
        </MenuItem>

        {/* <MenuItem _focus={{ color: '#319EF6' }}>
          <Nav
            label={t('switch_to_demo')}
            to="/#"
           text={t('unlimited_token')}
          />
        </MenuItem> */}

        <Box onClick={handleSwitchDemo} cursor={'pointer'} color={'white'} mt={2} mx={2} p={3} bg={"#319EF6"} borderRadius={"4px"}>
          <Text fontSize="16px">{t('switch_to')} {isDemoAccount ? t('live') : t('demo')} {t('account')} </Text>


          <Text mt={'2px'} fontSize="12px">{t('unlimited_token')}</Text>
        </Box>
      </MenuList>
    </Menu>
  );
}
export default AccountDropDown;
