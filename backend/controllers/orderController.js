import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";


// @desc    create new order
// @route   GET /api/orders
// @access  Private

export const addOrder = asyncHandler(async (req, res) => {
    console.log('yoyo')
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Item in the list')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
            shippingPrice
        })

        const placedOrder = await order.save()
        res.status(201).json(placedOrder)
    }

})


// @desc    Get orders of loggedin user
// @route   GET /api/orders/list
// @access  Private

export const getOrderList = asyncHandler(async (req, res) => {

    const orders = await Order.find({user: req.user._id})

    res.json(orders)


})


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

export const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

})


// @desc    update order paid status
// @route   GET /api/orders/:id/pay
// @access  Private

export const paymentOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

})

