import {
  Button,
  Box,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue, 
  useRadio,
  useRadioGroup,
  useMediaQuery,
} from "@chakra-ui/react"; 
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOpenModal, TrxState } from "../../../state/application";
import {
  CONTRACT_ADDRESSES,
  CouncilMemberStakeContract, 
} from "../../../utils";
import { useActiveWeb3React } from "../../../utils/hooks";
import useIsDisputePersonnel from "../../../utils/hooks/useIsDisputePersonnel";
import { useRank } from "../../../utils/hooks/useRigelBadge";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        my={3}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          //   bg: 'teal.600',
          color: "#319EF6",
          borderColor: "#319EF6",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const UnstakeModal = ({
  openUnstakeModal,
  onClose,
}: {
  openUnstakeModal: boolean;
  onClose: () => void;
}) => {
  const mode = useColorModeValue("light", "dark");
  const { account, chainId, library } = useActiveWeb3React();
  const dispatch = useDispatch();

  const [activevalue, setvalue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const textColor1 = useColorModeValue("#666666", "#999999");
  const textColor2 = useColorModeValue("#333333", "#ffffff");

  const options = ["Unstake RPG", "Unstake NFT"];
  const [reload, setReload] = useState(false);
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate()

  const TextOptions = {
    "Unstake RPG": "You will loose role of a council member",
    "Unstake NFT": "You will loose rank of a merchant & council member",
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Unstake RPG",
    onChange: (e: string) => setvalue(e),
  });

  const group = getRootProps();

  const { rank, merchantRank } = useRank(reload, setReload);
  const unstakeData = useIsDisputePersonnel();
  async function looseRGP() {
    if (account) {
      try {
        setLoading(true);
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
        const trxn = await stakingContract.looseRGPBadge(rank?.amount);
        const { confirmations } = await trxn.wait(1);

        if (confirmations >= 1) {
          dispatch(
            setOpenModal({
              message: `Successfully Unstaked RGP`,
              trxState: TrxState.TransactionSuccessful,
            })
          );

          navigate("/council/register")
          setLoading(false);
        } else {
          setLoading(false);
          dispatch(
            setOpenModal({
              message: ``,
              trxState: TrxState.TransactionFailed,
            })
          );
        }
      } catch (error) {
        setLoading(false);
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionFailed,
          })
        );
      }
    }
  }

  async function looseNFT() {
    if (account) {
      try {
        setLoading(true);
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
        const trxn = await stakingContract.looseNFTBadge();
        const { confirmations } = await trxn.wait(1);

        if (confirmations >= 1) {
          dispatch(
            setOpenModal({
              message: `Successfully Unstaked NFT`,
              trxState: TrxState.TransactionSuccessful,
            })
          );
          navigate("/council/register")
          setLoading(false);
        } else {
          setLoading(false);
          dispatch(
            setOpenModal({
              message: ``,
              trxState: TrxState.TransactionFailed,
            })
          );
        }
      } catch (error) {
        setLoading(false);
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionFailed,
          })
        );
      }
    }
  }

  function handleContinue() {
    if (activevalue == "Unstake RPG") {
      looseRGP();
    } else if (activevalue == "Unstake NFT") {
      looseNFT();
    }
  }

  return (
    <>
      <Modal isOpen={openUnstakeModal} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <Flex flexDirection="column" mx={5}>
            <Flex my={2}>
              <ModalCloseButton
                border={
                  mode === "dark" ? "1px solid #FFF" : "1px solid #666666"
                }
              />
            </Flex>
          </Flex>
          <Box mx={5} mb={5}>
            <Flex my={7} justifyContent="center" alignContent="center">
              <Text fontWeight={700} fontSize={24} mt={7}>
                What will you like to unstake?
              </Text>
            </Flex>

            <Box my={4} {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard my={4} key={value} {...radio}>
                    <Text
                      my={2}
                      fontWeight={500}
                      color={activevalue == value ? "#319EF6" : textColor2}
                    >
                      {value}
                    </Text>
                    <Text
                      my={2}
                      fontWeight={400}
                      color={activevalue == value ? "#319EF6" : textColor1}
                    >
                      {TextOptions[value]}
                    </Text>
                  </RadioCard>
                );
              })}
            </Box>

            <Button
              disabled={
                activevalue == null || loading || unstakeData?.isResolving
              }
              color="white"
              variant={"brand"}
              my={3}
              isFullWidth
              onClick={handleContinue}
              isLoading={loading}
            >
              {unstakeData?.isResolving ? "Unresolved Dispute" : "Continue"}
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnstakeModal;
