


import mongoose from 'mongoose'


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
        required:true,
        minlength:10,
        maxlength:400
    }
})



export const Contact=new mongoose.model('Contact',contactSchema)


