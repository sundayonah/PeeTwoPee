import {
  Flex,
  Slide,
  Text,
  Image,
  useColorModeValue,
  Divider,
  Link,
  Collapse,
} from "@chakra-ui/react";
import rgplogo from "../../assets/rgplogo.svg";
import { ChevronDownIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MobileNav = ({
  activated,
  setActivated,
}: {
  activated: boolean;
  setActivated: () => void;
}) => {
  const {t} = useTranslation()
  const navbarBgColor = useColorModeValue("#FFFFFF", "#000C15");
  const logoTextColor = useColorModeValue(
    "#011C32",
    "linear-gradient(90deg, #EAF6FB 0%, #E6F3FE 42.71%, #E6F3FE 60.42%, #E9F5FB 100%)"
  );
  const [DappSlideActive, setDappSlideActive] = useState(false);
  const [companySlideActive, setCompanySlideActive] = useState(false);
  return (
    <>
      <Slide
        direction='left'
        in={activated}
        style={{ zIndex: 2, marginTop: "0", backgroundColor: navbarBgColor }}
      >
        <Flex h='100vh' flexDirection={"column"}>
          <Flex
            pt={2}
            px={5}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex alignItems={"center"}>
              <Image h='20px' src={rgplogo} alt='rgp' />
              <Text
                ml={3}
                fontWeight={"700"}
                color={logoTextColor}
                fontSize={"20px"}
              >
                bsPay
              </Text>
            </Flex>
            <Flex
              onClick={() => setActivated()}
              color={logoTextColor}
              borderRadius={"6px"}
              p={1}
              border='1px'
            >
              <CloseIcon boxSize={"3"} />
            </Flex>
          </Flex>
          <Flex mt={10} color={logoTextColor} flexDirection={"column"}>
            <Flex
              onClick={() => {
                if (companySlideActive) {
                  setCompanySlideActive(false);
                  setDappSlideActive(false);
                } else {
                  setCompanySlideActive(true);
                  setDappSlideActive(false);
                }
              }}
              px={5}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text>Company</Text>
              <ChevronDownIcon boxSize={"6"} />
            </Flex>
            <Collapse in={companySlideActive} animateOpacity>
              <Flex fontWeight={"600"} px={5} mt={4} flexDirection={"column"}>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://rigelprotocol.com/about'
                >
                  <Text mt={3}>{t('about_us')}</Text>
                </Link>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://rigelprotocol.com/career'
                >
                  <Text mt={3}>Career</Text>
                </Link>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                >
                  <Text mt={3}>Press resources</Text>
                </Link>
              </Flex>
            </Collapse>
            <Divider
              borderColor={logoTextColor}
              mt={2}
              border={"1px"}
              variant={"solid"}
            />
          </Flex>
          <Flex mt={5} color={logoTextColor} flexDirection={"column"}>
            <Flex
              onClick={() => {
                if (DappSlideActive) {
                  setCompanySlideActive(false);
                  setDappSlideActive(false);
                } else {
                  setCompanySlideActive(false);
                  setDappSlideActive(true);
                }
              }}
              px={5}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text>DApps</Text>
              <ChevronDownIcon boxSize={"6"} />
            </Flex>
            <Collapse in={DappSlideActive} animateOpacity>
              <Flex fontWeight={"600"} px={5} mt={4} flexDirection={"column"}>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://smartswap.rigelprotocol.com'
                >
                  <Text mt={3}>SmartSwap</Text>
                </Link>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://gift.rigelprotocol.com/'
                >
                  <Text mt={3}>Gift Dapp</Text>
                </Link>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://smartswap.rigelprotocol.com/#/auto-period'
                >
                  <Text mt={3}>AutoTrade</Text>
                </Link>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://smartswap.rigelprotocol.com/#/smartbid'
                >
                  <Text mt={3}>SmartBid</Text>
                </Link>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://smartswap.rigelprotocol.com/#/farming-v2'
                >
                  <Text mt={3}>Farms</Text>
                </Link>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{ border: "none" }}
                  isExternal
                  href='https://launchpad.rigelprotocol.com/'
                >
                  <Text mt={3}>LaunchPad</Text>
                </Link>
              </Flex>
            </Collapse>
            <Divider
              borderColor={logoTextColor}
              mt={2}
              border={"1px"}
              variant={"solid"}
            />
          </Flex>
          <Link
            _hover={{
              textDecoration: "none",
            }}
            href='https://rigelprotocol.com/events'
            isExternal
            _focus={{ border: "none" }}
          >
            <Flex mt={5} color={logoTextColor} flexDirection={"column"}>
              <Flex
                px={5}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>Events</Text>
              </Flex>
            </Flex>
          </Link>

          <Link
            _focus={{ border: "none" }}
            href='https://medium.com/rigelprotocol'
            isExternal
            _hover={{
              textDecoration: "none",
            }}
          >
            <Flex mt={5} color={logoTextColor} flexDirection={"column"}>
              <Flex px={5} alignItems={"center"}>
                <Text>Blog</Text>
                <ExternalLinkIcon ml={2} boxSize={"6"} />
              </Flex>
            </Flex>
          </Link>
        </Flex>
      </Slide>
    </>
  );
};

export default MobileNav;
