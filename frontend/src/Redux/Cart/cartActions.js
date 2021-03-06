import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_CHANGE_ITEM_QUANTITY,
    SAVE_SHIPPING_ADDRESS_SUCCESS, SAVE_PAYMENT_METHOD
} from "./cartConstants";
import cartCollections from './cartCollections'


export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    let {cartItems} = getState().cart
    let added = false
    quantity = quantity  <= data.stock ? quantity : data.stock

    const newItems = cartItems.map((item) => {
        if (id === item._id){
            added = true
            return {...cartCollections(item), stock:data.stock ,quantity}
        }
        return item
    })

    if (added){
        await dispatch({
            type: CART_CHANGE_ITEM_QUANTITY,
            payload: newItems
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }else {
        await dispatch({
            type: CART_ADD_ITEM,
            payload: {
                ...cartCollections(data),
                stock:data.stock,
                quantity
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    let {cartItems} = getState().cart
    const newItems = cartItems.filter(item => item._id !== id)

    await dispatch({
        type: CART_REMOVE_ITEM,
        payload: newItems
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))



}


export const saveShippingAddress = (data) => async (dispatch) => {

    await dispatch({
        type: SAVE_SHIPPING_ADDRESS_SUCCESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))



}



export const savePaymentMethod = (data) => async (dispatch) => {

    await dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))



}
