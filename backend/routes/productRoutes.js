import express from "express";
import {getProducts, getSingleProduct, deleteProduct, createProduct, updateProduct} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";
import upload from "./uploadRoutes.js";

const router = express.Router()


router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)


// ================================= Admin routes
// remove products
router.route('/delete/:id').delete(protect, admin, deleteProduct)
// add products
router.route('/create').post(protect, admin,upload.single('image'), createProduct)
// update products
router.route('/update/:id').post(protect, admin,upload.single('image'), updateProduct)



export default router