import { useMutation } from "@apollo/client";
import {
  Button,
  Divider,
  Box,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { setOpenModal, TrxState } from "../../../../../state/application";
import { useAppDispatch } from "../../../../../state/hooks";
import {
  CONTRACT_ADDRESSES,
  RigelDecentralizedP2PSystemContract,
} from "../../../../../utils";
import { useActiveWeb3React } from "../../../../../utils/hooks"; 
import { useCouncilDispute } from "../../../../../utils/hooks/useCouncilDispute"; 
import { VOTEDISPUTE } from "../../gql/mutation";

type DisputeParties = {
  name: string;
  address: string;
};

type VotePropes = {
  prodID: number;
  disputeParties: DisputeParties[];
  disputeID: number;
  handleRefetch: () => void;
  disputeStatus: string;
  isDisabled: boolean;
  loadingState: boolean;
  voterEarning: number;
  buyerAddress: string;
  sellerAddress: string;
};

const VoteDisputeModal = ({
  prodID,
  isDisabled,
  handleRefetch,
  disputeID,
  disputeParties,
  loadingState,
  disputeStatus,
  voterEarning,
  buyerAddress,
  sellerAddress,
}: VotePropes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mode = useColorModeValue("light", "dark");
  const [value, setValue] = React.useState("");
  const [loading, setloaing] = useState(false);
  const { account, library, chainId } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const [shouldRecheck, setShouldrefetch] = useState(false);
  const { iVoted } = useCouncilDispute(prodID, shouldRecheck, account);

  async function voteDispute() {
   
    if (account && prodID) {
      try {
        setloaing(true);
        dispatch(
          setOpenModal({
            message: t('wallet_req'),
            trxState: TrxState.WaitingForConfirmation,
          })
        );
        const p2pInstance = await RigelDecentralizedP2PSystemContract(
          CONTRACT_ADDRESSES[chainId]["P2P"],
          library
        );
        const toAddress = value;

        const trxn = await p2pInstance.castVote(prodID, toAddress);
        const { confirmations } = await trxn.wait(1);

        if (confirmations >= 1) {
          await voteAnAppeal();
          dispatch(
            setOpenModal({
              message: `Successfully Joined Dispute`,
              trxState: TrxState.TransactionSuccessful,
            })
          );
          handleRefetch();
          onClose();
          setShouldrefetch(true);
          setloaing(false);
        } else {
          setloaing(false);
          handleRefetch();
          dispatch(
            setOpenModal({
              message: ``,
              trxState: TrxState.TransactionFailed,
            })
          );
          onClose();
        }
      } catch (error) {
        handleRefetch();
        setloaing(false);
        onClose();
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionFailed,
          })
        );
      }
    }
  }

  const [voteAnAppeal, { loading: loadRes, error, data }] = useMutation(
    VOTEDISPUTE,
    {
      variables: {
        params: {
          productId: prodID,
          address: value,
          chainId: chainId,
          voterEarning: Number(voterEarning) ,
        },
      },
    }
  );

  return (
    <>
      <Button
        disabled={isDisabled || iVoted || disputeStatus !== "VOTING"}
        onClick={onOpen}
        size={"lg"}
        variant="brand"
        isLoading={loadingState}
      >
        {iVoted ? "Already Voted" : " Vote now "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <Flex flexDirection="column" mx={5}>
            <Text fontWeight={500} fontSize={16} my={2}>
              Vote on Dispute #{disputeID}
            </Text>
            <Flex my={2}>
              <ModalCloseButton
                border={
                  mode === "dark" ? "1px solid #FFF" : "1px solid #666666"
                }
              />
            </Flex>
            <Divider />
          </Flex>
          <Box mx={5} mb={5}>
            <RadioGroup my={2} onChange={setValue} value={value}>
              <Stack direction="column">
                {disputeParties &&
                  disputeParties.map((party, index) => (
                    <Radio key={index} my={2} size="lg" value={party.address}>
                      {party.name}
                    </Radio>
                  ))}
              </Stack>
            </RadioGroup>

            <Button
              disabled={!value}
              isLoading={loadRes || loading}
              onClick={voteDispute}
              color="white"
              backgroundColor={"#4A739B"}
              my={3}
              isFullWidth
            >
              Vote
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VoteDisputeModal;
