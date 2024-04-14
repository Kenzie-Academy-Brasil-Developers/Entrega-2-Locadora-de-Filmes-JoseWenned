import  express  from "express"
import "dotenv/config"
import swaggerUiExpress from "swagger-ui-express"
import swaggerDocument from "./swagger.json"
import { connectDatabase } from "./database"
import { moviesRoutes } from "../src/routers/movies.routes"

const app = express()

app.use(express.json())

app.use("/movies", moviesRoutes)
app.use("/api-documentation", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument))

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    connectDatabase()
})