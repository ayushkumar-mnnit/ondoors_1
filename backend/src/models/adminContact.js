
import mongoose from "mongoose";

const adminContactSchema = new mongoose.Schema({
    message: { type: String, required: true,minlength: 3, maxlength: 500 },
    email: { type: String },
});

export const AdminContact = mongoose.model('AdminContact', adminContactSchema)