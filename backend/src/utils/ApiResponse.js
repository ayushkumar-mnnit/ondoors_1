export class ApiResponse {
    constructor(statusCode,data,message=true){ 
        this.data=data
        this.message=message
        this.statusCode=statusCode
        this.success=true
    }
}