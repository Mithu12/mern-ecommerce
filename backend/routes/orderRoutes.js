import express from "express";
import {admin, protect} from "../middleware/authMiddleware.js";
import {addOrder, getOrderById, paymentOrder, getOrderList, getAdminOrderList, orderDeliveredSet} from "../controllers/orderController.js";

const router = express.Router()


router.post('/', protect, addOrder)
router.get('/list', protect, getOrderList)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, paymentOrder)

// =========== admin
// all order list
router.get('/admin/list', protect, admin, getAdminOrderList)
// update order delivery status
router.get('/admin/update/:id', protect, admin, orderDeliveredSet)

export default router
