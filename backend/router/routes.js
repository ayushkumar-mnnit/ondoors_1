const express=require('express')
const router=express.Router()
const User=require('../models/user')
const Contact=require('../models/contact')
const bcrypt=require('bcrypt')



router.get('/',(req,res)=>{
    res.send('home')
})



// API for registering a new user: Register

router.post('/register', async(req,res)=>{
    try{
       
        const {name,email,password}=req.body
        const existingUser=await User.findOne({email})

        // checking if a user exists already or not: This could have been done in schema also using validator and 'unique' property

        if(existingUser)
        {
            console.log('email already exists');
            return res.status(400).json({msg:'email already exists'})  // here 'return' is imp else when this code is executed then due to asynch nature another response in line 37 gets send immediately (--> error will occur ) as for each http req. there must be only single response
            
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



    // API for an existing user: Login


    router.post('/login',async(req,res)=>{
        try{

            const {email,password}=req.body
            const existUser=await User.findOne({email})
    
            if(!existUser)
            {
                console.log('invalid credentials');  
                return res.status(400).json({msg:'invalid credentials'})
            }  

            // email found, now match the password

            const pass_match=await bcrypt.compare(password,existUser.password)

            // if password also matched

            if(pass_match)
            {
                var token=await existUser.createToken()
                var userId= existUser._id.toString()
              
                res.status(200).json({msg:'Logged in successfully',token,userId})
                console.log('user logged in successfully')
            }

        }catch(er){
            res.status(500).json({msg:'internal server error'})
            console.log(er);
        }
    })




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
    

    // contact us:

    router.post('/contact',async(req,res)=>{
        try {

            const {name,email,message}=req.body
            const validName=await User.findOne({name})
            
            if(!validName)
            {
                console.log('user with this name does not exists')
                return res.status(400).json({msg:'invalid user'})
            }
            const validEmail=await User.findOne({email})

            if(!validEmail)
            {
                console.log('user with this email does not exists')
                return res.status(400).json({msg:'invalid email'})
            }

            const msgSent=await Contact.create({name,email,message})
            res.status(200).json({msg:'message sent successfully',msgSent})
            console.log(msgSent);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'server error'})
        }
    })


module.exports=router

