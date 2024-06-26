import { Request, Response } from "express"
import { client } from "./database"
import { QueryConfig } from "pg"
import format from "pg-format"
import { Tmovies, Movies } from "./interfaces"


export const createMovies = async (req: Request, res: Response) => {

    const newMovie: Omit<Movies, "id"> = {
        name: req.body.name,
        category: req.body.category,
        duration: req.body.duration,
        price: req.body.price
    };

    const queryConfig = format(
        `INSERT INTO movies (%I) VALUES (%L) RETURNING *;`,
        Object.keys(newMovie),
        Object.values(newMovie)
    );

    const query = await client.query(queryConfig)

    res.status(201).json(query.rows[0])
}

export const createGetRead = async (req: Request, res:Response) => {

    let queryConfig : string | QueryConfig

    if(req.query.category){
        const search = '%' + req.query.category + '%'
        queryConfig = format(`SELECT * FROM movies WHERE category ILIKE '%s';`, search)
        const query = await client.query(queryConfig)

        if(query.rowCount){
            return res.status(200).json(query.rows)
        }
    }
        
    queryConfig = `SELECT * FROM movies;`
    const query = await client.query(queryConfig)
    return res.status(200).json(query.rows)
       
}

export const createGetReadId = async (req: Request, res:Response) => {

    res.status(200).json(res.locals.movie)
    
} 

export const createDelete = async (req: Request, res:Response) => {
    const queryString = format(`DELETE FROM movies WHERE id = %L;`, req.params.id);

    await client.query(queryString)

    res.status(204).json()
}

export const createUpdateMovies = async (req: Request, res:Response) => {

    let objectData: Tmovies = {}
    Object.entries(req.body).forEach(([key, value]) => {
        if(key === "name" || key === "category"){
            if(typeof value === "string"){
                objectData[key] = value
            }
        }else if(key === "duration" || key === "price"){
            if(typeof value === "number"){
                objectData[key] = value
            }
        }
    })

    const queryConfig = format(`
        UPDATE movies SET (%I) = ROW(%L) WHERE id = %L RETURNING *;
    `, Object.keys(objectData), Object.values(objectData), req.params.id)

    const query = await client.query(queryConfig)

    res.status(200).json(query.rows[0])
}

