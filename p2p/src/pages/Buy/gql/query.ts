import { gql } from "@apollo/client";

export const FETCHORDERBYID = gql`
  query fetchOrderById($id: String) {
    fetchOrderById(id: $id) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on OrderSuccessResponse {
        status
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
            banks {
              id
              bank_name
              account_number
              account_name
              is_enabled
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
          }
          createdAt
          updatedAt
        }
      }
      ... on OrderPriceSuccessResponse {
        status
        price
      }
      ... on FetchOrderSuccessResponse {
        status
        orders {
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
            banks {
              id
              bank_name
              account_number
              account_name
              is_enabled
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
          }
          createdAt
          updatedAt
        }
        total
      }
      ... on PriceResponse {
        status
        price
      }
    }
  }
`;

export const USERBYID = gql`
  query userById($user_id: String) {
    userById(user_id: $user_id) {
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
          userRankInfo {
            binanceTest {
              rank
              rankAmount
            }
            binance {
              rank
              rankAmount
            }
            polygon {
              rank
              rankAmount
            }
            polygonTest {
              rank
              rankAmount
            }
          }
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
          userRankInfo {
            binanceTest {
              rank
              rankAmount
            }
            binance {
              rank
              rankAmount
            }
            polygon {
              rank
              rankAmount
            }
            polygonTest {
              rank
              rankAmount
            }
          }
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

export const FETCHTRANSACTIONBYID = gql`
  query fetchTransactionById($id: String) {
    fetchTransactionById(id: $id) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on StartTransactionSuccessResponse {
        status
        transaction {
          _id
          order {
            _id
            type
            asset
            fiat
            price_type
            price
            price_percent
            token_address
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
            createdAt
            updatedAt
          }
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
        info
      }
      ... on FetchTransactionSuccessResponse {
        status
        transactions {
          _id
          order {
            _id
            type
            asset
            fiat
            price_type
            price
            price_percent
            token_address
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
            createdAt
            updatedAt
          }
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
        total
      }
    }
  }
`;
