import { gql } from "@apollo/client";

export const FETCH_REFERRALS = gql`
query fetchUserReferrals {
    fetchUserReferrals {
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
                createdAt
                updatedAt
            }
        }
    }
}
`;


