
import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({

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
    password:{
        type:String,
        minlength:8,
        required:true
    },
    address:{
        type:String,
        minlength:15,
        maxlength:50,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['Client','Service Provider']
    },

    isAdmin:{
        type:Boolean,
        default:false,
        enum:[true,false]
    },
    serviceType: {
        type: String
    },
     token:{
        type:String,
        default:undefined
    },
    mobile:{
        type:Number,
        minlength:10,
        maxlength:12,
    },
    pincode:{
        type:Number,
        minlength:4,
        maxlength:6,
        required:true

    }

})



userSchema.pre('save',async function (next){   // note that here we are not using fat arrow function, otherwise 'this' can't be exploited
    try {
        if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
    } catch (error) {
        next(error)
    }
})


userSchema.methods.isPasswordCorrect=async function(password){   // needs to be passed as middleware during login
    try {
        const result=await bcrypt.compare(password,this.password)
        return result
    } catch (error) {
        console.log('password did not match with hashed password')
        throw error
    }
}


// creating and returning JWT:  

userSchema.methods.createToken=function (){
  return jwt.sign(
            {
            userId:this._id.toString(),
            email:this.email,
            },
            process.env.SECRET_KEY,
            {
            expiresIn:'7d'
            }
        ) 
}



export const User=new mongoose.model('User',userSchema)

