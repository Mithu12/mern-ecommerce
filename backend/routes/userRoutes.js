import express from "express";
import {authUser, getUSerProfile, registerUser, updateUserProfile} from "../controllers/userController.js";
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/login',authUser)
router.route('/').post(registerUser)

router.route('/profile')
    .get(protect, getUSerProfile)
    .put(protect, updateUserProfile)


export default router