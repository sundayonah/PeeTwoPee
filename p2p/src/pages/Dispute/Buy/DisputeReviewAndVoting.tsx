import { useQuery } from "@apollo/client"; 
import {
  Box,
   
  Flex,
  
  Spacer,  
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react"; 
import { useActiveWeb3React } from "../../../utils/hooks"; 
import { DISPUTEBYPID } from "../gql/queries";
import SecondUserAppealBox from "./components/SecondUserAppealBox";
import UserAppealBox from "./components/UserAppealBox";

export default function DisputeReviewAndVoting({
  productId,
}: {
  productId: number;
}) { 
  const [prodId, setprodId] = useState<number>(productId);
  const { chainId , account} = useActiveWeb3React();
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  const {
    data: disputeData,
    error: disputeError,
    loading: disputeLoading,
    stopPolling,
    startPolling,
    refetch,
  } = useQuery(DISPUTEBYPID, {
    variables: {
      params: {
        productId: productId,
        chainId: chainId,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    //setprodId(productId)
    if (productId != 0 && !null) {
      startPolling(3000);
    }
  });

  return (
    <>
      <Flex
        alignContent={"space-between"}
        flexDirection={isMobileDevice ? "column" : "row"}
      >
        <UserAppealBox
        responses={disputeData?.disputeByProductId?.dispute?.firstPartyResponses}
        dispueteId={disputeData?.disputeByProductId?.dispute?.dispute_id}
          enableEditAppeal={account == disputeData?.disputeByProductId?.dispute?.disputeInitiator }
          isWinner={disputeData?.disputeByProductId?.dispute?.firstPartyVotes > disputeData?.disputeByProductId?.dispute?.secondPartyVotes}
          disputeStatus={disputeData?.disputeByProductId?.dispute?.disputeStatus}
          refresh={refetch}
          initiatorAddress={disputeData?.disputeByProductId?.dispute?.disputeInitiator}
          userVote={disputeData?.disputeByProductId?.dispute?.firstPartyVotes}
          appealReason={disputeData?.disputeByProductId?.dispute?.disputeAppeal?.apealreason}
          appealDesc={disputeData?.disputeByProductId?.dispute?.disputeAppeal
              ?.appealDescription
          }
          appealProofs={
            disputeData?.disputeByProductId?.dispute?.disputeAppeal
              ?.appealProofs
          }
         tradeType={disputeData?.disputeByProductId?.dispute?.transactionId?.to == disputeData?.disputeByProductId?.dispute?.disputeInitiator ? "Buyer" : "Seller"}
        />

        <Box m={10}>
          <Spacer />
        </Box>

        {disputeData?.disputeByProductId?.dispute?.secondPartyAddress && (
          <SecondUserAppealBox
          responses={disputeData?.disputeByProductId?.dispute?.secondPartyResponses}
          dispueteId={disputeData?.disputeByProductId?.dispute?.dispute_id}
          enableEditAppeal={account == disputeData?.disputeByProductId?.dispute?.secondPartyAddress}
            isWinner={
              disputeData?.disputeByProductId?.dispute?.secondPartyVotes >
              disputeData?.disputeByProductId?.dispute?.firstPartyVotes
            }
            disputeStatus={
              disputeData?.disputeByProductId?.dispute?.disputeStatus
            }
            initiatorAddress={
              disputeData?.disputeByProductId?.dispute?.secondPartyAddress
            }
            userVote={
              disputeData?.disputeByProductId?.dispute?.secondPartyVotes
            }
            appealReason={
              disputeData?.disputeByProductId?.dispute?.secondPartyAppeal
                ?.apealreason
            }
            appealDesc={
              disputeData?.disputeByProductId?.dispute?.secondPartyAppeal
                ?.appealDescription
            }
            appealProofs={
              disputeData?.disputeByProductId?.dispute?.secondPartyAppeal
                ?.appealProofs
            }
            tradeType={disputeData?.disputeByProductId?.dispute?.transactionId?.to == disputeData?.disputeByProductId?.dispute?.secondPartyAddress ? "Buyer " : "Seller"}
          />
        )}
      </Flex>
    </>
  );
}
