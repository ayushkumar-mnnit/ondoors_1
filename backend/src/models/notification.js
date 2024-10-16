
import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the SP
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the client
  clientName: { type: String, required: true },
  bookingFor: { type: String, required: true }, 
  address: { type: String, required: true },
  pin: { type: String, required: true },
  mobile: { type: String, required: true }, 
  bookingDate: { type: Date, default: Date.now }, 
  status: { type: String, default: 'Pending' } 
});

export const Notification = mongoose.model('Notification', notificationSchema);
