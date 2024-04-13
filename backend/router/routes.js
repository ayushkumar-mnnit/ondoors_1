const express=require('express')
const router=express.Router()
const User=require('../models/user')
const Contact=require('../models/contact')
const Feedback=require('../models/feedback')
const bcrypt=require('bcrypt')
const authMiddleware = require('../middlewares/jwtAuth')


router.get('/',(req,res)=>{
    res.send('home')
})



// API for registering a new user: Register route

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Email already exists');
            return res.status(400).json({ msg: 'Email already exists' });
        }

        const createUser = await User.create({ name, email, password, address, role });
        const token = await createUser.createToken();
        const userId = createUser._id.toString();

        res.status(200).json({ msg: 'Registered successfully', createUser, token, userId });
        console.log('User registered successfully', createUser);
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error' });
        console.error(err);
    }
});


    // API for an existing user: Login route

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

router.get('/user',authMiddleware,async(req,res)=>{
    try{
        const result=req.user
        res.status(200).json({result})

    }catch(er){
        console.log(er)
        res.status(500).json({msg:error})
    }
})

    // contact route:

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


    // feedback route:

    router.post('/feedback',async(req,res)=>{
        try {
           const {feedbackMsg}=req.body
            const feed_msg=await Feedback.create({feedbackMsg})
        
            res.status(200).json({msg:'feedback message sent successfully',feed_msg})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'server error'})
        }
    })


    module.exports=router

