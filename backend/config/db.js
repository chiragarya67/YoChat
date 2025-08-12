import mongoose from "mongoose"

const connectDb = async ()=>{
   try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database connected successfully")
   }
   catch(err) {
    console.log("DB error", err.message)
   }
}

 export default connectDb 