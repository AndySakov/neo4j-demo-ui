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

export const CREATE_PERSON: DocumentNode = gql`
    mutation CreatePerson(
        $firstName: String!
        $lastName: String!
        $birthYear: Int!
    ){
        createPerson(
            createPersonInput: {
                firstName: $firstName,
                lastName: $lastName
                birthYear: $birthYear 
            }
        ) {
            id
            firstName
            lastName
            birthYear
        }
    }
`

export const UPDATE_PERSON: DocumentNode = gql`
    mutation UpdatePerson(
        $id: String!
        $firstName: String
        $lastName: String
        $birthYear: Int
    ){
        updatePerson(
            updatePersonInput: {
                id: $id
                firstName: $firstName,
                lastName: $lastName
                birthYear: $birthYear 
            }
        ) {
            id
            firstName
            lastName
            birthYear
        }
    }
`

export const DELETE_PERSON: DocumentNode = gql`
    mutation DeletePerson(
        $id: String!
    ){
        removePerson(
            id: $id
        ) {
            success
            message
        }
    }
`

export const ADD_PERSON_TO_MOVIE_CAST: DocumentNode = gql`
    mutation AddPersonToMovieCast(
        $mid: String!
        $pid: String!
    ){
        addMovieStarredIn(
            addMovieStarredInInput: {
                mid: $mid
                pid: $pid
            }
        ) {
            id
        }
    }
`

export const ADD_PERSON_AS_MOVIE_DIRECTOR: DocumentNode = gql`
    mutation AddPersonAsMovieDirector(
        $mid: String!
        $pid: String!
    ){
        addMovieDirected(
            addMovieDirectedInput: {
                mid: $mid
                pid: $pid
            }
        ) {
            id
        }
    }
`

export const CREATE_MOVIE: DocumentNode = gql`
    mutation CreateMovie(
        $title: String!
        $tagline: String!
        $released: Int!
    ){
        createMovie(
            createMovieInput: {
                title: $title,
                tagline: $tagline
                released: $released 
            }
        ) {
            id
            title
            tagline
            released
        }
    }
`

export const UPDATE_MOVIE: DocumentNode = gql`
    mutation UpdateMovie(
        $id: String!
        $title: String
        $tagline: String
        $released: Int
    ){
        updateMovie(
            updateMovieInput: {
                id: $id
                title: $title
                tagline: $tagline
                released: $released 
            }
        ) {
            id
            title
            tagline
            released
        }
    }
`

export const DELETE_MOVIE: DocumentNode = gql`
    mutation DeleteMovie(
        $id: String!
    ){
        removeMovie(
            id: $id
        ) {
            success
            message
        }
    }
`

export const CREATE_PRODUCTION_COMPANY: DocumentNode = gql`
    mutation CreateProductionCompany(
        $name: String!
        $established: Int!
    ){
        createProductionCompany(
            createProductionCompanyInput: {
                name: $name
                established: $established
            }
        ) {
            id
            name
            established
        }
    }
`

export const UPDATE_PRODUCTION_COMPANY: DocumentNode = gql`
    mutation UpdateProductionCompany(
        $id: String!
        $name: String
        $established: Int
    ){
        updateProductionCompany(
            updateProductionCompanyInput: {
                id: $id
                name: $name
                established: $established 
            }
        ) {
            id
            name
            established
        }
    }
`

export const ADD_PRODUCTION_TO_COMPANY: DocumentNode = gql`
    mutation AddProductionToCompany(
        $mid: String!
        $pcid: String!
    ){
        addProduction(
            addProductionInput: {
                mid: $mid
                pcid: $pcid
            }
        ) {
            id
        }
    }
`

export const DELETE_PRODUCTION_COMPANY: DocumentNode = gql`
    mutation DeleteProductionCompany(
        $id: String!
    ){
        removeProductionCompany(
            id: $id
        ) {
            success
            message
        }
    }
`