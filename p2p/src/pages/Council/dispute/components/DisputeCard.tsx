import React, {  useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import {  useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useFetchUserName } from "../../../../utils/hooks/useFetchUserName";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { GCouncilJoinedADispute, GFailedEvent } from "../../../../utils/GAnalytics/gTrade";
import {
  CONTRACT_ADDRESSES,
  RigelDecentralizedP2PSystemContract,
} from "../../../../utils";
import { useAppDispatch } from "../../../../state/hooks";
import { setOpenModal, TrxState } from "../../../../state/application";
import { JOINDISPUTE, UPDATEDISPUTESTATUS } from "../gql/mutation";
import useGetDisputeRaised from "../../../../utils/hooks/useGetDisputeRaised";
import { useViewStateMgt } from "../../../../utils/hooks/useCouncilDispute";
import { convertToTime } from "../../../../utils/functions/util";

export type DisputeProps = {
  fiat?: string;
  disputeId?: number;
  raisedBy?: string;
  counterparty?: string;
  joined: number;
  time?: string;
  price: number;
  cryptoAmount: number;
  asset: string;
  seller: string;
  buyer: string;
  productId: number;
  disputeType: "joined" | "ended" | "ongoing";
  refetch: () => void;
  isLoading: boolean;
  pushedOutCouncilMembers? : [string]
  joinedCouncilMembers? : [string]
};



const DisputeCard = ({
  raisedBy,
  disputeId,
  joined,
  time,
  counterparty,
  fiat,
  cryptoAmount,
  price,
  asset,
  seller,
  buyer,
  disputeType,
  productId,
  refetch,
  isLoading,
  pushedOutCouncilMembers,
  joinedCouncilMembers

}: DisputeProps) => {
  const { userName: raiseName } = useFetchUserName(raisedBy);
  const { userName: conuterPartyName } = useFetchUserName(counterparty);
  const [loading, setloaing] = useState(false);
  const { account, library, chainId } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mode = useColorModeValue("light", "dark");
  const inactiveColour = useColorModeValue("#666666", "#999999");
  const disputeObj = useGetDisputeRaised(productId)
  const {stateMgt} = useViewStateMgt()



  const [
    joinDisputeReq,
    { loading: loadAdd, error, data: dataAdd },
  ] = useMutation(JOINDISPUTE, {
    variables: {
      params: {
        productId: productId,
        address: account,
        chainId: chainId
      },
    },
  });

 function isSellerOrBuyer(address: string) {
   if (address === buyer) {
     return "Buyer";
   } else if (address === seller) {
     return "Seller";
   }
 }
  

  async function joinDispute() {
    if (account && productId) {
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

        const trxn = await p2pInstance.joinDispute(productId);
        const { confirmations } = await trxn.wait(1);

        if (confirmations >= 1) {
          await joinDisputeReq();
          dispatch(
            setOpenModal({
              message: `Successfully Joined Dispute`,
              trxState: TrxState.TransactionSuccessful,
            })
          );
        
          onClose()
          GCouncilJoinedADispute("A new council member joined a dispute",disputeId,fiat,asset,chainId)
          navigate(`/council/dispute/${disputeId}`);
          setloaing(false);
        } else {
          setloaing(false);
          dispatch(
            setOpenModal({
              message: ``,
              trxState: TrxState.TransactionFailed,
            })
          );
          GFailedEvent("councilJoinDIspute","A new council member Failed to join a dispute",disputeId,chainId)
        }
      } catch (error) {
        setloaing(false);
        onClose()
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionFailed,
          })
        );
        GFailedEvent("councilJoinDIspute","A new council member Failed to join a dispute",disputeId,chainId)
      }
    }
  }

  const [
    updateDIsputeStatus,
    { loading: updatingStatus, error : updateStatusEr, data },
  ] = useMutation(UPDATEDISPUTESTATUS);
const date = `${new Date(disputeObj?.time * 1000).toLocaleDateString()}-${convertToTime(disputeObj?.time)}`

  

  return (
    <Box
      w={{ base: "100%", md: "60%", lg: "40%", xl: "31%" }}
      // minH="200px"
      rounded="md"
      border="0.1px solid"
      borderColor="gray.200"
      m={["10px auto", "10px", "20px 11px"]}
      p={["20px 15px"]}
    >
      <Flex justifyContent={"center"} alignItems="center">
        <Box rounded={6} p={2} my={2} backgroundColor={"#F2F5F8"}>
          <Text p={1} fontWeight={400} color={"#666666"}>
            #{disputeId}
          </Text>
        </Box>
      </Flex>

      <Flex my={2} justifyContent={"center"} alignItems="center">
        <Text p={1}>Dispute for:</Text>
      </Flex>

      <Flex
        my={2}
        mb={4}
        justifyContent={"center"}
        alignItems="center"
        flexDirection={"row"}
      >
        <Text color={"#319EF6"} fontSize="16px">
          {cryptoAmount} {asset}
        </Text>
        <Text pl={2} color={inactiveColour}>
          ( {fiat} {price * cryptoAmount})
        </Text>
      </Flex>

      <Flex justifyContent="space-between" alignItems={"center"} mb={"10px"}>
        <Flex alignItems={"center"}>
          <Text my={1} fontSize="14px">
            Raised by time :
          </Text>
        </Flex>
        <Flex
          my={2}
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"row"}
        >
          <Text as="p" color={"#319EF6"} fontSize="14px">
            {raiseName}
          </Text>

          <Text pl={1} color={inactiveColour}>
           { isSellerOrBuyer(raisedBy)}
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems={"center"} mb={"10px"}>
        <Flex alignItems={"center"}>
          <Text my={1} fontSize="14px">
            Counterparty:
          </Text>
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"row"}
        >
          <Text as="p" color={"#319EF6"} fontSize="14px">
            {conuterPartyName}
          </Text>

          <Text pl={1} color={inactiveColour}>
          { isSellerOrBuyer(counterparty)}
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems={"center"} mb={"10px"}>
        <Flex alignItems={"center"}>
          <Text my={1} fontSize="14px">
            Voter earning:
          </Text>
        </Flex>
        <Text as="p" fontSize="14px">
          {disputeObj?.payment}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" alignItems={"center"} mb={"10px"}>
        <Flex alignItems={"center"}>
          <Text my={1} fontSize="14px">
            Joined:
          </Text>
        </Flex>
        <Text as="p" fontSize="14px">
          {joined} out of {stateMgt?.maxNumbersofCouncils}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" alignItems={"center"} mb={"10px"}>
        <Flex alignItems={"center"}>
          <Text my={1} fontSize="14px">
            Time:
          </Text>
        </Flex>
        <Text as="p" fontSize="14px">
           {!disputeObj?.time  ? "--" :date}
        </Text>
      </Flex>
      <Button
        disabled={
          (disputeType == "ongoing" && joined >= stateMgt?.maxNumbersofCouncils) 
          || disputeType == "ended" || account == raisedBy || account == counterparty 
          ||( disputeType == "ongoing" && pushedOutCouncilMembers.includes(account))
          ||( disputeType == "ongoing" && joinedCouncilMembers.includes(account))
        }
        isLoading={loading || isLoading}
        variant={"brand"}
        py={2}
        isFullWidth
        onClick={() => {
          disputeType == "ongoing"
            ? onOpen()
            : navigate(`/council/dispute/${disputeId}`);
        }}
      >
        {disputeType === "ended" || disputeType === "joined"
          ? "Open Dispute"
          : disputeType == "ongoing"
          ? " Join Dispute"
          : "Dispute Ended"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
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
              <Text fontWeight={700} fontSize={20} mt={7}>
                Join Dispute #{disputeId}
              </Text>
            </Flex>
            <Flex my={5} justifyContent="center" alignContent="center">
              <Text align={"center"} fontSize={16} fontWeight={400}>
                You are about to join this dispute, this means that you will go
                through appeals from both parties on this dispute and then vote
                fairly on which party is believed to be truthful according to
                the evidence presented to you in the appeals.
              </Text>
            </Flex>
            <Button
              isLoading={loadAdd || loading}
              onClick={joinDispute}
              color="white"
              variant={"brand"}
              my={3}
              isFullWidth
            >
              Join Dispute
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              isFullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DisputeCard;
