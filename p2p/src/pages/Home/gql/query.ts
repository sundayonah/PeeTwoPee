import { gql } from "@apollo/client";

export const VERIFY_OTP = gql`
  query verifyOTP($params: VerifyOTPInput) {
    verifyOTP(params: $params) {
      ... on GeneralErrorResponse {
        status
        message
      }
      ... on UserSuccessResponse {
        status
        user {
          _id
        }
      }
      ... on TradeResponse {
        status
      }
      ... on MultiUserSuccessResponse {
        status
        users {
          _id
        }
      }
    }
  }
`;
