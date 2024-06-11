import { useState } from "react";
import {
  Flex,
  useColorModeValue,
  Text,
  Button,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
//import { screenId, setActiveBar } from "../../../../../state/council";
//import RankRequirements from "../modals/RankRequirements";
//import CouncilRegSuccess from "../modals/CouncilRegSuccess";
import StakeRGP from "../../Council/Registration/components/modals/StakeRGP";
import RgpRequirements from "../../Council/Registration/components/modals/RankRequirements";

import { ethers } from "ethers";
import {
  useRank,
  useRigelBadge,
  useMerchantBadge,
} from "../../../utils/hooks/useRigelBadge";
import { useActiveWeb3React } from "../../../utils/hooks";
import FormWalletConnect from "../../../components/FormWalletConnect";
import RankRequirements from "./RankRequirements";
import CouncilRegSuccess from "./modals/CouncilRegSuccess";
import StakeNFT from "./modals/StakeNFT";

import UnstakeModal from "../../Council/unstake/UnstakeModal";
import { setOpenModal, TrxState } from "../../../state/application";
import { CONTRACT_ADDRESSES } from "../../../utils";
import { CouncilMemberStakeContract } from "../../../utils";
import { nft_chains } from "../../../utils/constants/constants";

const MarchantBadge = () => {
  const dispatch = useDispatch();
  const { account, library, chainId } = useActiveWeb3React();
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

  const [nameValue, setNameValue] = useState<string>();
  const { Badges } = useRigelBadge();
  const { rank, merchantRank } = useRank(reload, setReload);

  const [openUnstakeModal, setOpenUnstakeModal] = useState(false);
  const [openUpdateRankeModal, setOpenUpdaterankModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { Badges } = useMerchantBadge();

  const handleUnstake = async () => {
    try {
      dispatch(
        setOpenModal({
          message: t('wallet_req'),
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const stakingContract = await CouncilMemberStakeContract(
        CONTRACT_ADDRESSES[chainId]["STAKING"],
        library
      );

      const stakingTx = await stakingContract.looseNFTBadge();
      const { confirmations } = await stakingTx.wait(1);
      if (confirmations >= 1) {
        dispatch(
          setOpenModal({
            message: `Transaction Approved Successful`,
            trxState: TrxState.TransactionSuccessful,
          })
        );

        setReload(true);
      }
    } catch (err) {
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
    }
  };

  const non_nft =
    nft_chains.includes(chainId as number) === true ? false : true;

  return (
    <>
      <UnstakeModal
        onClose={() => setOpenUnstakeModal(false)}
        openUnstakeModal={openUnstakeModal}
      />
      <Text
        fontSize='20px'
        fontWeight={400}
        color={mode === "dark" ? "white" : "#333333"}
      >
        Claim Merchant Badge
      </Text>
      <Text
        fontSize='16px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        pt={2}
      >
        Claim your merchant badge by staking NFTs and enjoy merchant privileges.
      </Text>
      <FormWalletConnect />
      <Flex
        flexDirection={"column"}
        justifyContent='center'
        alignItems='center'
        border={`1px solid ${borderColor}`}
        borderRadius='4px'
        px={5}
        py={6}
        textAlign='center'
      >
        <Text
          fontSize='14px'
          fontWeight={500}
          color={mode === "dark" ? "white" : "#333333"}
        >
          Badge Ranking
        </Text>
        <Text
          fontSize='12px'
          fontWeight={400}
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
        >
          Your badge is dependent on your stake value on the P2P Dapp. The
          higher your stake, the higher your merchant badge.{" "}
        </Text>

        {account ? (
          // rank.amount !== "" ? (
          //   <Flex
          //     mt={5}
          //     mb='10px'
          //     flexDirection={"column"}
          //     justifyContent='center'
          //     alignItems='center'
          //     backgroundColor={bgColor}
          //     border={`1px solid ${borderColor}`}
          //     borderRadius='4px'
          //     py={6}
          //     px={16}
          //   >
          //     <Flex
          //       flexDirection='column'
          //       borderRadius='5px'
          //       border='1px'
          //       px={6}
          //       py={2}
          //       borderColor={stakeValueBorderColor}
          //     >
          //       <Text
          //         fontSize='14px'
          //         color={stakeValueTextColor}
          //         fontWeight='bold'
          //       >
          //         {ethers.utils.formatEther(rank?.amount)} RGP
          //       </Text>
          //       <Text fontSize='12px'>Stake value</Text>
          //     </Flex>
          //     <Text mt={3} mb={4} fontWeight='bold' fontSize='12px'>
          //       Your ranking is{" "}
          //       <span style={{ color: stakeValueTextColor }}>{rank?.rank}</span>
          //     </Text>
          //     <Text fontSize='12px'>
          //       You can only vote on disputes of $0 - $500.
          //     </Text>

          //     <Box my={3}>
          //       <Button
          //         mr={3}
          //         width={300}
          //         mx={5}
          //         // p={6}
          //         fontSize='14px'
          //         fontWeight={500}
          //         bg={btnBgActiveColor}
          //         variant={"brand"}
          //         onClick={() => setOpenUnstakeModal(true)}
          //       >
          //         Unstake NFT
          //       </Button>
          //     </Box>
          //   </Flex>
          // )
          merchantRank.rank !== "" ? (
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
                <Text fontSize='12px'>Stake value</Text>
              </Flex>

              <Text mt={3} mb={4} fontWeight='bold' fontSize='12px'>
                Your ranking is{" "}
                <span style={{ color: stakeValueTextColor }}>
                  {merchantRank?.rank}
                </span>
              </Text>

              <Button
                variant={"brand"}
                _hover={{ backgroundColor: "" }}
                // onClick={() => setOpenAccessModal(!openAccessModal)}
                onClick={() => handleUnstake()}
                isFullWidth
              >
                {loading ? <Spinner /> : "Unstake NFT"}
              </Button>
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
              <Text>{non_nft ? "Stake RGP" : "Stake NFT"}</Text>
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
                  onClick={() => {
                    if (non_nft) {
                      setOpenStakeRGPModal(true);
                    } else {
                      setOpenStakeNFTModal(!openStakeNFTModal);
                    }
                  }}
                >
                  {non_nft ? "Stake RGP" : "Stake NFT"}
                </Button>
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
            <Text>Connect wallet to Stake NFT</Text>
            <Flex mt={5}>
              <Button
                p={6}
                disabled={true}
                fontSize='14px'
                fontWeight={500}
                bg={btnBgColor}
              >
                Stake NFT
              </Button>
            </Flex>
          </Flex>
        )}
        <Link
          color='#319EF6'
          textDecoration='underline'
          onClick={() => setOpenRankModal(!openRankModal)}
        >
          <Text fontSize='12px' fontWeight={500}>
            See badge ranking requirements
          </Text>
        </Link>
      </Flex>

      {/* <Button
        disabled={merchantRank.rank === "" && rank.amount === ""}
        variant={"brand"}
        onClick={async () => {
          dispatch(setActiveScreen(marchantBadgeScreens.SupportedCrypto));
          // setRegSuccessModal(true);
        }}
        isFullWidth
        my={6}
        mb={4}
      >
        Continue
      </Button> */}

      {non_nft ? (
        <RgpRequirements
          openModal={openRankModal}
          closeModal={() => setOpenRankModal(false)}
          Badges={Badges}
          merchant={true}
        />
      ) : (
        <RankRequirements
          openModal={openRankModal}
          closeModal={() => setOpenRankModal(false)}
        />
      )}

      <StakeRGP
        openModal={openStakeRGPModal}
        closeModal={() => setOpenStakeRGPModal(false)}
        Badges={Badges}
        reload={reload}
        setReload={setReload}
        merchant={true}
      />
      <StakeNFT
        openModal={openStakeNFTModal}
        closeModal={() => setOpenStakeNFTModal(false)}
        checkRank={reload}
        setCheckRank={setReload}
      />
      <CouncilRegSuccess openModal={regSuccessModal} />
    </>
  );
};

export default MarchantBadge;
