import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_UPDATE_SUCCESS

} from './userConstants'



export const userLoginReducer = (state={}, action) =>{
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false
            }
        case USER_SIGNUP_REQUEST:
            return {loading: true}
        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_SIGNUP_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userDetailsReducer = (state={success:false}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                loading: true
            }
        case USER_PROFILE_SUCCESS:
            return {
                loading: false,
                details: action.payload,
            }
        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                details: action.payload,
                success: true,
            }
        default:
            return state
    }
}