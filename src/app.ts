import  express  from "express"
import "dotenv/config"
import { connectDatabase } from "./database"
import { moviesRoutes } from "../src/routers/movies.routes"

const app = express()

app.use(express.json())

app.use("/movies", moviesRoutes)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    connectDatabase()
})