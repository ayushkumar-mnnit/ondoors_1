import mongoose from "mongoose";


const bookServiceSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    clientName: {
        type: String, 
        required: true
    },
    bookingFor: {
        type: String, 
        required: true
    },
    address: {
        type: String,  
        required: true,
        minlength: 15,
        maxlength: 50
    },
    pin: {
        type: Number,  
        required: true,
        minlength: 4,
        maxlength: 6
    },
    mobile: {
        type: Number,  
        required: true,
        minlength: 10,
        maxlength: 12
    },
    spID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    spName: {
        type: String,  
        required: true
    },
    spAddress: {
        type: String,  
        required: true
    },
   
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',  
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now  
    },
   
});

// Export the BookService model
export const BookService = mongoose.model('BookService', bookServiceSchema);
