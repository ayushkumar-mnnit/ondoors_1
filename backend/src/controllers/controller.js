
import { User } from "../models/user.js"
import { ApiError } from "../utils/ApirError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Contact } from '../models/contact.js'
import { Feedback } from '../models/feedback.js'
import { Service } from '../models/services.js'
import { generateToken } from '../utils/generateToken.js'
import { BookService } from '../models/booking.js'
import { Notification } from "../models/notification.js"
import { AdminContact } from "../models/adminContact.js"






// register 

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, address, role, serviceType,pincode } = req.body // access the form data

    if (
        [name, email, password, address, role,pincode].some((field) =>     // check no field is  empty
            field?.trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required')
    }

      // Conditionally check if serviceType is required based on the role
      if (role === 'Service Provider' && !serviceType?.trim()) {
        throw new ApiError(400, 'Service Type is required for Service Providers')
    }


    const existingUser = await User.findOne({ email })   // check user is not already registerd

    if (existingUser) {
        throw new ApiError(409, 'user already exists with this email')
    }

    const createNewUser = await User.create({ name, email, password, address, role, serviceType,pincode })

    const createdUser = await User.findById(createNewUser._id).select("-password -token") // remove sensitive fields before returning response

    if (!createNewUser) {
        throw new ApiError(500, 'error occured while registering')
    }

    res.status(201).json(new ApiResponse(200, createdUser, 'Registration successful')) // send the data if evrything is successful

})


// login

export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body  // get the data

    const registerdUser = await User.findOne({ email }) // find the user claiming for login

    if (!registerdUser) {   // if not found
        throw new ApiError(404, 'user does not exists', ['invalid user'])
    }

    const enteredPassword = await registerdUser.isPasswordCorrect(password)  // if found, check password

    if (!enteredPassword) {  // if wrong
        throw new ApiError(400, 'invalid email or password')
    }

    // else user is authenticated, so generate tokens
    const token = await generateToken(registerdUser._id)


    // set these options so that cookie data is only modifiable from server side (preventing XSS)
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        samesite: 'none',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      };

    // send the tokens in cookie of the client (i.e. set the cookie) becoz when auth is successful then website expect tokens in cookies and send the tokens in cookies of each subsequent request
    res.cookie('token', token, options) 
   .status(200) 
   .json(new ApiResponse(200, token, 'Logged in successfully')); 
    // send tokens in response also becoz response is actually main body and mobile apps expect the tokens in body,then store the token locally (e.g., in secure storage) and send it in the Authorization header with every subsequent request.


})




// logout


export const logoutUser = asyncHandler(async (req, res) => {
    try {
        await User.updateOne({ _id: req.user._id }, { $set: { token: null } })
        // Clear the cookie by setting it to null and giving it an expiration in the past
        res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
        .status(200).json(new ApiResponse(200, null, 'Logged out successfully'))
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, 'Logout failed, please try again.'))
    }
})




// get existing user data: (individual user)

export const getUser = asyncHandler(async (req, res) => {


    const userData = req.user
    if (!userData) throw new ApiError(500, 'user data fetching failed due to some error')

    res.status(200).json(new ApiResponse(200, userData, 'userData fetched successfully'))
})



// update profile

export const updateProfile = asyncHandler(async (req, res) => {

    const {mobile, address, role, serviceType,pincode } = req.body

    if (!mobile || !address || !role || (role === 'Service Provider' && !serviceType) || !pincode) throw new ApiError(400, 'All fields are required')


        if (address.length < 15) {
            throw new ApiError(400, 'Address must be at least 15 characters long')
        }
        if (mobile.length < 10) {
            throw new ApiError(400, 'Phone number must be at least of 10 digits ')
        }
        if (pincode.length < 4) {
            throw new ApiError(400, 'pin code must be at least of 4 digits')
        }

    const cur_user = await User.findByIdAndUpdate(req.user._id, { $set: {mobile, address, role, serviceType,pincode } }).select('-password -isAdmin -token')

    res.status(200).json(new ApiResponse(201, cur_user, 'Profile updated successfully'))

})


// update password:

export const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isOldPasswordCorrect) {
        throw new ApiError(400, 'Invalid old password')
    }

    // Explicitly mark the password as modified
    user.password = newPassword // Set the new password
    user.markModified('password') // Mark it as modified
    await user.save() // Save the updated user

    res.status(200).json(new ApiResponse(201, {}, 'Password changed successfully'))
})




// forget password functionality: to be implemented soon...



// get all registered users : 

export const getAllUsers = asyncHandler(async (req, res) => {
   
    
    console.log(req.user)

    const result = await User.find({}).select('-password -token')
    if (!result || result.length === 0) throw new ApiError(404, 'No user data exists')

    res.status(200).json(new ApiResponse(201, result, 'All users fetched successfully'))

})


// get all contacts: 

export const getAllContacts = asyncHandler(async (req, res) => {
   
    const result = await Contact.find({})
    if (!result || result.length === 0) throw new ApiError(404, 'No contact data exists')

    res.status(200).json(new ApiResponse(201, result, 'All contact data fetched successfully'))

})

// get all feedbacks: 

export const getAllFeedbacks = asyncHandler(async (req, res) => {
   
    const result = await Feedback.find({})
    if (!result || result.length === 0) throw new ApiError(404, 'No feedback data exists')

    res.status(200).json(new ApiResponse(201, result, 'All feedbacks fetched successfully'))

})



// delete user:

export const deleteUser = asyncHandler(async (req, res) => {

       const id = req.params.cur_userId
    const result = await User.deleteOne({ _id: id })
    if (result.deletedCount === 0) throw new ApiError(404, 'User does not exists')

    res.status(200).json(new ApiResponse(201, result, 'User deleted successfully'))

})







// update user (-change admin role)

export const changeAdmin = asyncHandler(async (req, res) => {
    const { isAdmin } = req.body
    const id = req.params.cur_userId


    if (typeof isAdmin === 'undefined') {
        throw new ApiError(400, 'isAdmin field is required')
    }

    const cur_user = await User.findByIdAndUpdate(
        id,
        { $set: { isAdmin } },
        { new: true } // This option returns the updated document
    ).select('-password -token')

    // Send response
    res.status(200).json(new ApiResponse(201, cur_user, 'Admin role updated successfully'))
})




export const adminContacts=asyncHandler(async (req, res) => {
   const {message, email} = req.body   

   const result = await AdminContact.create({message, email})
   if (!message) throw new ApiError(400, 'Input field can not be empty')
   res.status(200).json(new ApiResponse(201, result, 'message sent to admin successfully'))
})

export const getAdminContacts=asyncHandler(async (req, res) => {

    const result = await AdminContact.find({})
    console.log(result,'thi si resilt')
    if (!result || result.length === 0) throw new ApiError(404, 'No data exists')

    res.status(200).json(new ApiResponse(201, result, 'All data fetched successfully'))
})

// create service card:

export const addCard = asyncHandler(async (req, res) => {

   
    const { title, description } = req.body
    const alreadyPresent = await Service.findOne({ title })
    if (alreadyPresent) {
        throw new ApiError(400, 'card already exists')
    }
    const createOne = await Service.create({ title, description })

    res.status(200).json(new ApiResponse(201, createOne, 'card added successfully'))
})


// delete card:

export const deleteCard = asyncHandler(async (req, res) => {

   
    const id = req.params.cur_id
    const result = await Service.deleteOne({ _id: id })
    if (result.deleteCount === 0) throw new ApiError(404, 'Card does not exists')

    res.status(200).json(new ApiResponse(201, result, 'Card deleted successfully'))

})



// get card data:


export const getCard = asyncHandler(async (req, res) => {

  
    const result = await Service.find({})
    if (!result) throw new ApiError(404, 'No card exists')

    res.status(200).json(new ApiResponse(201, result, 'Cards fetched successfully'))

})


// update card:

export const updateCard = asyncHandler(async (req, res) => {

   

    const { title, description } = req.body
    if (!title || !description) throw new ApiError(400, 'All fields are required')
    const id = req.params.cur_id
    const result = await Service.findByIdAndUpdate({ _id: id }, { $set: { title, description } })

    res.status(200).json(new ApiResponse(201, result, 'Card updated successfully'))
})



// contact route:

export const contactUs = asyncHandler(async (req, res) => {

    const { name, email, message } = req.body

    const validEmail = await User.findOne({ email })

    if (!validEmail) throw new ApiError(400, 'You are not a registerd user')

    const msgSent = await Contact.create({ name, email, message })

    res.status(200).json(new ApiResponse(201, msgSent, 'Message sent successfully'))
})



// feedback route:

export const sendFeedback = asyncHandler(async (req, res) => {

    const { feedbackMsg } = req.body
    const feed_msg = await Feedback.create({ feedbackMsg })

    if (!feed_msg) throw new ApiError(400, 'Input field can not be empty')

    res.status(200).json(new ApiResponse(201, feed_msg, 'feedback sent successfully'))
})



// booking route:


export const bookService = asyncHandler(async (req, res) => {
    
    const { clientID, clientName, bookingFor, address, pin, mobile, spID, spName, spAddress } = req.body

    // Create a new booking
    const newBooking = await BookService.create({
        clientID,
        clientName,
        bookingFor,
        address,
        pin,
        mobile,
        spID,
        spName,
        spAddress,
    })

     // Create a new notification for the service provider

     const bookingID = newBooking._id
     const bookingStatus = newBooking.bookingStatus

  await Notification.create({
    spID,
    clientID,
    bookingID,
    bookingStatus,
    clientName,
    bookingFor,
    address,
    pin,
    mobile,
  })

    
    if (!newBooking) {
        throw new ApiError(500, 'Error occurred while creating the booking')
    }

    // Respond with success
    res.status(201).json(new ApiResponse(201, newBooking, 'Booking successful'))
})


export const fetchBookings = asyncHandler(async (req, res) => {
    // Fetch the bookings for the authenticated client and sort by date descending
    
    const bookings = await BookService.find({ clientID: req.user._id })
      

    if (!bookings || bookings.length === 0) {
        throw new ApiError(404, 'No bookings found for this client')
    }

    // Respond with success
    res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'))
})


export const getNotificationsForServiceProvider = asyncHandler(async (req, res) => {
  
    const notifications = await Notification.find({ spID:req.user._id})


    if (!notifications) {
      throw new ApiError(404, 'No notifications found ')
    }
  
    res.status(200).json({
      success: true,
      notifications,
    })
  })
  


//   update status:

export const updateBookingStatus = asyncHandler(async (req, res) => {
    const { bookingID } = req.params
    const { status } = req.body // Expect status to be 'Accepted' or 'Rejected'
  
    // Update the booking status
    const updatedBooking = await BookService.findByIdAndUpdate(
      bookingID,
      { bookingStatus: status },
      { new: true } // Return the updated document
    )
  
    if (!updatedBooking) {
      throw new ApiError(404, 'Booking not found')
    }
  
    
    const updatedNotification = await Notification.findOneAndUpdate(
      { bookingID: bookingID }, 
      { bookingStatus: status }, 
      { new: true } 
    )
  
    if (!updatedNotification) {
      console.log('No notification found for this booking.')
    }
  
    res.status(200).json({
      success: true,
      data: {
        booking: updatedBooking,
        notification: updatedNotification
      },
    })
  })
  
