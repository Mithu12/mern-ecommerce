import express from "express";
import {
    authUser,
    deleteUser,
    getUserByID,
    getUSerProfile,
    getUsers,
    registerUser,
    updateUserDetails,
    updateUserProfile
} from "../controllers/userController.js";
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()

//login
router.post('/login',authUser)

//register
router.route('/').post(registerUser)

// get user list and update
router.route('/profile')
    .get(protect, getUSerProfile)
    .put(protect, updateUserProfile)

//========================================= Admin routes
// user list
router.route('/').get(protect, admin, getUsers)

// user delete
router.delete('/remove/:id', protect, admin, deleteUser)

//user details by id
router.route('/details/:id').get(protect, admin, getUserByID)

//update user details by id
router.route('/details/:id').put(protect, admin, updateUserDetails)


export default router