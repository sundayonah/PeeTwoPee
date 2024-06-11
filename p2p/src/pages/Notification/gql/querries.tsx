import { gql } from "@apollo/client";

export const FETCHNOTIFICATIONS = gql`
query fetchNotifications ($chainId: Int, $recordPerPage: Int, $page: Int) {
    fetchNotifications (chainId: $chainId, recordPerPage: $recordPerPage, page: $page) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on NotificationResponseSub {
            status
        }
        ... on NotificationResponseSubArray {
            status
            notifications {
          _id
          transaction {
            _id
            tx_id
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
            }
            terms
            auto_reply
            buyer_paid
            status
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
}
`;

export const USER_INFO = gql`
  query userInfo {
    userInfo {
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
`;
