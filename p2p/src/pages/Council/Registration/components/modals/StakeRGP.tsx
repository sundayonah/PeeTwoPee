import { useEffect, useState } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  Text,
  ModalOverlay,
  useColorModeValue,
  ModalBody,
  Flex,
  Link,
  Button,
  InputRightElement,
  InputGroup,
  Input,
  Divider,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import RankRequirements from "./RankRequirements";
import { ethers } from "ethers";
import {
  useActiveWeb3React,
  useRGPBalance,
  useRGPPrice,
} from "../../../../../utils/hooks";
import {
  useSelectBadge,
  useRank,
} from "../../../../../utils/hooks/useRigelBadge";
import { useAllowance } from "../../../../../utils/hooks/useAllowance";
import { CONTRACT_ADDRESSES, RGP } from "../../../../../utils";
import { ERC20Token, CouncilMemberStakeContract } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { setOpenModal, TrxState } from "../../../../../state/application";
import { useMutation } from "@apollo/client";
import { UPDATE_RANK } from "../../../../account/gql/mutations";
import RoyalExecutorLigth from "../../../../../assets/Legendary.svg";
import LegendaryDark from "../../../../../assets/Legendary_Badge_Dark.svg";
import Vizier from "../../../../../assets/Diamond.svg";
import VizierDark from "../../../../../assets/Diamond_Badge_Dark.svg";
// import Earl from "../../../../../assets/Gold.svg";
// import EarlDark from "../../../../../assets/Gold_Badge_Dark.svg";
// import Mage from "../../../../../assets/Silver.svg";
// import MageDark from "../../../../../assets/Silver_Badge_Dark.svg";
// import Cadet from "../../../../../assets/Bronze_Badge_Light.svg";
// import BrozeDark from "../../../../../assets/Bronze_Badge_Dark.svg";
import Sapphire from "../../../../../assets/sapphire.svg";
import Amber from "../../../../../assets/amber.svg";
import Emerald from "../../../../../assets/emerald.svg";
// import Ruby from "../../../../../assets/ruby.svg";

import EmeraldDark from "../../../../../assets/Emerald_Dark.svg";
import AmberDark from "../../../../../assets/Amber_Dark.svg";
import SapphireDark from "../../../../../assets/Sapphire_Dark.svg";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const StakeRGP = ({
  openModal,
  closeModal,
  Badges,
  reload,
  setReload,
  merchant,
}: {
  openModal: boolean;
  closeModal: () => void;
  Badges?: Array<{ rank: string; min: string; id: number }>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  merchant?: boolean;
}) => {
  const { account, chainId, library } = useActiveWeb3React();
  const mode = useColorModeValue("light", "dark");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const lightTextColor = useColorModeValue("#666666", "#DCE5EF");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const [openRankModal, setOpenRankModal] = useState(false);
  const [stakeRGPSuccessModal, setStakeRGPSuccessModal] = useState(false);
  const RoyalExecutor = useColorModeValue(RoyalExecutorLigth, LegendaryDark);
  const DiamondBadge = useColorModeValue(Vizier, VizierDark);
  const SapphireBadge = useColorModeValue(Sapphire, SapphireDark);
  const AmberBadge = useColorModeValue(Amber, AmberDark);
  const EmeraldBadge = useColorModeValue(Emerald, EmeraldDark);
  // const [reload, setReload] = useState(false);

  const badgeHoverBackground = useColorModeValue("#EBF6FE", "");
  const badgeHoverBorder = useColorModeValue("#0760A8", "#4CAFFF");
  const nonActiveBorderColor = useColorModeValue("#DEE5ED", "#4D555E");
  const buyRGPColor = useColorModeValue("#319EF6", "#319EF6");
  const tooltipBgcolor = useColorModeValue("#319EF6", "#319EF6");
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [priceInput, setPriceInput] = useState("");
  const [RGPBalance] = useRGPBalance();
  const [RGPPrice] = useRGPPrice();
  useSelectBadge({
    priceInput,
    setSelectedBadgeIndex: setSelectedIndex,
    setPriceInput,
    badges: Badges,
  });

  const { tokenAllowance } = useAllowance(
    RGP[chainId as number],
    priceInput,
    CONTRACT_ADDRESSES[chainId]["STAKING"],
    reload,
    setReload
  );

  const dispatch = useDispatch();

  const { rank } = useRank(reload, setReload);
  const [updateRank, { loading, error, data }] = useMutation(UPDATE_RANK, {
    variables: {
      chain: `${chainId}`,
    },
  });

  const stakeRGP = async () => {
    try {
      dispatch(
        setOpenModal({
          message: t('wallet_req'),
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const formatInputPrice = ethers.utils.parseEther(priceInput);
      const stakeContract = await CouncilMemberStakeContract(
        CONTRACT_ADDRESSES[chainId]["STAKING"],
        library
      );
      const stakeTx = await stakeContract.earnRGPBadge(
        selectedIndex,
        formatInputPrice,
        {
          from: account,
        }
      );

      const { confirmations } = await stakeTx.wait(1);
      if (confirmations >= 1) {
        if (account) {
          await updateRank();
        }
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
  useEffect(() => {
    if (data) {
      dispatch(
        setOpenModal({
          message: `Transaction Approved Successful`,
          trxState: TrxState.TransactionSuccessful,
        })
      );
      closeModal();

      setStakeRGPSuccessModal(true);
      setReload(true);
    }
  }, [data]);
  const approveTransaction = async () => {
    try {
      // const formatInput = ethers.utils.parseEther(priceInput);
      dispatch(
        setOpenModal({
          message: t('wallet_req'),
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const rigelToken = await ERC20Token(RGP[chainId as number], library);
      const balance = await rigelToken.balanceOf(account);
      const approveBal =
        parseFloat(ethers.utils.formatEther(balance.toString())) +
        parseFloat(priceInput);
      const approveTx = await rigelToken.approve(
        CONTRACT_ADDRESSES[chainId]["STAKING"],
        ethers.utils.parseEther(approveBal.toString()),
        {
          from: account,
        }
      );

      const { confirmations } = await approveTx.wait(1);

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

  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent
          bg={bgColour}
          color='#fff'
          borderRadius='6px'
          maxWidth={450}
        >
          <Flex mt={2}>
            <Text fontSize='16px' fontWeight='500' color={textColour} ml={4}>
              Stake RGP{" "}
              <span>
                <Tooltip
                  bgColor={tooltipBgcolor}
                  hasArrow
                  p={3}
                  borderRadius={"6px"}
                  label={
                    <>
                      <Text fontSize={"14px"}>
                        RGP is the native token for Rigel Protocol, based on
                        Ethereum, Binance Smart Chain and Polygon.
                      </Text>

                      <Text fontSize={"14px"} mt={5}>
                        You can buy RGP by using the “Buy RGP” button below.
                      </Text>
                    </>
                  }
                >
                  <InfoOutlineIcon cursor={"pointer"} mb={1} ml={1} />
                </Tooltip>
              </span>
            </Text>
            <ModalCloseButton
              bg='none'
              color={lightTextColor}
              cursor='pointer'
              _focus={{ outline: "none" }}
              onClick={closeModal}
              border={"1px solid"}
              size={"sm"}
              mr={3}
              p={"7px"}
            />
          </Flex>
          <Divider mt={3} />
          <ModalBody mt={4} flexDirection={"column"} alignItems={"center"}>
            <Flex flexDirection='row' flexWrap='wrap'>
              {Badges
                ? Badges.map((badge) => (
                    <Flex
                      cursor='pointer'
                      mb={5}
                      mr={2}
                      p={2}
                      borderRadius='5px'
                      flexDirection='column'
                      border='1px'
                      color='#666666'
                      borderColor={
                        selectedIndex === badge.id
                          ? badgeHoverBorder
                          : nonActiveBorderColor
                      }
                      backgroundColor={
                        selectedIndex === badge.id ? badgeHoverBackground : ""
                      }
                      _hover={{
                        backgroundColor: badgeHoverBackground,
                        borderColor: badgeHoverBorder,
                      }}
                      onClick={() => {
                        setPriceInput(ethers.utils.formatEther(badge.min));
                        setSelectedIndex(badge.id);
                      }}
                    >
                      {merchant ? (
                        <Image
                          h='24px'
                          mb={2}
                          src={
                            badge?.rank.toLowerCase() === "royal executor"
                              ? RoyalExecutor
                              : badge?.rank.toLowerCase() === "vizier"
                              ? DiamondBadge
                              : badge?.rank.toLowerCase() === "earl"
                              ? SapphireBadge
                              : badge?.rank.toLowerCase() === "mage"
                              ? AmberBadge
                              : badge?.rank.toLowerCase() === "cadet"
                              ? EmeraldBadge
                              : null
                          }
                        />
                      ) : (
                        <Text
                          color={textColour}
                          fontWeight='bold'
                          fontSize='14px'
                        >
                          {badge.rank}
                        </Text>
                      )}

                      <Text color={textColour} fontSize='12px'>{`$${(
                        parseFloat(RGPPrice as string) *
                        parseFloat(ethers.utils.formatEther(badge.min))
                      ).toFixed(2)} (${ethers.utils.formatEther(
                        badge.min
                      )} RGP)`}</Text>
                    </Flex>
                  ))
                : null}
            </Flex>
            <Text
              mb={3}
              fontSize='14px'
              fontWeight={400}
              color={lightTextColor}
            >
              Enter Stake Amount
            </Text>
            <InputGroup size='md'>
              <Input
                placeholder='0'
                opacity='0.5'
                h='50px'
                borderRadius='6px'
                border='2px'
                fontSize='14px'
                fontWeight={500}
                color={textColour}
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
              <InputRightElement marginRight='15px'>
                <Button
                  color='#4CAFFF'
                  border='none'
                  borderRadius='0px'
                  fontSize='13px'
                  p='1'
                  mt='10px'
                  height='20px'
                  cursor='pointer'
                  background='none'
                  _hover={{ background: "rgba(64, 186, 213, 0.15)" }}
                  onClick={() => setPriceInput(RGPBalance)}
                >
                  MAX
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text
                mt={2}
                mb={5}
                fontSize='14px'
                fontWeight={500}
                color={lightTextColor}
              >
                {`RGP Balance: ${RGPBalance} RGP`}
              </Text>

              <Text
                cursor={"pointer"}
                color={buyRGPColor}
                fontSize={"14px"}
                textDecoration={"underline"}
                textDecorationColor={buyRGPColor}
              >
                <a target={"_blank"} href='https://smartswap.rigelprotocol.com'>
                  {" "}
                  Buy RGP
                </a>
              </Text>
            </Flex>
            {tokenAllowance &&
            parseFloat(ethers.utils.formatEther(tokenAllowance)) >
              parseFloat(priceInput) ? (
              <Button
                my={3}
                variant={"brand"}
                // onClick={() => setStakeRGPSuccessModal(!stakeRGPSuccessModal)}
                onClick={() => stakeRGP()}
                isFullWidth
                disabled={
                  selectedIndex === undefined ||
                  !priceInput ||
                  parseFloat(RGPBalance) < parseFloat(priceInput)
                }
              >
                {parseFloat(RGPBalance) < parseFloat(priceInput)
                  ? "Insufficient RGP Balance"
                  : "Stake"}
              </Button>
            ) : (
              <Button
                my={3}
                variant={"brand"}
                onClick={() => approveTransaction()}
                isFullWidth
                disabled={
                  selectedIndex === undefined ||
                  !priceInput ||
                  parseFloat(RGPBalance) < parseFloat(priceInput)
                }
              >
                {parseFloat(RGPBalance) < parseFloat(priceInput)
                  ? "Insufficient RGP Balance"
                  : "Approve Transaction"}
              </Button>
            )}

            <Link
              color='#319EF6'
              textDecoration='underline'
              onClick={() => setOpenRankModal(!openRankModal)}
            >
              <Text fontSize='12px' fontWeight={500} textAlign='center' mb={2}>
                See ranking level requirements
              </Text>
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>

      <RankRequirements
        openModal={openRankModal}
        closeModal={() => setOpenRankModal(false)}
        Badges={Badges}
        merchant={merchant}
      />

      {/* <StakingSuccess
        openModal={stakeRGPSuccessModal}
        closeModal={() => setStakeRGPSuccessModal(false)}
      /> */}
    </>
  );
};

export default StakeRGP;
