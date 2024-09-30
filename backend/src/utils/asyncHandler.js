
export const asyncHandler=(fn)=>{
    return async(req,res,next)=>{
       try {
             await fn(req,res,next)
       } catch (error) {
           console.log(error)  // No matter from where error came, it will be caught here hence just log this for easy debugging
           res.status(error.statusCode || 500).json({
               success:false,
               message:error.message,
           })
           
       }
   }
}
