import { useQuery } from '@apollo/client'
import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { useActiveWeb3React } from '../../../../utils/hooks'
import { FETCHDISPUTES } from '../gql/queries'
import DisputeCard from './DisputeCard'

const OngoingDispute = () => {
  const {account, chainId} = useActiveWeb3React()

  const { data , refetch, loading} = useQuery(FETCHDISPUTES, {
    variables: {
      "params": {
        "chainId": chainId
      }
    },
  });

  function handleRefetch(){
        refetch()
  }

  //pushedOutCouncilMembers

  
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  let wantedData = data?.fetchDisputes?.disputs?.filter(
    (_dispute) => _dispute?.disputeStatus == "VOTING" || _dispute?.disputeStatus == "ONGOING" || _dispute?.disputeStatus == "WAITTIME"
  )

  return (
    <Flex mb={isMobileDevice ? 30 : 2} flexWrap={"wrap"} w="100%" justifyContent="flex-start">
      {data &&
      wantedData.filter(
        (_dispute) => !_dispute?.JoinedMembers?.includes(account)
      ).length >= 1 ? (
        wantedData
          ?.map((disputes: any) => (
            <DisputeCard
              key={disputes.dispute_id}
              disputeType={"ongoing"}
              disputeId={disputes.dispute_id}
              asset={disputes?.transactionId?.asset}
              fiat={disputes?.transactionId?.fiat}
              raisedBy={disputes?.disputeInitiator}
              counterparty={disputes?.secondPartyAddress}
              joined={disputes?.JoinedMembers.length}
              time={disputes?.createdAt}
              price={disputes?.transactionId?.price}
              cryptoAmount={disputes?.transactionId?.crypto_amount}
              seller={disputes?.transactionId?.from}
              buyer={disputes?.transactionId?.to}
              productId={disputes?.productId}
              refetch={handleRefetch}
              isLoading={loading}
              pushedOutCouncilMembers={disputes?.pushedOutCouncilMembers}
              joinedCouncilMembers={disputes?.JoinedMembers}
            />
          ))
      ) : (
        <Text>No Disputes</Text>
      )}
    </Flex>
  );
}

export default OngoingDispute