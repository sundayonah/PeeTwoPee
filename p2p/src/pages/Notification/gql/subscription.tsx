import { gql } from "@apollo/client";

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription notification {
    notification {
      status
      notification {
        _id
        transaction {
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
        title
        chainId
        type
        receivers
        message
        readers
        createdAt
        updatedAt
      }
    }
  }
`;
