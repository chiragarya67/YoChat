import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next) => {

    try {
        let token = req.cookies.Yochat
       if(!token){
          return res.status(404).json("token not found")
       }
       let verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
       req.userId = verifyToken.userId
         next()
    } 
    catch (error) {
      return res.status(500).json(`isAuth error ${error}`)
    }

}

export default isAuth
