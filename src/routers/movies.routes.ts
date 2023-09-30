import { Router } from "express"
import { createMovies } from "../logic"

export const moviesRoutes = Router()

moviesRoutes.post("/", createMovies)