import { Response, Request, NextFunction } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import format from "pg-format";

export const isCreateBodyValid = (req: Request, res: Response, next:NextFunction) => {

    const errors = []

    if(!req.body.name){
        errors.push("Name is required.")
    }

    if(req.body.name.length > 50){
        errors.push("Name should not have more than 50 characters.")
    }

    if(!req.body.category){
        errors.push("Category is required.")
    }

    if(req.body.category.length > 20){
        errors.push("Category should not have more than 20 characters.")
    }

    if(!req.body.duration){
        errors.push("Duration is required.")
    }

    if(!req.body.price){
        errors.push("Price is required.")
    }

    if(errors.length > 0){
       return res.status(409).json(errors)
    }

    return next()
}

export const isCreateValidId = async (req: Request, res: Response, next:NextFunction) => {

    const queryString = format( `
        SELECT * FROM movies WHERE id = %L;
    `, req.params.id)

    const query = await client.query(queryString)

    if(!query.rows[0]){
        return res.status(404).json({message: "Movie not found!"})
    }

    res.locals.movie = query.rows[0]

    return next()
}

export const isCreateValidName =async (req: Request, res: Response, next:NextFunction) => {

    const queryString = format(`SELECT * FROM movies WHERE name = %L;`, req.body.name)

    const query = await client.query(queryString)

    if(query.rows[0]){
        return res.status(409).json({ message: "Movie name already exists!" })
    }

    return next()
}
