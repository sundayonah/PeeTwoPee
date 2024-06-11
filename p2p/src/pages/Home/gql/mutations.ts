import { gql } from "@apollo/client";

export const VERIFY_USER_RECORD = gql`
  mutation verifyUserRecord($params: VerifyUserInput) {
    verifyUserRecord(params: $params) {
      ... on VerifyRecordSuccess {
        status
        message
      }
      ... on RegisterSuccessResponse {
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

export const REGISTER_USER = gql`
  mutation register($input: RegisterInput) {
    register(input: $input) {
      ... on VerifyRecordSuccess {
        status
        message
      }
      ... on RegisterSuccessResponse {
        status
        user {
          _id
        }
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

export const LOGIN = gql`
  mutation login($input: String) {
    login(input: $input) {
      ... on VerifyRecordSuccess {
        status
        message
      }
      ... on RegisterSuccessResponse {
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

export const FETCH_USER_BY_ADDRESS = gql`
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
