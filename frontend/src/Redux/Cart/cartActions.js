import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CHANGE_ITEM_QUANTITY, CART_DECREASE_ITEM_QUANTITY} from "./cartConstants";
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