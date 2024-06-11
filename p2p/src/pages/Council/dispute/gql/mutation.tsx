import { gql } from "@apollo/client";


export const CREATE_DISPUTE = gql`
mutation createDispute ($params: DisputeInput) {
    createDispute (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
        }
    }
}
`;

export const ADDAPEALTODISPUTE = gql`
mutation addAppealToDispute ($params: DisputeInput) {
    addAppealToDispute (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
        }
    }
}
`

export const JOINDISPUTE = gql`
mutation joinDispute ($params: JoinDisputeInput) {
    joinDispute (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
        }
    }
}
`

export const UPDATEDISPUTESTATUS = gql`
mutation updateDisputeStatus ($params: DisputeInput) {
    updateDisputeStatus (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
        }
    }
}
                 
`

export const VOTEDISPUTE = gql`
mutation voteDispute ($params: voteDisputeInput) {
    voteDispute (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
        }
    }
}
`

export const UPDATEDISPUTEVOTINGTIME = gql`
mutation updateDisputeVoteTime ($params: DisputeInput) {
    updateDisputeVoteTime (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
        }
    }
}
`
export const PUSHOUTNONEVOTEDCOUNCILMEMBER = gql`
mutation pushOutUnvotedCouncilMembers ($params: PushCuncilMemberInput) {
    pushOutUnvotedCouncilMembers (params: $params) {
        ... on GeneralErrorResponse {
            status
            message
        }
        ... on CreateDisputeSuccessResponse {
            status
            info
        }
        ... on FetchDisputeSuccessResponse {
            status
        }
    }
}
`
