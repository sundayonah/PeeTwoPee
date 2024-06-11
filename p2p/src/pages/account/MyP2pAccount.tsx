import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState,Dispatch,SetStateAction } from "react";
import { AddIcon } from "../../assets/Icons";

import BankList from "./commonents/BankList";
import { USER_BANKS, USER_PROFILE_TRADE } from "./gql/queries";
import AddBankModal from "./modals/AddBankModal";
import { Link } from "react-router-dom";
import Rank from "../../components/Rank";
import { useActiveWeb3React } from "../../utils/hooks";
import {   shortenInfo } from "../../utils";
import { useIsWhitelisted } from "../../utils/hooks/useCouncilDispute";
import { PROFILE_MOBILE, useRank } from "../../utils/hooks/useRigelBadge";
import ProfileImage from "../../components/Logo/ProfileImage";
import TradingInformation from "./commonents/TradingInformation";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
const MyP2pAccount = ({
  setTabIndex,
}: {
  setTabIndex: Dispatch<SetStateAction<number>>;
}) => {

 

  const activeColour = useColorModeValue("#333333", "#DCE5EF");
  const inactiveColour = useColorModeValue("#333333", "#999999");
  const bgColor = useColorModeValue("#F1F1F1", "#213345");
  const bgColour = useColorModeValue("#F2F5F8", "#213345");
  const linkColor = useColorModeValue("#319EF6", "#319EF6");
  const color= useColorModeValue("#F9FAFB", "#213345");
  const referralLinkBorder = useColorModeValue("#DEE5ED", "#324D68");
  const [fullView,setFullView]=useState(false)
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const [openAddBank, setOpenAddBank] = useState(false);
  const [copied, setCopied] = useState(false);
  const { account, chainId } = useActiveWeb3React();
  const [reload, setReload] = useState(false);
  const { rank, merchantRank } = useRank(reload, setReload);
  const [profileMobilePage, setProfileMobilePage] = useState(PROFILE_MOBILE.PROFILE_INFORMATION);
  const { isWhitelistEnabled, isWhitelistedUser } = useIsWhitelisted();


  const { data, refetch, loading } = useQuery(USER_BANKS);
  const { t } = useTranslation()

  const { data: profile, refetch: profileRefetch } = useQuery(
    USER_PROFILE_TRADE,
    {
      variables: {
        chainId: chainId ?? 97,
      },
    }
  );
  useEffect(() => {
    profileRefetch();
  }, [account, chainId]);

 
  function handleBankAdded() {
    refetch();
    setOpenAddBank(false);
  }

  const setView =(enumVal)=>{
    setFullView((val)=>!val)
    setProfileMobilePage(enumVal)
}

  return (
    <>
    {PROFILE_MOBILE.PROFILE_INFORMATION ===profileMobilePage ?
    <Box mx={isMobileDevice ? 3 : 16} py={10} mb={isMobileDevice ? 20 : 7}>
      <Text mt="0" color={activeColour} fontSize={20} fontWeight={500}>
        {t('profile_information')}
      </Text>
      <Divider  mt="7px" />
      <Flex py={3}>
        <Flex cursor="pointer">
          {data && <ProfileImage initials={data.userInfo?.fullname.split(" ").map(item=>item[0].toUpperCase()).join("")} />}
          <Box ml="15px" mt="6px" >
            <Flex>
              <Text
            textTransform="capitalize"
            fontSize={["14px", "14px", "24px"]}
            color={activeColour}
            fontWeight={700}
          >
            {data && data.userInfo?.fullname}
          </Text>
          <Box pt={["0px","0px","10px"]} mx="13px">
          
          <Rank rank={merchantRank.rank} />
        </Box>
            </Flex>
             
          <Flex my="8px">
             <Text fontSize={15} color={inactiveColour} fontWeight={300}>
            {data && `@${data.userInfo?.username}`}
          </Text> 
          <Box px={2}>
          <Link to="/edit/profile">
            <Text
              title="Edit your profile records"
              
              fontSize={["12px","12px","15px"]}
              color={inactiveColour}
              fontWeight={300}
              bg={bgColor}
              px={2}
              py={1}
              borderRadius="5px"
              
            >
              {t('edit_profile')}
            </Text>
          </Link>
        </Box>
          </Flex>
         
          </Box>
         
        </Flex>
        <Spacer />
        {!isMobileDevice && (
          <>
            { ((isWhitelistEnabled && isWhitelistedUser ) || (!isWhitelistEnabled)) &&
             <Link to="/council/register">
              <Button
                mt={4}
                width="2xs"
                variant="outline"
                borderColor="#319EF6"
                color="#319EF6"
              >
                {account && rank.amount !== ""
                  ? t("upgrade_rank")
                  : t('become_a_council_member')}
              </Button>
            </Link>}

            <Link to="/merchant/badge">
              <Button mt={4} mx={3} width="2xs" variant={"brand"}>
                {t('claim_merchant_badge')}
              </Button>
            </Link>
          </>
        )}
      </Flex>

      {isMobileDevice && (
        <Flex gap="10px">

        { ((isWhitelistEnabled && isWhitelistedUser ) || (!isWhitelistEnabled)) &&
         <Link to="/council/register">
            <Button
              isLoading={loading}
              mt={4}
              isFullWidth
              variant="outline"
              borderColor="#319EF6"
              color="#319EF6"
              fontSize="12px"
            >
              {account && merchantRank.rank
                ? t('upgrade_rank')
                : t('become_a_council_member')}
            </Button>
          </Link>}

          <Link to="/merchant/badge">
            <Button mt={4} isFullWidth variant={"brand"}
            fontSize="12px">
              {t('claim_merchant_badge')}
            </Button>
          </Link>
        </Flex>
      )}
    
     
      <TradingInformation setFullView={setFullView} profile={profile} account={account} setTabIndex={setTabIndex} setProfileMobilePage={setProfileMobilePage} />
     


      <Flex
        pt={3}
        color={inactiveColour}
        flexDirection={"row"}
        alignContent="space-between"
      >
        {!isMobileDevice && (
          <>
            {" "}
            <Box
              width={isMobileDevice ? "50%" : "21%"}
              py={isMobileDevice ? 4 : 0}
            >
              <Text></Text>
              <Flex>
                <Text fontSize={24} fontWeight={700}>
                  {" "}
                </Text>
                <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
                  {" "}
                </Text>
              </Flex>
            </Box>
            <Spacer />
            <Box
              width={isMobileDevice ? "50%" : "21%"}
              py={isMobileDevice ? 4 : 0}
            >
              <Text></Text>
              <Flex>
                <Text fontSize={24} fontWeight={700}>
                  {" "}
                </Text>
                <Text pl={3} pt="10px" fontWeight={400} fontSize={["12px","12px","14px"]}>
                  {" "}
                </Text>
              </Flex>
            </Box>{" "}
          </>
        )}
      </Flex>
      <Text
        py={5}
        mt={isMobileDevice ? 0 : 7}
        color={activeColour}
        fontSize={20}
        fontWeight={500}
      >
        {t('referrals')}
      </Text>
      <Divider size={"xl"} />
      <Flex mt={isMobileDevice ? 0 : 7} alignItems="center">
        <Flex flexDirection="column">
          <Flex justifyContent="space-between">
            <Text
              width={isMobileDevice ? "100%" : "50%"}
              color={activeColour}
              fontWeight={700}
              fontSize="16px"
              mb={5}
              mt={isMobileDevice ? 5 : ""}
            >
              {/* Earn calculated referral bonuses when those you refer trade on the
              platform instantly, visit{" "}
              <span
                style={{ color: "#319EF6", cursor: "pointer" }}
                onClick={() => setTabIndex(3)}
              >
                Referrals page
              </span>{" "}
              for more information */}
              {t('referral_text')}
            </Text>
            <Flex
              display={isMobileDevice ? "none" : undefined}
              flexDirection="column"
            >
              <Text fontSize="14px">{t('referral_link')}</Text>
              <Flex
                border="1px"
                borderRadius="4px"
                p={2}
                alignItems="center"
                borderColor={referralLinkBorder}
                justifyContent="space-between"
                bgColor={color}
              >
                <Text fontSize="14px" color={linkColor} mr={3}>
                  {shortenInfo(
                    `${window.location.origin.toString()}/app/${account}`,
                    14
                  )}
                </Text>
                <Button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin.toString()}/app/${account}`
                    )
                  }
                  size="sm"
                  variant={"brand"}
                >
                  {t('copy')}
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Text
            fontSize="14px"
            width={isMobileDevice ? "100%" : "50%"}
            fontWeight={400}
          >
         {t('referral_subtext')}
          </Text>

          <Flex
            display={isMobileDevice ? undefined : "none"}
            flexDirection="column"
            my={5}
          >
            <Text fontSize="14px">{t('referral_link')}</Text>
            <Flex
              border="1px"
              borderRadius="4px"
              p={2}
              alignItems="center"
              borderColor={referralLinkBorder}
              justifyContent="space-between"
              bgColor={color}
            >
              <Text fontSize="14px" color={linkColor} mr={3}>
                {shortenInfo(
                  `${window.location.origin.toString()}/app/${account}`,
                  14
                )}
              </Text>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin.toString()}/app/${account}`
                  )
                }
                size="sm"
                variant={"brand"}
              >
                {t('copy')}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Text
        mt={isMobileDevice ? 0 : 7}
       
        color={activeColour}
        fontSize={20}
        fontWeight={500}
      >
        {t('payment_methods')}
      </Text>

      <Divider mt="7px"/>

     
        {!isMobileDevice && ( 
        <Flex
        alignContent={"space-betweens"}
        flexDirection={isMobileDevice ? "column" : "row"}
        my={5}
      >
        <Text
          width={isMobileDevice ? "100%" : "75%"}
          fontWeight={400}
          color={inactiveColour}
          fontSize={16}
        >
          {t('payment_method_details')}
        </Text>
        <Spacer />
          <Button
            onClick={() => setOpenAddBank(true)}
            width={isMobileDevice ? "100%":"260px"}
            my={5}
            variant={"brand"}
          >
            {t('add_payment')}
          </Button>
      </Flex>
        )}

    {!isMobileDevice &&  <Flex mt={4} p={5} background={bgColour}>
        <Text fontSize={14} color={inactiveColour}>
          {t('bank_transfer')}
        </Text>
        <Spacer />
        <Box cursor={"pointer"} mt={1} onClick={() => setOpenAddBank(true)}>
          <AddIcon />
        </Box>
        <Text fontSize={14} pt={0.5} color={activeColour} mx={3}>
          {t('add_bank')}
        </Text>

      </Flex>}
      <Box mt={isMobileDevice ? 7 :0}>
        {data && data.userInfo && <BankList data={!isMobileDevice ? data.userInfo.banks : [data.userInfo.banks[0]]} refresh={refetch} />}
        {isMobileDevice && <Flex color="#319EF6" my="10px" cursor="pointer" justifyContent="end" onClick={()=>setProfileMobilePage(PROFILE_MOBILE.PAYMENT_METHODS)} >{t('see_all_methods')}</Flex>}
      </Box>
      
      <AddBankModal
        handleResult={handleBankAdded}
        openModal={openAddBank}
        closeModal={() => setOpenAddBank(false)}
      />
    </Box> :
    PROFILE_MOBILE.PAYMENT_METHODS ===profileMobilePage ?
    <>
     <>
  <Flex onClick={()=>setView(PROFILE_MOBILE.PROFILE_INFORMATION)} my="10px">
       <ArrowBackIcon /> <Text mt="-4px" ml="8px">Back to Profile</Text>
    </Flex>
    <Text mt="23px" color={activeColour} fontSize={20} fontWeight={500}>
       {t('payment_methods')}
      </Text>
      <Divider size={"xl"} mt="7px" />
      <Text mt="20px">
         {t('payment_method_details')}
      </Text>
      <Button
            onClick={() => setOpenAddBank(true)}
            width={isMobileDevice ? "100%":"260px"}
            my={5}
            variant={"brand"}
          >
            {t('add_payment')}
          </Button>
<BankList data={data.userInfo.banks} refresh={refetch} />

    </>
    <AddBankModal
        handleResult={handleBankAdded}
        openModal={openAddBank}
        closeModal={() => setOpenAddBank(false)}
      />
    </>:
    PROFILE_MOBILE.TRADING_INFORMATION ===profileMobilePage ?
    <Box>
       <TradingInformation 
       profile={profile} 
       account={account} 
       setTabIndex={setTabIndex} 
       setFullView={setFullView}
       fullView={fullView}
       setProfileMobilePage={setProfileMobilePage}  />
    </Box> : null
    }
    </>
    
  );
};

export default MyP2pAccount;
