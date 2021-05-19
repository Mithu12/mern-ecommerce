import express from "express";
import {authUser, getUSerProfile, getUsers, registerUser, updateUserProfile} from "../controllers/userController.js";
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

// user list
router.route('/').get(protect, admin, getUsers)


export default router