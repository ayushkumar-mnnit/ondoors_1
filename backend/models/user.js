
const mongoose=require('mongoose')
const validator=require('validator') // email validation done separately, no need here
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')


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
        minlength:5,
        required:true
    },
    address:{
        type:String,
        minlength:10,
        maxlength:30,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['Client','Service Provider']
    }
})


// securing the password: hashing  (a middleware)

userSchema.pre('save',async function (next){   // note that here we are not using fat arrow function, otherwise 'this' can't be exploited
    
    const user=this
    if(!user.isModified('password'))  next()
    
    try 
    {
        const saltRound=await bcrypt.genSalt(10)
        const hashed_password=await bcrypt.hash(user.password,saltRound)
        user.password=hashed_password

    } catch (error) {
        next(error)
    }

})


// creating and returning JWT:  (a middleware)

userSchema.methods.createToken=async function (){
   try 
   {
        return jwt.sign(
            {
            userId:this._id.toString(),
            email:this.email,
            },
            process.env.SECRET_KEY,
            {
            expiresIn:'15d'
            }
        ) 
   } catch (error) {
        console.log(error)
   }
}



const User=new mongoose.model('User',userSchema)
module.exports=User
