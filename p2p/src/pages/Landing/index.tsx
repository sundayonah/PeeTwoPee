import { useState } from "react";
import {
  Flex,
  Box,
  useColorModeValue,
  Text,
  Button,
  Heading,
  Image,
  Stack,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import MiddleImage from "../../assets/Frame27412.svg";
import TopImage from "../../assets/Frame31038.svg";
import BottomImage from "../../assets/Frame2744.svg";
import SecurityIcon from "../../assets/Security_resized.gif";
import DecentralizedIcon from "../../assets/Decentralized_resized.gif";
import ConnectWallet from "../../assets/connectWallet.gif";
import StartTrading from "../../assets/startTrading.gif";
import AddPayment from "../../assets/Addpayment_resized.gif";
// import P from "../../assets/p.mp";
import SDIcon from "../../assets/Design_resized.gif";
import { Footer } from "../../components/footer";
import rgplogo from "../../assets/rgplogo.svg";
// import rgplogo from "../../assets/ChristmasRigelProtocol.svg";
import LandingImg from "../../assets/landing2.svg";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import MobileNav from "./MobileNav";
import { useIsWhitelisted } from "../../utils/hooks/useCouncilDispute";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation(); 
  const { isWhitelistEnabled, isWhitelistedUser } = useIsWhitelisted();

  const mode = useColorModeValue("light", "dark");
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const BgColor = useColorModeValue("#ffffff", "#15202B");
  const SCBorderColor = useColorModeValue("#DEE6ED", "#324D68");
  const SubTextColor = useColorModeValue("#666666", "#DCE5EF");
  const SubHeadColor = useColorModeValue("#333333", "#F1F5F8");
  
  const defColor = useColorModeValue("#F1F5F8", "#F1F5F8");
  const CardsBg = useColorModeValue("#FFFFFF", "#1B2937");
  const Sec4Bg = useColorModeValue("#FBFBFE", "#15202B");
  const Sec3Bg = useColorModeValue("#EBF6FE", "#042F4E");
  const Sec2Bg = useColorModeValue("#EEFCFC", "#0D4544");
  const Sec1Bg = useColorModeValue("#EEF0FC", "#0E1644");
  const TopSecBg = useColorModeValue(
    "linear-gradient(90deg, #EEF0FC 0%, #EEFCFC 100%)",
    "linear-gradient(90deg, #0E1644 0%, #0D4544 100%)"
  );
  const navbarBgColor = useColorModeValue("#FFFFFF", " rgba(21, 32, 43, 1)");
  const logoTextColor = useColorModeValue(
    "#011C32",
    "linear-gradient(90deg, #EAF6FB 0%, #E6F3FE 42.71%, #E6F3FE 60.42%, #E9F5FB 100%)"
  );
  const BtnBoxShadow =
    "0px 1px 7px -2px rgba(24, 39, 75, 0.06), 0px 2px 2px rgba(24, 39, 75, 0.06)";
  const TopHeadFS = { base: "46px", md: "50px", lg: "56px" };
  const CardHeadingFS = { base: "24px", md: "20px", sm: "18px" };
  const CardTexFS = { base: "20px", md: "18px", sm: "16px" };
  const GifCircleBg = useColorModeValue(
    "rgba(76, 175, 255, 0.2)",
    "rgba(49, 158, 246, 0.2)"
  );

  const [mobileNav, setMobileNav] = useState(false);
  const menuBgColor = useColorModeValue("#FFFFFF", "#000C15");
  const menuTextColor = useColorModeValue("#011C32", "#FFFFFF");
  const menuSubTextColor = useColorModeValue("#51627B", "#A7B3BE");

  const navigate = useNavigate();

  return (
    <Box bg={BgColor}>
      <Stack position={isMobile ? undefined : "relative"} bg={TopSecBg}>
        <Flex
          w="100%"
          zIndex={"2"}
          position={isMobile ? undefined : "fixed"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bgColor={navbarBgColor}
          py={3}
          px={isMobile ? 5 : 20}
        >
          <Flex alignItems={"center"}>
            {/* <Image h='20px' src={rgplogo} alt='rgp' /> */}
            <Image h="30px" src={rgplogo} alt="rgp" />
            <Text
              ml={3}
              fontWeight={"700"}
              textColor={logoTextColor}
              fontSize={"20px"}
            >
              bsPay
            </Text>
          </Flex>

          <HamburgerIcon
            onClick={() => setMobileNav(true)}
            display={isMobile ? undefined : "none"}
            boxSize={"8"}
          />

          <Flex display={isMobile ? "none" : undefined} alignItems={"center"}>
            <Menu>
              <MenuButton
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
                _active={{ bgColor: "transparent", border: "none" }}
                _focus={{ bgColor: "transparent", border: "none" }}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {t('company')}
              </MenuButton>
              <MenuList border="none" bgColor={menuBgColor}>
                <MenuItem>
                  <ChakraLink
                    _hover={{ textDecoration: "none" }}
                    href="https://rigelprotocol.com/about"
                    isExternal
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                       {t('about_us')}
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('about_us_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <ChakraLink
                    _hover={{ textDecoration: "none" }}
                    href="https://rigelprotocol.com/career"
                    isExternal
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        {t('career')}
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('career_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <ChakraLink
                    _hover={{ textDecoration: "none" }}
                    href="https://rigelprotocol.com/press"
                    isExternal
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        {t('press_resources')}
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('press_resources_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
                _active={{ bgColor: "transparent", border: "none" }}
                _focus={{ bgColor: "transparent", border: "none" }}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {t('DApps')}
              </MenuButton>
              <MenuList border="none" bgColor={menuBgColor}>
                <MenuItem>
                  <ChakraLink
                    href="https://smartswap.rigelprotocol.com/#"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        SmartSwap
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('smartswap_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <ChakraLink
                    href="https://gift.rigelprotocol.com/"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        GiftDApp
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('giftdapp_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <ChakraLink
                    href="https://smartswap.rigelprotocol.com/#/smartbid"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        SmartBid
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('smartbid_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <ChakraLink
                    href="/trade/buy"
                   // isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        P2p
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                     {t('p2p_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>



                <MenuItem>
                  {" "}
                  <ChakraLink
                    href="https://launchpad.rigelprotocol.com/"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        Launchpad
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('launchpad_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
              </MenuList>
            </Menu>
            <ChakraLink
              href="https://rigelprotocol.com/events"
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <Flex mr={6}>
                <Text fontWeight={"bold"}>{t('events')}</Text>
              </Flex>
            </ChakraLink>

            <ChakraLink
              href="https://medium.com/rigelprotocol"
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <Flex mr={6} alignItems={"center"}>
                <Text fontWeight={"bold"}>{t('blog')}</Text>
                <ExternalLinkIcon />
              </Flex>
            </ChakraLink>
          </Flex>

          <Button
            display={isMobile ? "none" : undefined}
            _focus={{
              bgColor:
                "linear-gradient(90deg, #2691C1 0%, #045CA6 42.71%, #055DA6 60.42%, #238CBE 100%)",
            }}
            _active={{
              bgColor:
                "linear-gradient(90deg, #2691C1 0%, #045CA6 42.71%, #055DA6 60.42%, #238CBE 100%)",
            }}
            _hover={{
              bgColor:
                "linear-gradient(90deg, #2691C1 0%, #045CA6 42.71%, #055DA6 60.42%, #238CBE 100%)",
            }}
            h="48px"
            border="1px"
            borderRadius={"6px"}
            textAlign={"center"}
            borderColor={"#238cbe"}
            color="#ffffff"
            w="212px"
            boxShadow={"0px 1px 5px rgba(51, 51, 153, 0.1)"}
            bg="linear-gradient(90deg, #2691C1 0%, #045CA6 42.71%, #055DA6 60.42%, #238CBE 100%)"
          >
            Launch Dapp
            <Menu>
              <MenuButton
                as={IconButton}
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
                _active={{ bgColor: "transparent", border: "none" }}
                _focus={{ bgColor: "transparent", border: "none" }}
                icon={<ChevronDownIcon boxSize={"6"} />}
              />
              <MenuList border="none" bgColor={menuBgColor}>
                <MenuItem>
                  <ChakraLink
                    href="https://smartswap.rigelprotocol.com/#"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        SmartSwap
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('smartswap_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  <ChakraLink
                    href="https://smartswap.rigelprotocol.com/autotrade"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        AutoTrade
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        Auto invests in any crypto of your choice
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  <ChakraLink
                    href="https://smartswap.rigelprotocol.com/farm"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        Farms
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        Stake Liquidity Pair Tokens from any pool.
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  <ChakraLink
                    href="https://launchpad.rigelprotocol.com"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        Launchpad
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        {t('launchpad_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>

                <MenuItem>
                  {" "}
                  <ChakraLink
                    href="https://smartswap.rigelprotocol.com/#/smartbid"
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        SmartBid
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                        ${t('smartbid_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>

                
                <MenuItem>
                  {" "}
                  <ChakraLink
                    href="/trade/buy"
                   // isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex flexDirection={"column"}>
                      <Text color={menuTextColor} fontWeight={"bold"}>
                        P2P
                      </Text>
                      <Text fontSize={"14px"} color={menuSubTextColor} mt={3}>
                      {t('p2p_text')}
                      </Text>
                    </Flex>
                  </ChakraLink>
                </MenuItem>

              </MenuList>
            </Menu>
          </Button>
        </Flex>
        <MobileNav
          activated={mobileNav}
          setActivated={() => setMobileNav(false)}
        />
        <Flex
          px={[7, 7, 20]}
          py={[7, 7, 28]}
          width={{ base: "100%" }} 
          gap={["30px"]}
          flexDirection={["column", "column", "row"]}
        >
          <Box width={["95%", "95%", "70%"]} mt={["0", "0", "90px"]}>
            <Heading
              color={SubHeadColor}
              fontWeight={"600"}
              fontSize={TopHeadFS}
              // fontFamily ={`'Clash Display', sans-serif`}
              fontFamily={`'Clash Display', sans-serif`}
            >
              {t('landing_page_header_text')}
            </Heading>
            {/* <Text
              className="animated-text"
              fontSize={TopHeadFS}
              fontWeight={"600"}
              fontFamily={`'Clash Display', sans-serif`}
              color="#319EF6"
            >
              Instantly!
            </Text> */}
            <Text
              color={SubTextColor}
              fontWeight={"400"}
              fontSize={"16px"}
              mb={10}
              fontFamily="Cera Pro"
            >
              {t('landing_page_sub_heading')}
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Link to="/trade/buy">
                <Button
                  p={6}
                  // width={{ base: "100%", md: "180px" }}
                  width="100%"
                  bg="#319EF6"
                  color="#ffffff"
                  borderRadius="6px"
                  boxShadow={BtnBoxShadow}
                  fontSize="14px"
                  height="50px"
                  fontWeight="500"
                  fontFamily="Cera Pro"
                  transition="0.3s"
                  _hover={{ background:'transparent',color:'#319EF6',border:"1px solid #319EF6" }}
                >
                  {t('launch_dapp_button_text')}
                </Button>
              </Link>
              <Link to="/merchant/badge">
                <Button
                  p={6}
                  width={{ base: "100%", md: "180px" }}
                  variant="outline"
                  borderColor="#319EF6"
                  borderRadius="6px"
                  height="50px"
                  color="#319EF6"
                  boxShadow={BtnBoxShadow}
                  fontSize="14px"
                  fontWeight="500"
                  fontFamily="Cera Pro"
                  transition="0.3s"
                  _hover={{ background:'#319EF6',color:'white' }}
                >
                  {t('become_a_merchant_button_text')}
                </Button>
              </Link>
              {((isWhitelistEnabled && isWhitelistedUser) ||
                !isWhitelistEnabled) && (
                <Link to="/council/register">
                  <Button
                    p={6}
                    width={{ base: "100%", md: "180px" }}
                    variant="ghost"
                    color="#319EF6"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily="Cera Pro"
                    _hover={{ fontWeight: "600" }}
                  >
                    {t('become_a_dispute_council_text')}
                  </Button>
                </Link>
              )}
            </Stack>
          </Box>
          <Box>
            <Image src={LandingImg} />
          </Box>
        </Flex>
      </Stack>
      <Box mt={14}>
        <Heading
          fontSize="40px"
          fontWeight="600"
          textAlign="center"
          fontFamily={`'Clash Display', sans-serif`}
        >
          {t('how_to_start_text')}
        </Heading>
        <Text
          py="14px"
          textAlign="center"
          //color="rgba(220, 229, 239, 1)"
          color={SubHeadColor}
          fontSize="20px"
        >
          {t('how_to_start_sub_text')}
        </Text>
        <Flex
          flexDir={["column", "column", "row"]}
          gap="30px"
          justifyContent="space-between"
          py={3}
          m={{ base: "40px auto", md: "60px", lg: "80px" }}
        >
          <Box
            width="90%"
            m="auto"
            minHeight={["auto", "400px", "400px"]}
            background="#1B2937"
            cursor="pointer"
            box-shadow="-15.0464px 15.0464px 68.7835px -4.29897px rgba(255, 255, 255, 0.05)"
            borderRadius="12.8969px"
            padding="20px"
            justifyContent="center"
          >
            <Flex alignItems="center" justifyContent="center">
              <Image src={ConnectWallet} width="100%" height="250px" />
            </Flex>

            <Box color={defColor} textAlign="center">
              <Heading as="h4" fontSize="20px" my="17px">
                {t('connect_your_wallet_text')}
              </Heading>
              <Text   fontSize="16px">
               {t('connect_your_wallet_sub_text')}
              </Text>
            </Box>
          </Box>
          <Box
            width="90%"
            m="auto"
            minHeight={["auto", "400px", "400px"]}
            background="#1B2937"
            box-shadow="-15.0464px 15.0464px 68.7835px -4.29897px rgba(255, 255, 255, 0.05)"
            borderRadius="12.8969px"
            padding="20px"
            justifyContent="center"
          >
            <Flex alignItems="center" justifyContent="center">
              <Image src={AddPayment} width="100%" height="250px" />
            </Flex>

            <Box color={defColor} textAlign="center">
              <Heading as="h4" fontSize="20px" my="17px">
                {t('add_payment_method_text')}
              </Heading>
              <Text fontSize="16px">
                {t('add_payment_method_sub_text')}
              </Text>
            </Box>
          </Box>
          <Box
            width="90%"
            minHeight={["auto", "400px", "400px"]}
            m="auto"
            background="#1B2937"
            box-shadow="-15.0464px 15.0464px 68.7835px -4.29897px rgba(255, 255, 255, 0.05)"
            borderRadius="12.8969px"
            padding="20px"
            justifyContent="center"
          >
            <Flex alignItems="center" justifyContent="center">
              <Image src={StartTrading} width="100%" height="250px" />
            </Flex>

            <Box color={defColor} textAlign="center">
              <Heading as="h4" fontSize="20px" my="17px">
                {t('start_trading_text')}
              </Heading>
              <Text fontSize="16px">
               {t('start_trading_sub_text')}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box mt={14}>
        <Heading
          fontSize="40px"
          fontWeight="600"
          textAlign="center"
          fontFamily={`'Clash Display', sans-serif`}
        >
          ...{t('what_we_offering_text')}...
        </Heading>
      </Box>
      <Box m={{ base: "40px auto", md: "60px", lg: "80px" }}>
        <Box
          as="section"
          p={["20px", "20px", "70px 50px"]}
          borderRadius="12px"
          width={["90%", "90%", "100%"]}
          margin="30px auto"
          bg={Sec1Bg}
        >
          <Stack
            direction={{ base: "column-reverse", md: "row" }}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                fontFamily={`'Clash Display', sans-serif`}
                color={SubHeadColor}
                fontSize={{ base: "32px", sm: "36px", lg: "40px" }}
                fontWeight={"600"}
              >
                {t('hassle_free_trade_text')}
              </Heading>
              <Box>
                <Text
                  color={SubTextColor}
                  fontSize="16px"
                  fontFamily="Cera Pro"
                >
                  {t('hassle_free_trade_sub_text_one')}{" "}
                </Text>
                <Text
                  color={SubTextColor}
                  fontSize="16px"
                  fontFamily="Cera Pro"
                  m="0"
                >
                 {t('hassle_free_trade_sub_text_two')}
                </Text>
              </Box>

              <Link to="/trade/buy">
                <Button
                  borderRadius="6px"
                  width={{ base: "100%", md: "200px" }}
                  boxShadow={BtnBoxShadow}
                  bg="#319EF6"
                  color="#ffffff"
                  fontWeight="500"
                  fontSize="14px"
                  fontFamily="Cera Pro"
                  _hover={{ fontWeight: "600" }}
                >
                  {t('start_trading_text')}
                </Button>
              </Link>
            </Stack>
            <Flex flex={1}>
              <Image
                src={TopImage}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                maxWidth={"700px"}
              />
            </Flex>
          </Stack>
        </Box>
        <Box
          as="section"
          p={["20px", "20px", "70px 50px"]}
          borderRadius="12px"
          width={["90%", "90%", "100%"]}
          margin="30px auto"
          bg={Sec2Bg}
        >
          <Stack
            direction={{ base: "column-reverse", md: "row" }}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                fontFamily={`'Clash Display', sans-serif`}
                color={SubHeadColor}
                fontSize={{ base: "32px", sm: "36px", lg: "40px" }}
                fontWeight={"600"}
              >
                {t('create_trade_as_merchant_text')}
              </Heading>
              <Box>
                <Text
                  color={SubTextColor}
                  fontSize="16px"
                  fontFamily="Cera Pro"
                >
                  {t('create_trade_as_merchant_sub_text_one')}
                </Text>
                <Text
                  color={SubTextColor}
                  fontSize="16px"
                  fontFamily="Cera Pro"
                >
                  {t('create_trade_as_merchant_sub_text_two')}
                </Text>
              </Box>

              <Link to="/merchant/badge">
                <Button
                  borderRadius="6px"
                  width={{ base: "100%", md: "200px" }}
                  boxShadow={BtnBoxShadow}
                  bg="#319EF6"
                  color="#ffffff"
                  fontSize="14px"
                  fontWeight="500"
                  fontFamily="Cera Pro"
                  _hover={{ fontWeight: "600" }}
                >
                  {t('become_a_merchant_button_text')}
                </Button>
              </Link>
            </Stack>
            <Flex flex={1}>
              <Image
                src={MiddleImage}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                maxWidth={"700px"}
              />
            </Flex>
          </Stack>
        </Box>
        <Box
          as="section"
          p={["20px", "20px", "70px 50px"]}
          borderRadius="12px"
          width={["90%", "90%", "100%"]}
          margin="30px auto"
          bg={Sec3Bg}
        >
          <Stack
            direction={{ base: "column-reverse", md: "row" }}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                fontFamily={`'Clash Display', sans-serif`}
                color={SubHeadColor}
                fontSize={{ base: "32px", sm: "36px", lg: "40px" }}
                fontWeight={"600"}
                whiteSpace="nowrap"
              >
                {t('vote_on_dispute_text')}
              </Heading>
              <Text color={SubTextColor} fontSize="16px" fontFamily="Cera Pro">
               {t('vote_on_dispute_sub_text')}
              </Text>
              {((isWhitelistEnabled && isWhitelistedUser) ||
                !isWhitelistEnabled) && (
                <Link to="/council/register">
                  <Button
                    borderRadius="6px"
                    width={{ base: "100%", md: "200px" }}
                    boxShadow={BtnBoxShadow}
                    bg="#319EF6"
                    color="#ffffff"
                    fontWeight="500"
                    fontSize="14px"
                    fontFamily="Cera Pro"
                    _hover={{ fontWeight: "600" }}
                  >
                    {t('become_a_dispute_council_button_text')}
                  </Button>
                </Link>
              )}
            </Stack>
            <Flex flex={1}>
              <Image
                src={BottomImage}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
              />
            </Flex>
          </Stack>
        </Box>
      </Box>
      <Box as="section" px={10} textAlign="center" bg={Sec4Bg}>
        <Box mt={5}>
          <Heading
            as="h3"
            fontSize={{ base: "32px", sm: "36px", lg: "40px" }}
            fontWeight={"600"}
            color={SubHeadColor}
            fontFamily={`'Clash Display', sans-serif`}
          >
            {t("why_trade_with_us")}?
          </Heading>
          <Text
            color={SubTextColor}
            fontWeight={"400"}
            fontSize="16px"
            mt={5}
            mb={20}
            fontFamily="Cera Pro"
          >
            {t('why_trade_with_us_text')}
          </Text>
        </Box>
        <Flex
          justifyContent="space-between"
          flexDirection={["column", "column", "row"]}
          // spacing={5}
          textAlign="left"
          gap="30px"
          mb="80px"
        >
          <Box
            border={`1px solid ${SCBorderColor}`}
            p="18px"
            borderRadius="12px"
            cursor="pointer"
            transition="0.3s"
            bg={CardsBg}
            _hover={{
              background:
                mode === "light"
                  ? "linear-gradient(90deg, #EEF0FC 0%, #EEFCFC 100%)"
                  : "linear-gradient(90deg, #0E1644 0%, #0D4544 100%)",
            }}
          >
            <Box
              bg={GifCircleBg}
              h="62px"
              width="62px"
              borderRadius="50%"
              position="relative"
            >
              <Image
                src={SecurityIcon}
                alt="security icon"
                h="50px"
                width="50px"
                borderRadius="50%"
                position="absolute"
                top="6px"
                left="6px"
                right="6px"
              />
            </Box>
            <Heading
              as="h5"
              fontSize={CardHeadingFS}
              my={3}
              fontFamily="Cera Pro"
            >
              {t('security_ensured')}
            </Heading>
            <Text fontSize={CardTexFS} fontFamily="Cera Pro">
             {t('security_ensured_text')}
            </Text>
          </Box>
          <Box
            border={`1px solid ${SCBorderColor}`}
            p="18px"
            borderRadius="12px"
            bg={CardsBg}
            cursor="pointer"
            _hover={{
              background:
                mode === "light"
                  ? "linear-gradient(90deg, #EEF0FC 0%, #EEFCFC 100%)"
                  : "linear-gradient(90deg, #0E1644 0%, #0D4544 100%)",
            }}
          >
            <Box
              bg={GifCircleBg}
              h="62px"
              width="62px"
              borderRadius="50%"
              position="relative"
            >
              <Image
                src={DecentralizedIcon}
                alt="icon for decentralized"
                h="50px"
                width="50px"
                borderRadius="50%"
                position="absolute"
                top="6px"
                left="6px"
                right="6px"
              />
            </Box>
            <Heading
              as="h5"
              fontSize={CardHeadingFS}
              my={3}
              fontFamily="Cera Pro"
            >
             {t('decentralized')}
            </Heading>
            <Text fontSize={CardTexFS} fontFamily="Cera Pro">
             {t('decentralized_text')}
            </Text>
          </Box>
          <Box
            border={`1px solid ${SCBorderColor}`}
            p="18px"
            borderRadius="12px"
            bg={CardsBg}
            transition="0.3s all ease-in"
            cursor="pointer"
            _hover={{
              background:
                mode === "light"
                  ? "linear-gradient(90deg, #EEF0FC 0%, #EEFCFC 100%)"
                  : "linear-gradient(90deg, #0E1644 0%, #0D4544 100%)",
            }}
          >
            <Box
              bg={GifCircleBg}
              h="62px"
              width="62px"
              borderRadius="50%"
              position="relative"
            >
              <Image
                src={SDIcon}
                alt="icon for sleek design"
                h="50px"
                width="50px"
                borderRadius="50%"
                position="absolute"
                top="6px"
                left="6px"
                right="6px"
              />
            </Box>
            <Heading
              as="h5"
              fontSize={CardHeadingFS}
              my={3}
              fontFamily="Cera Pro"
            >
              {t("sleek_design")}
            </Heading>
            <Text fontSize={CardTexFS} fontFamily="Cera Pro">
              {t("sleek_design_text")}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
        as="section"
        py={12}
        px={[4, 4, 16]}
        textAlign="center"
        bg={"#15202B"}
      >
        <Heading
          fontSize={{ base: "32px", sm: "36px", lg: "40px" }}
          fontWeight={"600"}
          color={"#ffffff"}
          fontFamily={`'Clash Display', sans-serif`}
        >
          {t('start_defi_journey')}
        </Heading>
        <Text
          my={5}
          fontWeight={"400"}
          fontSize={{ base: "14px", md: "16px" }}
          color={"#F3F4F7"}
          fontFamily="Cera Pro"
          data-testid="landingpage"
        >
          {t('start_defi_journey_text')}
        </Text>
        <Link to="/app">
          <Button
            p={7}
            width={{ base: "198px", md: "235px" }}
            fontWeight={500}
            color={"#ffffff"}
            borderRadius="6px"
            bg={
              "linear-gradient(90deg, #2691C1 0%, #045CA6 42.71%, #055DA6 60.42%, #238CBE 100%)"
            }
            _hover={{ fontWeight: "600" }}
            boxShadow={"0px 1px 5px rgba(51, 51, 153, 0.1)"}
          >
            {t('launch_app')}
          </Button>
        </Link>
      </Box>
      <Footer />
    </Box>
  );
}
