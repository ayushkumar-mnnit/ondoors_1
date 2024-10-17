
import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
  spID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the SP
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the client
  bookingID: { type: mongoose.Schema.Types.ObjectId, ref: 'BookService', required: true }, // Reference to the booking
  clientName: { type: String, required: true },
  bookingFor: { type: String, required: true }, 
  address: { type: String, required: true },
  pin: { type: String, required: true },
  mobile: { type: String, required: true }, 
  bookingDate: { type: Date, default: Date.now }, 
  bookingStatus: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending', 
    required: true
},

});

export const Notification = mongoose.model('Notification', notificationSchema);
