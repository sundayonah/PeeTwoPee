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
`;

export const UPDATEFIRSTPERSONRES = gql`
mutation addFirstPersonResponse ($params: DisputeEditInput) {
    addFirstPersonResponse (params: $params) {
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





export const UPDATESECAPERSONRES = gql`
mutation addSecondPersonResponse ($params: DisputeEditInput) {
    addSecondPersonResponse (params: $params) {
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


