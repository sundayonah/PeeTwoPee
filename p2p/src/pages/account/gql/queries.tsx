import { gql } from "@apollo/client";

export const GET_BEST_ORDER_PRICE = gql`
  query getBestOrderPrice($param: OrderGetPriceInput) {
    getBestOrderPrice(param: $param) {
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

export const FETCH_ORDER_RECORDS = gql`
  query fetchOrderRecords($params: FetchOrderInput) {
    fetchOrderRecords(params: $params) {
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
          }
          createdAt
          updatedAt
        }
        total
        suggestions {
          asset
          image
        }
      }
      ... on PriceResponse {
        status
        price
      }
    }
  }
`;
export const FETCH_ORDER_PER_USER = gql`
  query fetchOrderPerUser($params: FetchUserOrderInput) {
    fetchOrderPerUser(params: $params) {
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

export const USER_BANKS = gql`
  query userInfo {
    userInfo {
      fullname
      username
      email
      phone

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
        is_enabled
      }
    }
  }
`;

export const USER_COUNTRY = gql`
  query userInfo {
    userInfo {
      country
    }
  }
`;

export const USER_PROFILE_TRADE = gql`
  query userTrade($chainId: Int) {
    userTrade(chainId: $chainId) {
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
        }
      }
    }
  }
`;

export const FETCH_TRANSACTION_RECORDS = gql`
  query fetchTransactionRecords($filter: FetchTransactionFilter) {
    fetchTransactionRecords(filter: $filter) {
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
          isDemo
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

export const GET_TOKEN_PRICE = gql`
  query getTokenPrice($param: PriceInput) {
    getTokenPrice(param: $param) {
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
