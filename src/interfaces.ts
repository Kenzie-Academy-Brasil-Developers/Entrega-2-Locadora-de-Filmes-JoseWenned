export interface Movies {
    id: number,
    name: string,
    category: string,
    duration: number,
    price: number
}

export type Tmovies = Partial<Pick<Movies, "name" | "category" | "duration" | "price">>