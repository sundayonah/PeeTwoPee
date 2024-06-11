import { gql } from "@apollo/client";

export const GETCOUNCILVOTES = gql`
query CouncilVotes ($params: fetchCouncilVotesInput) {
    CouncilVotes (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on castVoteCouncilresponse {
            status
            info
        }
        ... on FetchCouncilVotesResponse {
            status
            total
            councilVotes {
                buyer
                disputeId
                account
                chainId
                seller
                councilVote
                voterEarning
                finalWinner
                createdAt
            }
        }
    }
}
`