import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_FAIL

} from './userConstants'
import axios from "axios";
import {ORDER_LIST_RESET, SINGLE_ORDER_DETAILS_RESET} from "../Order/orderConstants";
import {RESET_SHIPPING_ADDRESS} from "../Cart/cartConstants";

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('api/users/login', {email,password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('UserInfo', JSON.stringify(data))

    }catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }

}

export const logout = () => async (dispatch) =>{
    localStorage.removeItem('UserInfo')
    dispatch({type: USER_LOGOUT_SUCCESS})
    dispatch({type: SINGLE_ORDER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_RESET})
    dispatch({type: USER_PROFILE_RESET})
    dispatch({type: RESET_SHIPPING_ADDRESS})
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
}



export const register = (name, email, password) => async (dispatch) =>{
    try{
        dispatch({type: USER_SIGNUP_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('api/users', {name, email,password}, config)

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })

        localStorage.setItem('UserInfo', JSON.stringify(data))

    }catch (e) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}






export const profile = () => async (dispatch, getState) =>{
    try{
        dispatch({type: USER_PROFILE_REQUEST})

        const {user: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('api/users/profile', config)

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })


    }catch (e) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}




export const update = (name, password, email) => async (dispatch, getState) =>{
    try{
        dispatch({type: USER_PROFILE_UPDATE_REQUEST})

        const {user: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put('api/users/profile', {
            name, email, password
        },config)

        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        })

        //================================ change saved login information
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('UserInfo', JSON.stringify(data))


    }catch (e) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}





