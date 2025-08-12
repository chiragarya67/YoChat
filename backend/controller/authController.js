import gentoken from "../config/token.js"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

export const signUp = async (req, res)=> {
     try{
       const {username, email, password} = req.body

       const checkusername = await User.findOne({username})
       if(checkusername) {
           return res.status(400).json({message:"Username already exist"})
       }

       const checkemail = await User.findOne({email})
       if(checkemail) {
           return res.status(400).json({message:"email already connected"})
       }

       if(password.length < 6 ) {
       return res.status(404).json({message:"Password must be atleast 6 characters"})
       }

       const hashedPassword = await bcrypt.hash(password, 10)
       const user = await User.create({
           username,
           email,
           password: hashedPassword
       })

       const token = gentoken(user._id)
       res.cookie("Yochat", token, {
          httpOnly: true,
          sameSite: "none",
          secure: false
       })
        return res.status(201).json(user)
     }

      catch(error){
        res.status(500).json({message:`signUp error ${error}`})
      }
}

export const login = async (req, res)=> {
     try{
       const {email, password} = req.body

       const user = await User.findOne({email})
       if(!user) {
           return res.status(400).json({message:"User not exist"})
       }
      
       const isMatched = await bcrypt.compare(password,user.password)
       if(!isMatched) {
          return res.status(400).json({message:"Username or password is incorrect"})
       }

       const token = gentoken(user._id)
       res.cookie("Yochat", token, {
          httpOnly: true,
          sameSite: "none",
          secure: false
       })
        return res.status(200).json(user)
     }
      catch(error){
        res.status(500).json({message:`login error ${error}`})
      }
}

export const logout = async (req, res)=>{
   res.clearCookie("Yochat")
   return res.status(200).json({message:"logout sucessfully"})
   
}