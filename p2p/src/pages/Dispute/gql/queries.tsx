import { gql } from "@apollo/client";

export const DISPUTEBYPID = gql` query disputeByProductId($params: fetchDisputeProdIdInput) {
  disputeByProductId(params: $params) {
    ... on GeneralErrorResponse {
      status
      message
    }
    ... on CreateDisputeSuccessResponse {
      status
      info
      dispute {
        _id
        dispute_id
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
          feedback {
            to
            from
            to_comment
            from_comment
          }
          terms
          auto_reply
          buyer_paid
          status
          whoCancelled {
            to
            from
          }
          tStartTime
          tradeRequestSent
          tradeRequestAccepted
          createdAt
          updatedAt
        }
        updatedAt
        JoinedMembers
        votedMembers,
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

      }
    }
    ... on FetchDisputeSuccessResponse {
      status
    }
  }
}
`;
