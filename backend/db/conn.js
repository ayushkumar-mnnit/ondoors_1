
const mongoose=require('mongoose')

const URI=process.env.MONGO_URI

// using async-await is a better practice:

const connectDB=async()=>{
    try{
        await mongoose.connect(URI)
        console.log('connnected to database successfully')
    }catch(er){
        console.log(er)
        process.exit(0)
    }
}


module.exports=connectDB


// by default only 20 docs are shown on shell in mongodb , if want to show all the documents then use db.users.find().toArray()