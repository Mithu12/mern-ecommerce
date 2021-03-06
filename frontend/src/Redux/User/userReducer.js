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
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_RESET,
    USER_LIST_RESET,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_REMOVE_FAIL,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS,
    ADMIN_USER_PROFILE_RESET,
    ADMIN_USER_PROFILE_FAIL,
    ADMIN_USER_PROFILE_SUCCESS,
    ADMIN_USER_PROFILE_REQUEST,
    ADMIN_USER_PROFILE_UPDATE_REQUEST,
    ADMIN_USER_PROFILE_UPDATE_SUCCESS, ADMIN_USER_PROFILE_UPDATE_FAIL

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
        case USER_PROFILE_RESET:
            return {

            }
        default:
            return state
    }
}

export const userListReducer = (state={users:[]}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
        case USER_REMOVE_REQUEST:
            return {
                loading: true
            }
        case USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        case USER_LIST_FAIL:
        case USER_REMOVE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_LIST_RESET:
            return {
                users:[]
            }
        default:
            return state
    }
}


export const userDetailsReducerAdmin = (state={}, action) => {
    switch (action.type) {
        case ADMIN_USER_PROFILE_REQUEST:
        case ADMIN_USER_PROFILE_UPDATE_REQUEST:
            return {
                loading: true
            }
        case ADMIN_USER_PROFILE_SUCCESS:
        case ADMIN_USER_PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case ADMIN_USER_PROFILE_FAIL:
        case ADMIN_USER_PROFILE_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADMIN_USER_PROFILE_RESET:
            return {
                details:{}
            }
        default:
            return state
    }
}