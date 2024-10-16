import mongoose from "mongoose";


const bookServiceSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model for the client
        required: true
    },
    clientName: {
        type: String,  // Name of the client making the booking
        required: true
    },
    bookingFor: {
        type: String,  // Service type provided by the service provider
        required: true
    },
    address: {
        type: String,  // Client's address
        required: true,
        minlength: 15,
        maxlength: 50
    },
    pin: {
        type: Number,  // Client's pincode
        required: true,
        minlength: 4,
        maxlength: 6
    },
    mobile: {
        type: Number,  // Client's mobile number
        required: true,
        minlength: 10,
        maxlength: 12
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model for the service provider
        required: true
    },
    spName: {
        type: String,  // Name of the service provider
        required: true
    },
    spAddress: {
        type: String,  // Address of the service provider
        required: true
    },
   
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',  // Status starts as 'Pending' and can be updated
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now  // The date when the booking was made
    },
   
});

// Export the BookService model
export const BookService = mongoose.model('BookService', bookServiceSchema);
