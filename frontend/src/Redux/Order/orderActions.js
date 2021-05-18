import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    SINGLE_ORDER_DETAILS_FAIL,
    SINGLE_ORDER_DETAILS_REQUEST,
    SINGLE_ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from "./orderConstants";

import axios from "axios";


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: PLACE_ORDER_REQUEST})

        const {user: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('api/orders', order, config)

        dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}



export const singleOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: SINGLE_ORDER_DETAILS_REQUEST})

        const {user: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const {data} = await axios.get('/api/orders/'+id,  config)

        dispatch({
            type: SINGLE_ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: SINGLE_ORDER_DETAILS_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}





export const orderList= () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST})

        const {user: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const {data} = await axios.get('/api/orders/list',  config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}



export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST})

        const {user: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const {data} = await axios.put('/api/orders/'+id+'/pay', paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}






