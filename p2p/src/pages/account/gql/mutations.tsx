import { gql } from "@apollo/client";

export const CREATE_ADS = gql`
  mutation createAds($params: OrderInput) {
    createAds(params: $params) {
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

export const UPDATE_CONTANTS = gql`
  mutation updateContacts($params: ProfileContact) {
    updateContacts(params: $params) {
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
        }
      }
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($params: ProfileContact) {
    verifyEmail(params: $params) {
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
        }
      }
    }
  }
`;

export const EDIT_ADS = gql`
  mutation editAds($params: OrderInput) {
    editAds(params: $params) {
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

export const DELETE_ADS = gql`
  mutation deleteAds($id: String) {
    deleteAds(id: $id) {
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

export const CHANGE_ADS_STATUS = gql`
  mutation changeAdsStatus($id: String, $status: Boolean) {
    changeAdsStatus(id: $id, status: $status) {
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

export const ADD_BANK = gql`
  mutation addBank($params: BankInput) {
    addBank(params: $params) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on BankSuccessResponse {
        status
      }
    }
  }
`;

export const DELETE_BANK = gql`
  mutation deleteBank($id: String) {
    deleteBank(id: $id) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on BankSuccessResponse {
        status
        bank {
          id
          bank_name
          account_number
          account_name
        }
      }
    }
  }
`;

export const EDIT_BANK = gql`
  mutation editBankRecord($params: BankInput) {
    editBankRecord(params: $params) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on BankSuccessResponse {
        status
      }
    }
  }
`;

export const UPDATE_RANK = gql`
  mutation updateRank($chain: String) {
    updateRank(chain: $chain) {
      ... on VerifyRecordSuccess {
        status
        message
      }
      ... on RegisterSuccessResponse {
        status
        token
      }
      ... on RegisterFailResponse {
        status
        field
        message
      }
    }
  }
`;
