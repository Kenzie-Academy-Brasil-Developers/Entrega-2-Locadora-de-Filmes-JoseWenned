import { Request, Response } from "express"
import { client } from "./database"
import { QueryConfig } from "pg"


export const createMovies = async (req: Request, res: Response) => {

    const queryString = `

        INSERT INTO movies (name, category, duration, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;

    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.name, req.body.category, req.body.duration, req.body.price]
    }

    const query = await client.query(queryConfig)

    res.status(201).json(query.rows[0])
}

export const createGetRead = async (req: Request, res:Response) => {
    
    const queryString = `
        SELECT * FROM movies;
    `

    const query = await client.query(queryString)

    res.status(200).json(query.rows)
}

export const createGetReadId = async (req: Request, res:Response) => {

    res.status(200).json(res.locals.movie)
    
} 