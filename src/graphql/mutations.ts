import { gql, type DocumentNode } from "@apollo/client";

export const AUTH_USER: DocumentNode = gql`
    mutation AuthUser(
        $email: String!
        $password: String!
    ) {
        authUser(
            authUserInput: {
                email: $email
                password: $password
            }
        ) {
            id
            email
            firstName
            lastName
            token
        }
    }
`

export const REGISTER_USER: DocumentNode = gql`
    mutation RegisterUser(
        $email: String!
        $firstName: String!
        $lastName: String!
        $password: String!
    ) {
        createUser(
            createUserInput: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                password: $password
            }
        ) {
            id
            firstName
            lastName
            email
            token
        }
    }
`