import { gql } from "@apollo/client";

export const UPDATEVOTESTATUS = gql `
mutation councilUpdateVoteResult ($params: updateVotesResultInput) {
    councilUpdateVoteResult (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on castVoteCouncilresponse {
            status
            councilVote {
                buyer
                disputeId
                account
                chainId
                seller
                councilVote
                voterEarning
                performance
                finalWinner
                createdAt
            }
            info
        }
        ... on FetchCouncilVotesResponse {
            status
            councilVotes {
                buyer
                disputeId
                account
                chainId
                seller
                councilVote
                voterEarning
                performance
                finalWinner
                createdAt
            }
            total
        }
    }
}
`

export const COUNCILCASTVOTE = gql`

mutation councilCastVote ($params: CouncilVotesInput) {
    councilCastVote (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on castVoteCouncilresponse {
            status
            councilVote {
                buyer
                disputeId
                account
                chainId
                seller
                councilVote
                voterEarning
                performance
                finalWinner
                createdAt
            }
            info
        }
        ... on FetchCouncilVotesResponse {
            status
            councilVotes {
                buyer
                disputeId
                account
                chainId
                seller
                councilVote
                voterEarning
                performance
                finalWinner
                createdAt
            }
            total
        }
    }
}
`