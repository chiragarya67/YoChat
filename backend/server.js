import express from "express"
import connectDb from "./config/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()

const port=process.env.PORT 

const app = express()

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRouter)

app.listen(port, ()=>{
    connectDb()
    console.log("server running on port 3000")
})