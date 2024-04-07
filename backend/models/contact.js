


const mongoose=require('mongoose')


const contactSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:25
    },

    email:{
        type:String,
        required:true
        
    },
    message:{
        type:String,
        required:true
    }
})



const Contact=new mongoose.model('Contact',contactSchema)
module.exports=Contact

