import { gql } from "@apollo/client";

export const FETCHDISPUTES = gql`
query fetchDisputes ($params: fetchDisputeInput) {
    fetchDisputes (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
            disputs  {
                
          _id
          dispute_id
          pushedOutCouncilMembers
          disputeStatus
          productId
          disputeInitiator
          disputeAppeal {
            apealreason
            appealDescription
            appealProofs {
              uri
              name
              extension
            }
          }
          secondPartyAppeal {
            apealreason
            appealDescription
            appealProofs {
              uri
              name
              extension
            }
          }
          secondPartyAddress
          firstPartyVotes
          secondPartyVotes
          chainId
          createdAt
          secondPartyResponses {
            responseMessage,
            responseProof {
                uri,
                name,
                extension
            }
        },
        firstPartyResponses  {
            responseMessage,
            responseProof {
                uri,
                name,
                extension
            }
        }
          transactionId {
            _id
            tx_id
            order_type
            token_address
            productId
            chainId
            asset
            fiat
            price
            crypto_amount
            from
            to
            disputeCreator
            status
          }
          updatedAt
          JoinedMembers
          lastCouncilJoinTime
          votedMembers
          voteCommenceTime
        }
            }
        
    }
}`