import { gql } from "@apollo/client";

export const STARTTRANSACTION = gql`
  mutation startTransaction($transaction: CreateTransactionInput) {
    startTransaction(transaction: $transaction) {
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

export const PAYMENTCOMPLETE = gql`
  mutation paymentComplete($transaction: ConfirmTransactionInput) {
    paymentComplete(transaction: $transaction) {
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

export const UPDATE_TRANSACTION_PRODUCT_ID = gql`
  mutation updateTransactionProductId(
    $transaction_id: String
    $productId: Int
    $chainId: Int
  ) {
    updateTransactionProductId(
      transaction_id: $transaction_id
      productId: $productId
      chainId: $chainId
    ) {
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

export const BUYER_PAID_UPDATE = gql`
  mutation updateTransactionBuyerPaid(
    $transaction_id: String
    $productId: Int
    $chainId: Int
    $isDemo: Boolean
  ) {
    updateTransactionBuyerPaid(
      transaction_id: $transaction_id
      productId: $productId
      chainId: $chainId
      isDemo: $isDemo
    ) {
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

export const ADD_FEEDBACK = gql`
  mutation addFeedback($params: FeedBackInput) {
    addFeedback(params: $params) {
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

export const CANCELTRANSACTION = gql`
  mutation cancleTransaction($transaction_id: String, $chainId: Int) {
    cancleTransaction(transaction_id: $transaction_id, chainId: $chainId) {
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

export const PROCESS_TRADE_REQUEST = gql`
  mutation processTradeRequest(
    $transaction_id: String
    $requestType: String
    $chainId: Int
  ) {
    processTradeRequest(
      transaction_id: $transaction_id
      requestType: $requestType
      chainId: $chainId
    ) {
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
