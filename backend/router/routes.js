const express=require('express')
const router=express.Router()
const User=require('../models/user')



router.get('/',(req,res)=>{
    res.send('home')
})



// API for registering a new user:

router.post('/register', async(req,res)=>{
    try{
       
        const {name,email,password}=req.body
        const existingUser=await User.findOne({email})

        // checking if a user exists already or not: This could have be done in schema also using validator and 'unique' property

        if(existingUser)
        {
            res.status(400).json({msg:'email already exists'})
            console.log('email already exists');
            
        }  
        // creating new user using .create() method, .save() method can also be used

        const createUser=await User.create({name,email,password})

        var token=await createUser.createToken()
        var userId= createUser._id.toString()
      
        res.status(200).json({msg:'Registered successfully',createUser,token,userId})
        console.log('user registered successfully',createUser)

    }catch(er){
        res.status(500).json({msg:'internal server error'})
        console.log(er)
    }
   
})



    // verify an existing user: Login

    // router.post('/login',async(req,res)=>{
    //     try{

    //     }catch(er){
    //         console.log(er);
    //     }
    // })





// get existing user data:

router.get('/userdata',async(req,res)=>{
    try{
        const result=await User.find()
        res.send(result)

    }catch(er){
        console.log(er)
    }
})



    // Delete user:
    

module.exports=router

