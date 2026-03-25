import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { editProfile, getCurrentUser, getOtherUser } from "../controller/userController.js"
import { upload } from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.get("/others", isAuth, getOtherUser)
userRouter.put("/profile", isAuth, upload.single("image"), editProfile)

export default userRouter