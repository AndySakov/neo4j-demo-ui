import { gql, type DocumentNode } from "@apollo/client";

export const GET_DASHBOARD_DATA: DocumentNode = gql`
    query GetDashboardData {
        productionCompanies {
            id
        }
        movies {
            id
        }
        people {
            id
        }
    }
`

export const GET_MOVIES: DocumentNode = gql`
    query GetMovies {
        movies {
            id
            released
            tagline
            title
            cast {
                id
                firstName
                lastName
                birthYear
            }
            directors {
                id
                firstName
                lastName
                birthYear
            }
            producedBy {
                id
                name
                established
            }
        }
    }
`

export const GET_PEOPLE: DocumentNode = gql`
    query GetPeople {
        people {
            id
            firstName
            lastName
            birthYear
            moviesDirected {
                id
                title
                tagline
                released
            }
            moviesStarredIn {
                id
                title
                tagline
                released
            }
        }
    }
`

export const GET_COMPANIES: DocumentNode = gql`
    query GetCompanies {
        productionCompanies {
            id
            name
            established
            productions {
                id
                title
                tagline
                released
            }
        }
    }
`