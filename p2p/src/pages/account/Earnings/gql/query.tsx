import { gql } from "@apollo/client";

export const FETCH_TRADE_REWARD = gql`
  query fetchTradeReward($filter: FetchTradeReward) {
    fetchTradeReward(filter: $filter) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on StartTransactionSuccessResponse {
        status
        transaction {
          _id
          type
          order {
            _id
            type
            asset
            fiat
            price_type
            price
            price_percent
            token_address
            token_decimal
            token_logo
            payment_method
            crypto_amount
            sold
            limit_min
            limit_max
            duration
            terms
            chainId
            status
            auto_reply
            user {
              _id
              address
              fullname
              username
              email
              phone
              country_code
              country
              referral
              type
              completed_orders
              order_completion_rate
              ref_earnings
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          tx_id
          order_type
          token_address
          token_decimal
          token_logo
          contract_address
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
        info
      }
      ... on FetchTransactionSuccessResponse {
        status
        transactions {
          _id
          type
          order {
            _id
            type
            asset
            fiat
            price_type
            price
            price_percent
            token_address
            token_decimal
            token_logo
            payment_method
            crypto_amount
            sold
            limit_min
            limit_max
            duration
            terms
            chainId
            status
            auto_reply
            user {
              _id
              address
              fullname
              username
              email
              phone
              country_code
              country
              referral
              type
              completed_orders
              order_completion_rate
              ref_earnings
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          tx_id
          order_type
          token_address
          token_decimal
          token_logo
          contract_address
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
        total
      }
      ... on TradeEarningResponse {
        tradeStatus
        tradeInfo {
          address
          username
          rank
          trading_volume
          amount_earned
        }
        status
      }
    }
  }
`;
