import { Router } from "express"
import { createMovies, createGetRead, createGetReadId } from "../logic"
import { isCreateBodyValid, isCreateValidId} from "../middlewares/middlewares"

export const moviesRoutes = Router()

moviesRoutes.post("/", isCreateBodyValid, createMovies)
moviesRoutes.get("/", createGetRead)
moviesRoutes.get("/:id", isCreateValidId, createGetReadId)