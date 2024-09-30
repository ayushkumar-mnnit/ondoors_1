import mongoose from "mongoose"

const URI=process.env.MONGO_URI


export const connectDB=async()=>{
    try{
        await mongoose.connect(URI)
        console.log('connected to database successfully')
    }catch(er){
        console.log('mongoDB database connection error')
        throw error
    }
}


