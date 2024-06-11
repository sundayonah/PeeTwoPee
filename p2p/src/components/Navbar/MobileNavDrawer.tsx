import React from 'react';
import {
  Flex,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  useColorModeValue,
  Text,
  Link,
  Collapse,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import useToggle from '../../utils/hooks/useToggle';
import { CloseIcon } from '../../theme/components/Icons';
import { useTranslation } from 'react-i18next';

export default function MobileNavDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOn, toggleIsOn] = useToggle();
  const HamburgerIconBorderColor = useColorModeValue('#DEE5ED', '#213345');
  const HamburgerIconColor = useColorModeValue('#333333', '#F1F5F8');
  const SwapBgColor = useColorModeValue('#F2F5F8', '#213345');
  const closeButtonBorder = useColorModeValue('#666666', '#DCE5EF');
  const { t } = useTranslation()
  

  const Nav = ({
    to,
    label,
  }: {
    to: string;
    label: string;
    isActive?: boolean;
  }) => (
    <NavLink
      to={to}
      style={({ isActive }) => (isActive ? { color: '#319EF6' } : {})}
    >
      {label}
    </NavLink>
  );

  return (
    <>
      <Flex
        border="1px"
        borderColor={HamburgerIconBorderColor}
        alignItems="center"
        borderRadius="6px"
        w="40px"
        h="40px"
        justifyContent="center"
        p="18px"
      >
        <HamburgerIcon
          color={HamburgerIconColor}
          onClick={onOpen}
          cursor={'pointer'}
          w="24px"
          h="24px"
        />
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader mt={5}>
            <Flex
              onClick={onClose}
              alignItems="center"
              cursor="pointer"
              justifyContent="center"
              borderRadius="6px"
              w="24px"
              h="24px"
              border="1px"
              borderColor={closeButtonBorder}
            >
              <CloseIcon />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex ml={-6}>
              <Flex flexDirection="column">
                <Text ml={6} color="#999999" fontSize="12px" mb={2}>
                  MENU
                </Text>
                <Flex ml={6} mb={3} onClick={onClose}>
                  <Nav label={t('buy')} to="/trade/buy" />
                </Flex>
                <Flex ml={6} mb={3} onClick={onClose}>
                  <Nav label={t('sell')} to="/trade/sell" />
                </Flex>
                <Flex ml={6} mb={3} onClick={onClose}>
                  <Nav label={t('create_ads')} to="/postad" />
                </Flex>
                <NavLink to="/account/balance" >
                  <Flex
                    mb={2}
                    alignItems="center"
                    w="320px"
                    h="40px"
                    justifyContent="space-between"
                    onClick={toggleIsOn}
                    bgColor={isOn ? SwapBgColor : 'transparent'}
                  >
                    <Flex ml={6}>
                      <Nav label={t('account')} to="/account/balance" />
                    </Flex>
                    {isOn ? (
                      <ChevronUpIcon mr={2} />
                    ) : (
                      <ChevronDownIcon mr={2} />
                    )}
                  </Flex>
                </NavLink>
                <Collapse animateOpacity in={isOn}>
                  <Flex
                    display={isOn ? '' : 'none'}
                    flexDirection="column"
                    ml={10}
                    mb={3}
                  >
                    <Text
                      _hover={{ color: '#319EF6' }}
                      mb={2}
                      onClick={onClose}
                    >
                      <Nav label="Wallet" to="/account/balance" />
                    </Text>
                    <Text
                      _hover={{ color: '#319EF6' }}
                      mb={2}
                      onClick={onClose}
                    >
                      <Nav
                        label={t('current_trades')}
                        to="/profile/trades/current"
                      />
                    </Text>
                    <Text
                      _hover={{ color: '#319EF6' }}
                      mb={2}
                      onClick={onClose}
                    >
                      <Nav label="My Ads" to="/profile/ads" />
                    </Text>

                    <Text
                      _hover={{ color: '#319EF6' }}
                      mb={2}
                      onClick={onClose}
                    >
                      <Nav label="Profile" to="/profile/account" />
                    </Text>
                    <Text
                      _hover={{ color: '#319EF6' }}
                      mb={2}
                      onClick={onClose}
                    >
                      <Nav label="Dispute" to="/council/dispute" />
                    </Text>
                  </Flex>
                </Collapse>

                <Text ml={6} color="#999999" mt={5} fontSize="12px" mb={2}>
                  DAPPS
                </Text>
                <Flex mb={3} alignItems="center" ml={6} onClick={onClose}>
                  <Nav label="P2P" to="/" />
                </Flex>
                <Flex mb={3} alignItems="center" ml={6} onClick={onClose}>
                  <Link href="https://smartswap.rigelprotocol.com/" isExternal>
                    <Text>SmartSwap</Text>
                  </Link>
                </Flex>
                <Flex ml={6} mb={3}>
                  <Link href="https://giftdapp.rigelprotocol.com" isExternal>
                    <Text>GiftDApp</Text>
                  </Link>
                </Flex>
                <Flex ml={6} mb={3}>
                  <Link
                    href="https://smartswap.rigelprotocol.com/smartbid"
                    isExternal
                  >
                    <Text>SmartBid</Text>
                  </Link>
                </Flex>
                <Flex ml={6} mb={3}>
                  <Link
                    href="https://smartswap.rigelprotocol.com/farm"
                    isExternal
                  >
                    <Text>Farming</Text>
                  </Link>
                </Flex>
                <Flex ml={6} mb={3}>
                  <Link
                    href="https://smartswap.rigelprotocol.com/auto-period"
                    isExternal
                  >
                    <Text>AutoTrade</Text>
                  </Link>
                </Flex>

                <Flex ml={6} mb={3}>
                  <Link href="https://launchpad.rigelprotocol.com" isExternal>
                    <Text>Launchpad</Text>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
