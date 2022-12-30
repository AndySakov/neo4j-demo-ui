export interface Movie {
    id: string
    title: string,
    released: number,
    tagline: string,
    cast?: Person[],
    directors?: Person[],
    producedBy?: ProductionCompany[],
}

export interface Person {
    id: string
    firstName: string,
    lastName: string,
    birthYear: number,
    moviesDirected?: Movie[],
    moviesStarredIn?: Movie[],
}

export interface ProductionCompany {
    id: string
    name: string,
    established: number,
    productions?: Movie[],
}