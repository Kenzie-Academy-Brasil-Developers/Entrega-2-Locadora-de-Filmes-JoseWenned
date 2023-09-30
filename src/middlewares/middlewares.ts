import { Response, Request, NextFunction } from "express";

export const isCreateBodyValid = (req: Request, res: Response, next:NextFunction) => {

    const errors = []

    if(!req.body.name){
        errors.push("Name is required")
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