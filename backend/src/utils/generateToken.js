import {User} from "../models/user.js"


export const generateToken=async(userId)=>{

    const currentUser=await User.findById(userId)
    const token=currentUser.createToken()
    
    currentUser.token=token   
    await currentUser.save({validateBeforeSave:false})
    return token

}