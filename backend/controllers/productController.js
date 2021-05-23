import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import {json} from "express";


// @desc    fetch all products
// @route   GET /api/products
// @access  Public

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


// @desc    fetch single products
// @route   GET /api/products/:id
// @access  Public


export const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product)
        res.json(product)
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// @desc    Creat product
// @route   POST /api/products/create
// @access  Private/Admin


export const createProduct = asyncHandler(async (req, res) => {

    const user = req.user._id
    const image = req.file ? '/images/'+req.file.filename : '/images/demo.jpg'

    const product = new Product({...(req.body), image, user})
    if (product){
        await product.save()
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not added')
    }
})




// @desc    Update product
// @route   POST /api/products/update/:id
// @access  Private/Admin


export const updateProduct = asyncHandler(async (req, res) => {

    const {
        name,
        price,
        brand,
        category,
        stock,
        numReviews,
        description
    } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name =  name ||  product.name
        product.price =  price ||  product.price
        product.image = req.file ? '/images/'+req.file.filename : product.image
        product.brand =  brand ||  product.brand
        product.category =  category ||  product.category
        product.stock =  stock ||  product.stock
        product.numReviews =  numReviews ||  product.numReviews
        product.description =  description ||  product.description

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// @desc    Delete product
// @route   GET /api/products/delete/:id
// @access  Private/Admin

export const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({deleteSuccess: true})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})




// @desc    Rate/review product
// @route   POST /api/products/review/:id
// @access  Private


export const reviewProduct = asyncHandler(async (req, res) => {

    const {
        rating, comment
    } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        // const alreadyReviewed = false
        if (alreadyReviewed)
        {
            res.status(400)
            throw new Error('Product Already reviewed')
        }
        else {


            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.numReviews > 1 ? (product.rating + rating) / 2 : rating
            await product.save()
            res.status(201).json({message: 'review added successfully', review})
        }
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})


