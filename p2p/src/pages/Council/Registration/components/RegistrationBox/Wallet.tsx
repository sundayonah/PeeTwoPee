import { useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Button,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import RankRequirements from "../modals/RankRequirements";
import CouncilRegSuccess from "../modals/CouncilRegSuccess";

import StakeNFT from "../modals/StakeNFT";
import StakeRGP from "../modals/StakeRGP";
import FormWalletConnect from "../../../../../components/FormWalletConnect";
import { useActiveWeb3React } from "../../../../../utils/hooks/useActiveWeb3React";
import {
  useRigelBadge,
  useRank,
} from "../../../../../utils/hooks/useRigelBadge";
import { ethers } from "ethers";

import UpdateRankModal from "../../../updateRank/UpdateRankModal";
import UnstakeRGPModal from "./UnstakeRGPModal";
import { useTranslation } from "react-i18next";
const Wallet = () => {
  const { account } = useActiveWeb3React();
  const mode = useColorModeValue("light", "dark");
  const btnBgColor = useColorModeValue("#A7D6FB", "#4A739B");
  const btnBgActiveColor = useColorModeValue("#319EF6", "#4CAFFF");
  const bgColor = useColorModeValue("#F2F5F8", "#213345");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const stakeValueBorderColor = useColorModeValue("#319EF6", "");
  const stakeValueTextColor = useColorModeValue("#319EF6", "");
  const [openRankModal, setOpenRankModal] = useState(false);
  const [openStakeNFTModal, setOpenStakeNFTModal] = useState(false);
  const [openStakeRGPModal, setOpenStakeRGPModal] = useState(false);
  const [regSuccessModal, setRegSuccessModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const { Badges } = useRigelBadge();
  const { rank, merchantRank } = useRank(reload, setReload);
  const { chainId } = useActiveWeb3React();

  const [openUnstakeModal, setOpenUnstakeModal] = useState(false);
  const [openUpdateRankeModal, setOpenUpdaterankModal] = useState(false);

  const { t } = useTranslation()
  return (
    <>
      <UnstakeRGPModal
        onClose={() => setOpenUnstakeModal(false)}
        openUnstakeModal={openUnstakeModal}
        setReload={setReload}
      />
      <UpdateRankModal
        onClose={() => setOpenUpdaterankModal(false)}
        openUpdateRankModal={openUpdateRankeModal}
      />
      <Text
        fontSize='20px'
        fontWeight={400}
        color={mode === "dark" ? "white" : "#333333"}
      >
        {t('council_head')}
      </Text>
      <Text
        fontSize='16px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        pt={2}
      >
        {t('council_text')}
      </Text>
      <FormWalletConnect />
      <Box
        border={`1px solid ${borderColor}`}
        borderRadius='4px'
        px={10}
        py={6}
      >
        <Flex
          flexDirection={"column"}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <Text
            fontSize='14px'
            fontWeight={500}
            color={mode === "dark" ? "white" : "#333333"}
          >
            {t('rak')}
          </Text>
          <Text
            fontSize='12px'
            fontWeight={400}
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
          >
            {t('rank_text')}
          </Text>

          {account ? (
            rank.amount !== "" ? (
              <Flex
                mt={5}
                mb='10px'
                flexDirection={"column"}
                justifyContent='center'
                alignItems='center'
                backgroundColor={bgColor}
                border={`1px solid ${borderColor}`}
                borderRadius='4px'
                py={6}
                px={16}
              >
                <Flex
                  flexDirection='column'
                  borderRadius='5px'
                  border='1px'
                  px={6}
                  py={2}
                  borderColor={stakeValueBorderColor}
                >
                  <Text
                    fontSize='14px'
                    color={stakeValueTextColor}
                    fontWeight='bold'
                  >
                    {ethers.utils.formatEther(rank?.amount)} RGP
                  </Text>
                  <Text fontSize='12px'>{t('sta')}</Text>
                </Flex>
                <Text mt={3} mb={4} fontWeight='bold' fontSize='12px'>
                  {t('y_rank')}{" "}
                  <span style={{ color: stakeValueTextColor }}>
                    {rank?.rank}
                  </span>
                </Text>
                <Text fontSize='12px'>
                  {t('sta_in')}
                </Text>
                <Box my={3}>
                  <Button
                    mr={3}
                    width={isMobileDevice ? "undefined" : 200}
                    mx={5}
                    fontSize='14px'
                    fontWeight={500}
                    bg={btnBgActiveColor}
                    variant={"brand"}
                    onClick={() => setOpenUnstakeModal(true)}
                  >
                    {t('unstake')} RGP
                  </Button>

                  <Button
                    mr={3}
                    mt={4}
                    width={isMobileDevice ? "undefined" : 200}
                    mx={5}
                    fontSize='14px'
                    fontWeight={500}
                    variant='outline'
                    borderColor='#319EF6'
                    color='#319EF6'
                    onClick={() => setOpenUpdaterankModal(true)}
                  >
                    Upgrade role
                  </Button>
                </Box>
              </Flex>
            ) : merchantRank.rank !== "" ? (
              <Flex
                mt={5}
                mb='10px'
                flexDirection={"column"}
                justifyContent='center'
                alignItems='center'
                backgroundColor={bgColor}
                border={`1px solid ${borderColor}`}
                borderRadius='4px'
                py={6}
                px={16}
              >
                <Flex
                  flexDirection='column'
                  borderRadius='5px'
                  border='1px'
                  px={6}
                  py={2}
                  borderColor={stakeValueBorderColor}
                >
                  <Text
                    fontSize='14px'
                    color={stakeValueTextColor}
                    fontWeight='bold'
                  >
                    {ethers.utils.formatEther(merchantRank?.amount)} RGP
                  </Text>
                  <Text fontSize='12px'>{t('sta')}</Text>
                </Flex>
                <Text mt={3} mb={4} fontWeight='bold' fontSize='12px'>
                  Your ranking is{" "}
                  <span style={{ color: stakeValueTextColor }}>
                    {merchantRank?.rank}
                  </span>
                </Text>
                <Text fontSize='12px'>
                  {t('sta_in')}
                </Text>
              </Flex>
            ) : (
              <Flex
                mt={5}
                mb='10px'
                flexDirection={"column"}
                justifyContent='center'
                alignItems='center'
                backgroundColor={bgColor}
                border={`1px solid ${borderColor}`}
                borderRadius='4px'
                py={6}
                // px={20}
              >
                <Text>{t('stae')} RGP</Text>
                <Flex mt={5}>
                  <Button
                    mr={3}
                    width={300}
                    mx={5}
                    // p={6}
                    fontSize='14px'
                    fontWeight={500}
                    bg={btnBgActiveColor}
                    variant={"brand"}
                    onClick={() => setOpenStakeRGPModal(!openStakeRGPModal)}
                  >
                    {t('sta')} RGP
                  </Button>
                  {/* <Button
                  p={6}
                  fontSize='14px'
                  fontWeight={500}
                  bg={btnBgActiveColor}
                  onClick={() => setOpenStakeNFTModal(!openStakeNFTModal)}
                >
                  {t('sta')} NFT
          </Button> */}
                </Flex>
              </Flex>
            )
          ) : (
            <Flex
              mt={5}
              mb='10px'
              flexDirection={"column"}
              justifyContent='center'
              alignItems='center'
              backgroundColor={bgColor}
              border={`1px solid ${borderColor}`}
              borderRadius='4px'
              py={6}
              px={10}
            >
              <Text>{t('con')}</Text>

              <Button
                mr={3}
                p={6}
                disabled={true}
                fontSize='14px'
                fontWeight={500}
                bg={btnBgColor}
                isFullWidth
              >
                {t('stae')} RGP
              </Button>
              {/* <Button
                p={6}
                disabled={true}
                fontSize='14px'
                fontWeight={500}
                bg={btnBgColor}
              >
                {t('stae')} NFT
        </Button> */}
            </Flex>
          )}
          <Link
            color='#319EF6'
            textDecoration='underline'
            onClick={() => setOpenRankModal(!openRankModal)}
          >
            <Text fontSize='12px' fontWeight={500}>
             {t('reqi')}
            </Text>
          </Link>
        </Flex>

        {/*
        <Flex flexDirection={'column'} alignContent='flex-start' justifyContent={'flex-start'} justifyItems={'flex-start'} >
          <Flex
            mt={2}
            color="#fff"
            mb="10px"
            flexDirection={"row"}
            alignItems="center"
          >
            <AiOutlineExclamationCircle color="#EEC749" />

            <Text
              py={3}
              pl={2}
              fontSize={12}
              fontFamily="Cera Pro"
              fontWeight={400}
              color={"#EEC749"}
            >
              If you are upgrading roles, you will only pay the difference in
              RGP.
            </Text>
          </Flex>

          <Flex
            mt={2}
            color="#fff"
            mb="10px"
            flexDirection={"row"}
            alignItems="center"
          >
            <AiOutlineExclamationCircle color="#EEC749" />

            <Text
              py={3}
              pl={2}
              fontSize={12}
              fontFamily="Cera Pro"
              color={"#EEC749"}
            >
              If you are downgrading, you will be rewarded the difference in
              RGP.
            </Text>
          </Flex>
        </Flex>

        */}
      </Box>

      {/*
        <Button
        disabled={merchantRank.rank === "" && rank.amount === ""}
        variant={"brand"}
        onClick={async () => {
          dispatch(setActiveBar(screenId.STARTVOTING));
          setRegSuccessModal(true);
        }}
        isFullWidth
        my={6}
        mb={4}
      >
        Continue
      </Button>*/}
      <RankRequirements
        openModal={openRankModal}
        closeModal={() => setOpenRankModal(false)}
        Badges={Badges}
      />
      <StakeNFT
        openModal={openStakeNFTModal}
        closeModal={() => setOpenStakeNFTModal(false)}
        checkRank={reload}
        setCheckRank={setReload}
      />
      <StakeRGP
        openModal={openStakeRGPModal}
        closeModal={() => setOpenStakeRGPModal(false)}
        Badges={Badges}
        reload={reload}
        setReload={setReload}
      />
      <CouncilRegSuccess openModal={regSuccessModal} />
    </>
  );
};

export default Wallet;
