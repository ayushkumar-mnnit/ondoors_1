
const mongoose=require('mongoose')

const serviceShema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    description:{
        type:String,
        required:true,
        minlength:20,
        maxlength:200
    }
})

const Service=new mongoose.model('Service',serviceShema)

module.exports=Service