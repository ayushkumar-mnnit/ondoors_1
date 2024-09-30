
import { User } from "../models/user.js"
import { ApiError } from "../utils/ApirError.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js"


// here we are verifying if user have a valid jwt token. so this middleware will be used everywhere we need authentication.


export const getLoggedInUser=asyncHandler(async(req,res,next)=>{

    const token=req.cookies?.token || req.header('Authorization')?.replace('Bearer ' , '') 

    if(!token) throw new ApiError(404,'token not found')
        
    const decodedToken=jwt.verify(token,process.env.SECRET_KEY)

    if(!decodedToken) throw new ApiError(400,'invalid token')

    const user=await User.findById(decodedToken.userId).select('-password -token') 

    req.user=user  // inject logged in user in the req so that anywhere else all the useful info like id,name,email,token can be directly accessed from it
    
    next()

})

