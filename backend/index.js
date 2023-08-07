import express from "express"

import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"

const app = express()

const port = 8800
app.use(express.json())

app.use("/backend/auth", authRoutes)
app.use("/backend/posts", postRoutes)
app.use("/backend/user", userRoutes)

app.use(express.json())
app.listen(port, () => console.log(`Example app listening on port ${port}!`))