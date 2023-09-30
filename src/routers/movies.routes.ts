import { Router } from "express"
import { createMovies } from "../logic"
import { isCreateBodyValid } from "../middlewares/middlewares"

export const moviesRoutes = Router()

moviesRoutes.post("/", isCreateBodyValid, createMovies)