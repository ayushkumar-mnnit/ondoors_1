
import Router  from "express"
import { getLoggedInUser } from "../middlewares/jwtAuth.js"
import { loginUser, registerUser,getUser,updateProfile,changePassword,sendFeedback,contactUs, bookService, fetchBookings, getNotificationsForServiceProvider, adminContacts, getAdminContacts} from "../controllers/controller.js"
import { addCard, changeAdmin, deleteCard, deleteFeedback, deleteUser, getAllContacts, getAllFeedbacks, getAllUsers, getCard, updateCard } from "../controllers/controller.js"


 const router=Router()

//  ----------------user routes--------------------

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/userData').get(getLoggedInUser,getUser)
router.route('/updateProfile').patch(getLoggedInUser,updateProfile)
router.route('/changePassword').patch(getLoggedInUser,changePassword)
router.route('/contactUs').post(getLoggedInUser,contactUs)
router.route('/feedback').post(sendFeedback)

// -------------------------admin routes--------------

router.route('/admin/allUsers').get(getLoggedInUser,getAllUsers)
router.route('/admin/allFeedbacks').get(getLoggedInUser,getAllFeedbacks)
router.route('/admin/allContacts').get(getLoggedInUser,getAllContacts)
router.route('/admin/allUsers/deleteUser/:cur_userId').delete(getLoggedInUser,deleteUser)
router.route('/admin/allFeedbacks/deleteFeedback/:cur_feedbackId').delete(getLoggedInUser,deleteFeedback)
router.route('/admin/allUsers/changeAdmin/:cur_userId').patch(getLoggedInUser,changeAdmin)
router.route('/admin/contactAdmin').post(getLoggedInUser,adminContacts)
router.route('/admin/getAdminContacts').get(getLoggedInUser,getAdminContacts)


    
// ------------------------service card routes------------

router.route('/admin/newcard').post(addCard)
router.route('/admin/delete/:cur_id').post(getLoggedInUser,deleteCard)
router.route('/admin/update/:cur_id').patch(getLoggedInUser,updateCard)
router.route('/getcards').get(getCard)


// booking routes:

router.route('/bookings').post(getLoggedInUser,bookService)
router.route('/fetchBookings').get(getLoggedInUser,fetchBookings)
router.route('/fetchNotifications').get(getLoggedInUser,getNotificationsForServiceProvider)


export {router}




