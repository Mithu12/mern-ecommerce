import express from "express";
import {authUser, getUSerProfile, registerUser} from "../controllers/userController.js";
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/login',authUser)
router.route('/').post(registerUser)
router.route('/profile').get(protect, getUSerProfile)


export default router