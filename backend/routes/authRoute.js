import express from "express"
import { login, signUp, logout } from "../controller/authController.js"

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.get("/logout", logout)

export default authRouter