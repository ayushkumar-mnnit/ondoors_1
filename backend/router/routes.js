const express=require('express')
const router=express.Router()
const User=require('../models/user')
const Contact=require('../models/contact')
const Feedback=require('../models/feedback')
const bcrypt=require('bcrypt')
const authMiddleware = require('../middlewares/jwtAuth')
const Service = require('../models/services')


router.get('/',(req,res)=>{
    res.send('home')
})


// API for registering a new user: Register route

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, address, role, isAdmin, serviceType } = req.body
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            console.log('Email already exists')
            return res.status(400).json({ msg: 'Email already exists' })
        }

        let createUser
        if (role === 'Service Provider') {
            createUser = await User.create({ name, email, password, address, role, isAdmin, serviceType })
        } else {
            createUser = await User.create({ name, email, password, address, role, isAdmin })
        }

        const token = await createUser.createToken()
        const userId = createUser._id.toString()

        res.status(200).json({ msg: 'Registered successfully', createUser, token, userId })
        console.log('User registered successfully', createUser)
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error' })
        console.error(err)
    }
})



    // API for an existing user: Login route

    router.post('/login',async(req,res)=>{
        try{

            const {email,password}=req.body
            const existUser=await User.findOne({email})
    
            if(!existUser)
            {
                console.log('invalid credentials')  
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
            console.log(er)
        }
    })


// get existing user data: (individual user)

router.get('/user',authMiddleware,async(req,res)=>{
    try{
        const result=req.user
        // const userId=req.Id
        res.status(200).json({result})

    }catch(er){
        console.log(er)
        res.status(500).json({msg:error})
    }
})


// update profile

router.patch('/profile/update/:id',authMiddleware,async(req,res)=>{
    try {
        const id=req.params.id
        const updatedData=req.body
        const result=await User.updateOne({_id:id},{$set:updatedData})

        console.log('updated successfully')

        res.status(200).json({msg:'updated successfully',result})

    } catch (error) {
        res.status(500).json({msg:"error updating.."})
    }
})



// -------------------------Admin routes-----------------------------

// get all registered users : 

router.get('/admin/allusers',authMiddleware,async(req,res)=>{
    try{
        const result=await User.find({},{password:0})
        if(!result || result.length===0) res.status(400).json({msg:'no data exists'})
        console.log(result)
        res.status(200).json({result})

    }catch(er){
        console.log(er)
        res.status(500).json({msg:error})
    }
})

// get all contacts: 

router.get('/admin/allcontacts',authMiddleware,async(req,res)=>{
    try{
        const result=await Contact.find({})
        if(!result || result.length===0) res.status(400).json({msg:'no data exists'})
        console.log(result)
        res.status(200).json({result})

    }catch(er){
        console.log(er)
        res.status(500).json({msg:error})
    }
})

// get all feedbacks: 


router.get('/admin/allfeedbacks',authMiddleware,async(req,res)=>{
    try{
        const result=await Feedback.find({})
        if(!result || result.length===0) res.status(400).json({msg:'no data exists'})
        console.log(result)
        res.status(200).json({result})

    }catch(er){
        console.log(er)
        res.status(500).json({msg:error})
    }
})



// delete users:

router.delete('/admin/allusers/delete/:id',authMiddleware,async(req,res)=>{
    try {
        const id=req.params.id
        const result=await User.deleteOne({_id:id})

        console.log('user deleted successfully')

        res.status(200).json({msg:'user deleted successfully',result})

    } catch (error) {
        res.status(500).json({msg:'some error occured while deleting user'})
    }
})



// delete contacts:

router.delete('/admin/allcontacts/delete/:id',authMiddleware,async(req,res)=>{
    try {
        const id=req.params.id
        const result=await Contact.deleteOne({_id:id})

        console.log('user deleted successfully')

        res.status(200).json({msg:'user deleted successfully',result})

    } catch (error) {
        res.status(500).json({msg:'some error occured while deleting user'})
    }
})



// delete feedbacks:

router.delete('/admin/allfeedbacks/delete/:id',authMiddleware,async(req,res)=>{
    try {
        const id=req.params.id
        const result=await Feedback.deleteOne({_id:id})

        console.log('user deleted successfully')

        res.status(200).json({msg:'user deleted successfully',result})

    } catch (error) {
        res.status(500).json({msg:'some error occured while deleting user'})
    }
})



// update users:


// first we'll create a route to get the id and data of the current user to fetch current user data so that we can update it later. This is not required with other methods of CRUD (except in new registration) but here needed becoz we need the previous data to update it 

router.get('/admin/allusers/:id',authMiddleware,async(req,res)=>{
    try {
        const id=req.params.id
        const data=await User.findOne({_id:id},{password:0})
        const result=await data
        res.status(200).json({result})
    } catch (error) {
        res.status(400).json({msg:'error fetching user data'})
    }
})



// now update the user as we done other CRUD operations 


router.patch('/admin/allusers/update/:id',authMiddleware,async(req,res)=>{
    try {
        const id=req.params.id
        const updatedData=req.body
        const result=await User.updateOne({_id:id},{$set:updatedData})

        console.log('user updated successfully')

        res.status(200).json({msg:'user updated successfully',result})

    } catch (error) {
        res.status(500).json({msg:'some error occured while deleting user'})
    }
})



    
// ------------------------Card routes------------
    
    // creating new service route:

    router.post('/admin/newcard',async(req,res)=>{
        try {
            const {title,description}=req.body
            const alreadyPresent=await Service.findOne({title})
            if(alreadyPresent){
                res.status(400).json({msg:'already present'})
            }
            const createOne=await Service.create({title,description})
            res.status(200).json({msg:'created successfully',createOne})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    })

    // delete card:

    router.delete('/admin/newcard/delete/:id',async(req,res)=>{
        try {
            
            const id=req.params.id
            const result=await Service.deleteOne({_id:id})
            res.status(200).json({msg:'card deleted successfully',result})

        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    })


    // get card data:

    router.get('/newcard/getcard',async(req,res)=>{
        try {
            const cardData=await Service.find({})
            res.status(200).json({msg:'card data',cardData})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    })




// -------------------------------------------------------------------------------


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
            console.log(msgSent)
            
        } catch (error) {
            console.log(error)
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




//  router.post('/serviceformdata',async(req,res)=>{
//     try {
//         const {name,email,address}=req.body
//         res.status(200).json({msg:{name,email,address}})
//     } catch (error) {
//         res.status(500).json({msg:error.message})
//     }
//  })





// --------------------------------------------------------------

    module.exports=router

