import { useQuery } from '@apollo/client'
import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useActiveWeb3React } from '../../../../utils/hooks'
 
import { FETCHDISPUTES } from '../gql/queries'
import DisputeCard  from './DisputeCard'

const JoinedDispute = () => {

  const {account, chainId} = useActiveWeb3React()
  const { data , error, refetch, loading} = useQuery(FETCHDISPUTES, {
    variables: {
      "params": {
        "chainId": chainId
       }
    },
  });
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleRefetch()
  }, [])
  

  function handleRefetch(){
    refetch()
   }

  return (
    <Flex mb={isMobileDevice ? 30 : 2} flexWrap={'wrap'} w="100%" justifyContent="flex-start">

{ data && data?.fetchDisputes?.disputs?.length >=1 ? data?.fetchDisputes?.disputs?.filter((_dispute)=> _dispute?.JoinedMembers?.includes(account) ).map((disputes: any) => (
      <DisputeCard 
      key={disputes.dispute_id}
      disputeId={disputes.dispute_id} 
      asset={disputes?.transactionId?.asset}
      fiat={disputes?.transactionId?.fiat}
      raisedBy={disputes?.disputeInitiator }
      counterparty={disputes?.secondPartyAddress}
      joined={disputes?.JoinedMembers.length}
      time={disputes?.createdAt}
      price={disputes?.transactionId?.price}
      cryptoAmount={disputes?.transactionId?.crypto_amount}
      seller={disputes?.transactionId?.from}
      buyer={disputes?.transactionId?.to}
      disputeType={'joined'}
      productId={disputes?.productId}
      refetch={handleRefetch}
      isLoading={loading}
     
      />
    )) : <Text>No Disputes</Text>}


  </Flex>
  )
}

export default JoinedDispute