import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL

} from './userConstants'
import axios from "axios";

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





