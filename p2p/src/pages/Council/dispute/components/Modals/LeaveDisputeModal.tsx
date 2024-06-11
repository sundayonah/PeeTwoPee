import { useMutation } from "@apollo/client";
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
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import React , {useState} from "react";
import {   useNavigate } from "react-router-dom";
import { setOpenModal, TrxState } from "../../../../../state/application";
import { useAppDispatch } from "../../../../../state/hooks";
import { useActiveWeb3React } from "../../../../../utils/hooks";
import { VOTEDISPUTE } from "../../gql/mutation";

type DisputeParties = {
  name: string,
  address: string
}

type VotePropes = {
  prodID: number,
  disputeParties : DisputeParties[],
  disputeID: number,
  handleRefetch: ()=> void
}

const LeaveDisputeModal = ({prodID, handleRefetch, disputeID, disputeParties}:VotePropes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mode = useColorModeValue("light", "dark");
  const buttonBgColor = useColorModeValue("white", "#213345");
  const textColor = useColorModeValue("#319EF6", "#4CAFFF");
  const [value, setValue] = React.useState("");
  const [loading, setloaing] = useState(false)
  const {account, library, chainId} = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  async function leaveDispute() {
    if (account && prodID) {
      try {
        setloaing(true);
        /*   dispatch(
          setOpenModal({
            message: t('wallet_req'),
            trxState: TrxState.WaitingForConfirmation,
          })
        );
        const p2pInstance = await RigelDecentralizedP2PSystemContract(
          CONTRACT_ADDRESSES[chainId]["P2P"],
          library
        );
       
        const trxn = await p2pInstance.castVote(productId, value,
          { gasLimit: 450000 }
          )
       
        if (trxn.confirmations >= 1) {
         */

        //await voteAnAppeal();
        // dispatch(
        //   setOpenModal({
        //    message: `Successfully Joined Dispute`,
        //     trxState: TrxState.TransactionSuccessful,
        //    })
        //   );
        navigate("/council/dispute")
        onClose()
        setloaing(false);
        //  }
        //    else{
        //     setloaing(false)
        //     dispatch(
        //    setOpenModal({
        //      message: ``,
        //       trxState: TrxState.TransactionFailed,
        //     })
        //    );
        //   }
      } catch (error) {
        setloaing(false);
        onClose()
        dispatch(
          setOpenModal({
            message: ``,
            trxState: TrxState.TransactionFailed,
          })
        );
      }
    }
  }

  const [voteAnAppeal, { loading: loadRes ,error , data }] = useMutation( VOTEDISPUTE, {
    variables: {
        params: {
          productId: prodID,
          address: value,
        }
      },
  });
   



  return (
    <>
      <Button onClick={onOpen} size={"lg"} variant={"outline"}>
        Leave Dispute
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
                Leave  Dispute #{disputeID}
              </Text>
            </Flex>
            <Flex my={5} justifyContent="center" alignContent="center">
              <Text align={"center"} fontSize={16} fontWeight={400}>
                You are about to leave this dispute without voting, this means
                that you will not earn a fee on this dispute. Are you sure you
                would like to leave?
              </Text>
            </Flex>

            <Button
              isLoading={loadRes || loading}
              onClick={leaveDispute}
              color="white"
              variant={"brand"}
              my={3}
              isFullWidth
            >
              Leave Dispute
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
    </>
  );
};

export default LeaveDisputeModal;
