import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import { addOrder, getOrderById, paymentOrder, getOrderList } from "../controllers/orderController.js";

const router = express.Router()


router.post('/', protect, addOrder)
router.get('/list', protect, getOrderList)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, paymentOrder)


export default router
