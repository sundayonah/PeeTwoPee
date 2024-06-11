import { gql } from "@apollo/client";

export const FETCHTRANSACTIONBYID = gql`
  query fetchTransactionByUserId($params: FetchTransactionByUser) {
    fetchTransactionByUserId(params: $params) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on StartTransactionSuccessResponse {
        status
        info
      }
      ... on FetchTransactionSuccessResponse {
        status
        total
        transactions {
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
      }
    }
  }
`;

export const USERBYADDRESS = gql`
  query userByAddress($address: String) {
    userByAddress(address: $address) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on UserSuccessResponse {
        status
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

          banks {
            id
            bank_name
            account_number
            account_name
          }
          completed_orders
          order_completion_rate
          ref_earnings
          settings {
            ads
            trade
            system
            phone
            email
          }
          createdAt
          updatedAt
          userRankInfo {
            binance {
              rank
              rankAmount
            }
            polygonTest {
              rank
              rankAmount
            }
            polygon {
              rank
              rankAmount
            }
            binanceTest {
              rank
              rankAmount
            }
          }
        }
      }
      ... on TradeResponse {
        status
        trade {
          tradeLastMonth
          completionLastMonth
          totalTrade
          completionRate
          avgReleaseTime
          payTime
          totalAmountSold
          totalAmountBought
          positiveFeedback
          negativeFeedback
        }
      }
      ... on MultiUserSuccessResponse {
        status
        users {
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

          banks {
            id
            bank_name
            account_number
            account_name
          }
          completed_orders
          order_completion_rate
          ref_earnings
          settings {
            ads
            trade
            system
            phone
            email
          }
          createdAt
          updatedAt
          userRankInfo {
            binance {
              rank
              rankAmount
            }
            polygonTest {
              rank
              rankAmount
            }
            polygon {
              rank
              rankAmount
            }
            binanceTest {
              rank
              rankAmount
            }
          }
        }
      }
    }
  }
`;
