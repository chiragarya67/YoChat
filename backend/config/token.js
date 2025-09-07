import jwt from "jsonwebtoken"

const gentoken = (userId)=>{
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET)
        return token
        
    } catch (error) {
        console.log("token gen error");
    }
    
}

export default gentoken