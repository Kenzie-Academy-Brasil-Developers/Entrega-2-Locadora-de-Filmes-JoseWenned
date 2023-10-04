import { Router } from "express"
import { 

    createMovies, 
    createGetRead, 
    createGetReadId, 
    createDelete, 
    createUpdateMovies,

} from "../logic"
import { isCreateBodyValid, isCreateValidId, isCreateValidName} from "../middlewares/middlewares"

export const moviesRoutes = Router()

moviesRoutes.post("/", isCreateValidName, isCreateBodyValid, createMovies)
moviesRoutes.get("/", createGetRead)
moviesRoutes.get("/:id", isCreateValidId, createGetReadId)
moviesRoutes.delete("/:id", isCreateValidId, createDelete)
moviesRoutes.patch("/:id", isCreateValidName, isCreateValidId, createUpdateMovies)

