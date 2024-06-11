import {
  Button,
  Box,
  Flex,
  Modal, 
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue, 
  useRadio, 
  useMediaQuery,
} from "@chakra-ui/react"; 
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOpenModal, TrxState } from "../../../../../state/application";
import {
  CONTRACT_ADDRESSES,
  CouncilMemberStakeContract,
} from "../../../../../utils";
import { useActiveWeb3React } from "../../../../../utils/hooks";
import useIsDisputePersonnel from "../../../../../utils/hooks/useIsDisputePersonnel";
import { useRank } from "../../../../../utils/hooks/useRigelBadge";

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

const UnstakeRGPModal = ({
  openUnstakeModal,
  onClose,
  setReload
}: {
  openUnstakeModal: boolean;
  onClose: () => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>

}) => {
  const mode = useColorModeValue("light", "dark");
  const { account, chainId, library } = useActiveWeb3React();
  const dispatch = useDispatch();

  const [activevalue, setvalue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const textColor1 = useColorModeValue("#666666", "#999999");
  const textColor2 = useColorModeValue("#333333", "#ffffff");

  const options = ["Unstake RPG", "Unstake NFT"];
  const [reload, setingReload] = useState(false);
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate();
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

          //navigate("/council/register");
          setReload(true)
          onClose()
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

  return (
    <>
      <Modal isOpen={openUnstakeModal} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <Box mx={5} mb={5}>
          <Box mx={5} mb={5}>
                        <Flex my={7}
               flexDirection={"column"}
               justifyContent="center"
               alignItems="center"
               textAlign={'center'}
             >
             <Box mt={2}>
              <svg
                width="42"
                height="46"
                viewBox="0 0 42 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 26.6458C20.1458 26.6458 19.4375 25.9374 19.4375 25.0833V14.1458C19.4375 13.2916 20.1458 12.5833 21 12.5833C21.8542 12.5833 22.5625 13.2916 22.5625 14.1458V25.0833C22.5625 25.9374 21.8542 26.6458 21 26.6458Z"
                  fill="#D9AA0F"
                />
                <path
                  d="M20.9974 33.9375C20.4349 33.9375 19.914 33.7293 19.5182 33.3334C19.3307 33.1251 19.1849 32.8959 19.0599 32.6459C18.9557 32.3959 18.9141 32.125 18.9141 31.8542C18.9141 31.3125 19.1432 30.7708 19.5182 30.375C20.289 29.6042 21.7058 29.6042 22.4766 30.375C22.8516 30.7708 23.0807 31.3125 23.0807 31.8542C23.0807 32.125 23.0182 32.3959 22.914 32.6459C22.8099 32.8959 22.6641 33.1251 22.4766 33.3334C22.0808 33.7293 21.5599 33.9375 20.9974 33.9375Z"
                  fill="#D9AA0F"
                />
                <path
                  d="M21.0001 45.3958C19.6042 45.3958 18.1875 45.0416 16.9375 44.3124L4.56253 37.1666C2.06253 35.7083 0.5 33.0208 0.5 30.1249V15.875C0.5 12.9792 2.06253 10.2917 4.56253 8.83332L16.9375 1.6875C19.4375 0.229167 22.5417 0.229167 25.0626 1.6875L37.4376 8.83332C39.9376 10.2917 41.5001 12.9792 41.5001 15.875V30.1249C41.5001 33.0208 39.9376 35.7083 37.4376 37.1666L25.0626 44.3124C23.8126 45.0416 22.3959 45.3958 21.0001 45.3958ZM21.0001 3.72913C20.1459 3.72913 19.2709 3.95831 18.5 4.39581L6.12503 11.5416C4.58336 12.4375 3.625 14.0833 3.625 15.875V30.1249C3.625 31.8958 4.58336 33.5625 6.12503 34.4583L18.5 41.6041C20.0417 42.4999 21.9584 42.4999 23.4792 41.6041L35.8542 34.4583C37.3959 33.5625 38.3543 31.9166 38.3543 30.1249V15.875C38.3543 14.1042 37.3959 12.4375 35.8542 11.5416L23.4792 4.39581C22.7292 3.95831 21.8542 3.72913 21.0001 3.72913Z"
                  fill="#D9AA0F"
                />
              </svg>
              </Box>
              <Text  fontWeight={500} fontSize={24} mt={7}>
              Confirm this activity
              </Text>

              <Text mt={3}>
              Are you sure you want to unstake RGP? This results in loss of your council member role.
              </Text>
            </Flex>
            </Box>
            <Button
              disabled={loading || unstakeData?.isResolving}
              color="white"
              variant={"brand"}
              my={3}
              isFullWidth
              isLoading={loading}
              onClick={looseRGP}
            >
              {unstakeData?.isResolving ? "cannot Unsatake RGP because you joined a dispute" : "Unstake RGP"}
            </Button>

            <Button
                
                  mt={4}
                 isFullWidth
                  variant="outline"
                  borderColor="#DEE5ED"
                  color="#666666"
                  onClick={onClose}
                 
                >
                  Cancel
                </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnstakeRGPModal;
