import  express  from "express";

const app = express()

app.use(express.json())

app.get("/movies", )

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})