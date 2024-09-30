
import mongoose from 'mongoose'

const feedbackSchema=new mongoose.Schema({
    feedbackMsg:{
        required:true,
        maxlength:200,
        minlength:3,
        type:String
    }
})

export const Feedback=new mongoose.model('UserFeedback',feedbackSchema)

