import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  useMediaQuery,
  useColorModeValue,
  HStack,
  Button,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Spinner,
  Divider,
  Img,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectToken from "../../../../components/tokens/SelectToken";
import { RootState } from "../../../../state/store";
import { addToDefaultTokenNav } from "../../../../state/user";
import { useActiveWeb3React, useLogin } from "../../../../utils/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../../../utils/hooks/useLocalStorage";
import Joyride from "react-joyride";
import { welcomeSteps } from "../../../../components/Onboarding/WelcomeSteps";
import WelcomeModal from "../../../../components/Onboarding/WelcomeModal";
import { toggleAccountDropDown } from "../../../../state/accountUi";
import { BiFilterAlt } from "react-icons/bi";
import CompletedModal from "../../../../components/Onboarding/CompletedModal";
import CustomModal from "../../../../components/Modals/CustomModal";
import { fiatCurrencies } from "../../../../utils/constants/constants";
import { FilterIcon } from "../../../../assets/Icons";
import { useAppSelector } from "../../../../state/hooks";
import { useTranslation } from "react-i18next";

interface IFiat {
  name: string;
  currency: string;
  logo: string;
}

export default function SellJumbotron({
  setSelectedAsset,
  selectedAsset,
  selectedFiat,
  setSelectedFiat,
  onChange,
  totalOrder,
}: {
  setSelectedAsset: (asset: string) => void;
  selectedAsset: string;
  selectedFiat: IFiat;
  setSelectedFiat: (fiat: IFiat) => void;
  onChange: (e: any) => void;
  totalOrder: number;
}) {
  const [chainID, setChainID] = useState("BSC");
  const [search, setSearch] = useState<string>("");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const navColor = useColorModeValue("#666666", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const textColor = useColorModeValue("#333333", "#fff");
  const filterColor = useColorModeValue("#fff", "#15202B");
  const activeTextColor = useColorModeValue("#333333", "");
  const inactiveTextColor = useColorModeValue("#CCCCCC", "");
  const adsColor = useColorModeValue("#F2F5F8", "#213345");
  const {
    chainId: network,
    defaultTokenNav,
    paymentMethods,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [tokenModal, setTokenModal] = useState<boolean>(false);
  const [openMobileFilter, setOpenMobileFilter] = useState<boolean>(false);
  const [fiat, setFiat] = useState<IFiat>(selectedFiat);
  const { chainId, account } = useActiveWeb3React();
  const onCurrencySelect = useCallback(
    (inputCurrency) => {
      setTokenModal((state) => !state);
      dispatch(
        addToDefaultTokenNav({
          token: inputCurrency?.tokenInfo?.symbol ?? inputCurrency?.symbol,
          chainId,
        })
      );
    },
    [chainId]
  );

  const {t} = useTranslation()
  useEffect(() => {
    setChainID(
      chainId == 137 || chainId == 80001 || network == 137 || network == 80001
        ? "MATIC"
        : chainId == 97
        ? "BSCTEST"
        : "BSC"
    );
  }, [network, chainId]);

  const { isDemoAccount } = useAppSelector(
    (state: RootState) => state.accountdemo
  );

  const location = useLocation();
  const navigate = useNavigate();

  const isSelPage = location.pathname === "/trade/sell";
  const isBuyPage = location.pathname === "/trade/buy";

  const redColour = useColorModeValue(" #FF3358", " #FF3358");
  const greenColour = useColorModeValue("#0CCB80", "#0CCB80");
  const bgColor = useColorModeValue("#319EF6", "#4CAFFF");

  const { authenticated } = useLogin();

  const [selectedAssetLocalStore, setSelectedAssetLocalStore] =
    useLocalStorage<string>("selected", selectedAsset);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setSelectedAsset(
      defaultTokenNav[chainID]?.[defaultTokenNav[chainID]?.length - 1]
    );
    setSelectedAssetLocalStore(
      defaultTokenNav[chainID]?.[defaultTokenNav[chainID]?.length - 1]
    );
  }, [defaultTokenNav]);

  const handleStepComplete = (data) => {
    // 
    if (data.index === 3) {
      dispatch(toggleAccountDropDown());
    } else if (data.action === "reset") {
      dispatch(toggleAccountDropDown());
      setCompletModal(true);
      setRun(false);
    }
  };

  useEffect(() => {
    if (selectedAssetLocalStore) {
      setSelectedAsset(selectedAssetLocalStore);
    }
  }, []);

  const [welcomeModal, setWelcomeModal] = useState(false);

  const [completModal, setCompletModal] = useState(false);
  const [run, setRun] = useState(false);

  function strartWelcomeRide() {
    setRun(true);
  }

  useEffect(() => {
    const visits = window.localStorage.getItem("welcomeRide");
    if (!visits && !account) {
      setWelcomeModal(true);
      window.localStorage.setItem("welcomeRide", "1");
    }
  }, []);

  const showResults = () => {
    setSelectedFiat(fiat);
    onChange(search);
    setOpenMobileFilter(false);
  };


  return (
    <>
      <CompletedModal
        reStartToure={() => setWelcomeModal(true)}
        openModal={completModal}
        closeModal={() => {
          window.localStorage.setItem("welcomeRide", "1");
          setCompletModal((state) => !state);
        }}
        textHeader={"Now, it’s your turn"}
        welcomeText='Proceed to connecting your wallet and then create an account so we can take on the next steps.'
      />
      <Joyride
        // @ts-ignore
        steps={welcomeSteps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        callback={handleStepComplete}
        styles={{
          options: {
            arrowColor: bgColor,
            backgroundColor: bgColor,
            textColor: "#FFFFFF",
            primaryColor: bgColor,
          },
        }}
      />
      <WelcomeModal
        startToure={strartWelcomeRide}
        openModal={welcomeModal}
        closeModal={() => {
          window.localStorage.setItem("welcomeRide", "1");
          setWelcomeModal((state) => !state);
        }}
        textHeader={"Welcome to the P2P Platform"}
        welcomeText='With the RigelProtocol P2P platform, you can trade your crypto for fiat and vice versa in a decentralised space'
      />
    {isMobileDevice ?  
    (<Flex  justifyContent="space-between" alignItems="end">
        <HStack
        align={"center"}
        mr={5}
        mb={isMobileDevice ? 1 : 2}
      >
        <Text
          color={isBuyPage && greenColour}
          //height='40px'
          // color={isBuyPage && "#fff"}
          variant="outline"
          // width='148px'

          _hover={isBuyPage && { bg: "#0a6b45" }}
          fontSize="14px"
          onClick={() => navigate("/trade/buy")}
        >
          {t('buy')}          
        </Text>
        <Divider orientation="vertical" gap="10px" />
        <Text
          color={isSelPage && redColour}
          variant="outline"
          // color={isSelPage && "#fff"}
          //height='40px'
          // width='148px'
          fontSize="14px"
          // padding={5}
          onClick={() => navigate("/trade/sell")}
          _hover={isSelPage && { bg: "#a31730" }}
        >
          {t('sell')}
        </Text>
      </HStack>
      <Flex alignItems="end" gap="10px">
       {!isDemoAccount &&<Flex fontSize="12px" bg={adsColor} gap="7px" padding="4px 4px"
       borderRadius="4px" ml="13px">
          <Box color={navColor} borderRadius="4px" >{t('no_of_ads')}:</Box>
          <Box color={bgColor}>{totalOrder ?? <Spinner size="xs" />} {totalOrder ===1 ? "Ad" :"Ads"}</Box>
        </Flex>}
        <Flex justifyContent="center" alignItems="center" padding="3px" boxSizing="border-box" border="1px solid" borderRadius="4px" borderColor="rgba(222, 229, 237, 1)" width="25px" height="25px" cursor="pointer" _hover= {{background:bgColor }}>
        <BiFilterAlt size="14px" onClick={()=>setOpenMobileFilter(!openMobileFilter)}/>
        {/* <FilterIcon onClick={()=>setOpenMobileFilter(!openMobileFilter)} type={openMobileFilter ? "edit" : ""} /> */}
      </Flex>
      </Flex>
      </Flex> ) : null}
      {openMobileFilter && (
        <Box
          background={filterColor}
          width='100%'
          position='absolute'
          left='0'
          pb='30px'
          padding='10px 20px'
        >
          <Text>Filter</Text>
          <Box mt='20px' mb='40px'>
            <Box mr={["0", "0", "30px"]} my='20px' color={textColor}>
              <Text mb='12px'>Payment Method</Text>
              <Menu>
                <MenuButton
                  className='PayMethod'
                  variant='ghost'
                  as={Button}
                  transition='all 0.2s'
                  rightIcon={<ChevronDownIcon />}
                  fontWeight={400}
                  h='45px'
                  _focus={{ color: "#319EF6" }}
                  fontSize='13px'
                  textTransform={"capitalize"}
                  border={`1px solid ${borderColor}`}
                  width='100%'
                  textAlign='left'
                >
                  <Box>Payment Method</Box>
                </MenuButton>
                <MenuList>
                  {paymentMethods?.map((item, index) => (
                    <MenuItem key={index}>{item}</MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
            <Flex gap='15px'>
              <Box color={textColor}>
                <Flex
                  px={{ base: 2 }}
                  className='FIatCurrency'
                  alignItems='center'
                  justifyContent='space-between'
                  h='45px'
                  width='110px'
                  border='1px'
                  borderColor={borderColor}
                  borderRadius='4px'
                  onClick={() => setOpenModal(true)}
                  cursor='pointer'
                >
                  <Text
                    color={selectedFiat ? activeTextColor : inactiveTextColor}
                    fontSize='14px'
                    display='flex'
                  >
                    {fiat.logo !== "" && (
                      <Img
                        src={fiat.logo}
                        width='24px'
                        height='20px'
                        mr='10px'
                        mt='0px'
                        alt={fiat?.name?.slice(0, 2)}
                      />
                    )}{" "}
                    {fiat.currency}
                  </Text>
                  <ChevronDownIcon color={inactiveTextColor} />
                </Flex>
                <CustomModal
                  data={fiatCurrencies}
                  isOpen={openModal}
                  onClose={setOpenModal}
                  selectedItem={fiat}
                  setSelectedItem={(country: IFiat) => {
                    setFiat(country);
                    // setSelectedAssetLocalStore(country);
                  }}
                  placeholder='Search for currency'
                  title='Select Currency'
                />
              </Box>
              <Box color={textColor}>
                <Input
                  width='100%'
                  type='number'
                  h='45px'
                  value={search}
                  placeholder={t('p_amt')}
                  borderColor={borderColor}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            </Flex>
          </Box>
          <Box fontSize='12px'>
            <Button
              width='100%'
              height='40px'
              borderRadius='6px'
              bgColor={bgColor}
              color={inactiveTextColor}
              onClick={() => showResults()}
            >
              Show results
            </Button>
            <Button
              width='100%'
              height='40px'
              borderRadius='6px'
              bgColor='transparent'
              border='1px solid'
              borderColor={navColor}
              marginTop='15px'
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      <Flex
        height='50px'
        mt={isMobileDevice ? 3 : 10}
        borderBottom={`1px solid ${borderColor}`}
        justifyContent='space-between'
        overflowX={isMobileDevice ? "scroll" : "hidden"}
        overflowY='hidden'
        className='TokenSelect'
        // bg="yellow"
        // padding="25px 0"
        // margin="20px 0"
        // bg="blue"
      >
        <Flex fontSize={isMobileDevice ? "lg" : "xl"} overflowX="auto"  css={{
    '&::-webkit-scrollbar': {
      width: '2px',
      height:"3px"
    },
    '&::-webkit-scrollbar-track': {
      width: '2px',
      height:"3px"
    },
    '&::-webkit-scrollbar-thumb': {
      background: bgColor ,
      borderRadius: '24px',
    },
  }}>
          <HStack display={isMobileDevice ? "none" : "flex"} mr={5} mb={1.5}>
            <Button
              background={isBuyPage && greenColour}
              //height='40px'
              color={isBuyPage && "#fff"}
              variant='outline'
              // width='148px'
              fontSize='14px'
              padding={5}
              onClick={() => navigate("/trade/buy")}
            >
              {t('buy')}
            </Button>
            <Button
              background={isSelPage && redColour}
              variant='outline'
              color={isSelPage && "#fff"}
              //height='40px'
              // width='148px'
              fontSize='14px'
              padding={5}
              onClick={() => navigate("/trade/sell")}
            >
              {t('sell')}
            </Button>
          </HStack>
          <Flex alignItems='flex-end'>
            {(isDemoAccount ? defaultTokenNav[chainID]?.slice(0, 2) : defaultTokenNav[chainID])?.map((item, index)=> {
              return (
                <Box
                  key={index}
                  mr={4}
                  color={ selectedAsset.toLowerCase() === item.toLowerCase() ? "#319EF6" : navColor} 
                  fontSize="12px"
                  cursor="pointer"
                  pb={1}
                  onClick={() => {
                    setSelectedAsset(item);
                    setSelectedAssetLocalStore(item);
                  }}
                  borderBottom={
                    selectedAsset.toLowerCase() === item.toLowerCase()
                      ? "2px solid #319EF6"
                      : "none"
                  }
                >
                  {item}
                </Box>
              );
            })}
          </Flex>

          <Spacer />

         {!isDemoAccount && <Flex
            // color={navColor}
            fontSize="12px"
            onClick={() => setTokenModal(!tokenModal)}
            cursor="pointer"
            alignItems="flex-end"
            minWidth="210px"
            flexGrow={1}
            pb={1}
            color='#319EF6'
            borderBottom="2px solid transparent"
          >
            {" "}

            {t('add_custom_token')}  <ChevronDownIcon />
          </Flex>}

         
          <SelectToken
            onCurrencySelect={onCurrencySelect}
            tokenModal={tokenModal}
            setTokenModal={setTokenModal}
            showBalance={false}
          />
        </Flex>
        <Spacer />
        {!authenticated && !isMobileDevice && (
          <Button
            onClick={() => navigate("/app")}
            className='CreateAccount'
            variant={"brand"}
            width="auto"
            fontSize="12px"
            // padding="5px"
          >
           {t('create_account')}
          </Button>
        )}
       {!isMobileDevice && !isDemoAccount && <Flex bg={adsColor} alignItems="center" fontSize="12px" borderRadius="4px" gap="2px" padding="5px 8px" marginBottom="10px" ml="13px">
          <Box fontSize="12px" color={navColor} borderRadius="4px" >{t('no_of_ads')}:</Box>
          <Box color={bgColor}>{totalOrder ?? <Spinner />} {totalOrder ===1 ? "Ad" :"Ads"}</Box>
        </Flex>}
        {/* <Flex color={textColor}>
        <Text px={2}>Network: </Text>
        
    <Box mt={isMobileDevice ? null : -1.5} >
        <SelectNetwork/>
    </Box>

        <Box mt={isMobileDevice ? null : -1.5}>
          <SelectNetwork />
        </Box>
      </Flex> */}
      </Flex>
    </>
  );
}
