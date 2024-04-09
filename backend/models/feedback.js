
const mongoose=require('mongoose')

const feedbackSchema=new mongoose.Schema({
    feedbackMsg:{
        required:true,
        maxlength:200,
        minlength:3,
        type:String
    }
})

const UserFeedback=new mongoose.model('UserFeedback',feedbackSchema)

module.exports=UserFeedback