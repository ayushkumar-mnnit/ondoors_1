export class ApiError extends Error{
    constructor(
        statusCode,
        message="something went wrong", // default value
        errors=[],  // may be more than one error comes in so capture all
    ){
        super(message) 
        this.message=message
        this.statusCode=statusCode
        this.errors=errors
        this.data=null,
        this.success=false
    }
}