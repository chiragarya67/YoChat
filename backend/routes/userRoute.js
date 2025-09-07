import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { editProfile, getCurrentUser } from "../controller/userController.js"
import { upload } from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.put("/profile", isAuth, upload.single("image"), editProfile)

export default userRouter