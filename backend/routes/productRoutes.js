import express from "express";
import {getProducts, reviewProduct, getSingleProduct, deleteProduct, createProduct, updateProduct, searchProducts} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";
import upload from "./uploadRoutes.js";

const router = express.Router()


router.route('/').get(getProducts)
router.route('/search/:name').get(searchProducts)
router.route('/:id').get(getSingleProduct)
router.route('/review/:id').post(protect, reviewProduct)


// ================================= Admin routes
// remove products
router.route('/delete/:id').delete(protect, admin, deleteProduct)
// add products
router.route('/create').post(protect, admin,upload.single('image'), createProduct)
// update products
router.route('/update/:id').post(protect, admin,upload.single('image'), updateProduct)



export default router