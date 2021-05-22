import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    SINGLE_ORDER_DETAILS_FAIL,
    SINGLE_ORDER_DETAILS_SUCCESS,
    SINGLE_ORDER_DETAILS_REQUEST,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    SINGLE_ORDER_DETAILS_RESET,
    ORDER_LIST_RESET,
    ADMIN_ORDER_LIST_REQUEST,
    ADMIN_ORDER_LIST_SUCCESS,
    ADMIN_ORDER_LIST_FAIL, ADMIN_ORDER_UPDATE_REQUEST, ADMIN_ORDER_UPDATE_SUCCESS, ADMIN_ORDER_UPDATE_FAIL,
} from "./orderConstants";

export const orderPlaceReducer = (state, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return {loading: true}
        case PLACE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case PLACE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {
                ...state
            }
    }

}


export const orderDetailsReducer = (state = {
    orderDetails:
        {
            user: {},
            shippingAddress: {},
            orderItems: []
        }
}, action) => {
    switch (action.type) {
        case SINGLE_ORDER_DETAILS_REQUEST:
        case ADMIN_ORDER_UPDATE_REQUEST:  // ======= update delivery status request
            return {loading: true}
        case SINGLE_ORDER_DETAILS_SUCCESS:
        case ADMIN_ORDER_UPDATE_SUCCESS:  // ======= update delivery status success
            return {
                loading: false,
                orderDetails: action.payload
            }
        case SINGLE_ORDER_DETAILS_FAIL:
        case ADMIN_ORDER_UPDATE_FAIL:     // ======= update delivery status fail
            return {
                loading: false,
                error: action.payload
            }
        case SINGLE_ORDER_DETAILS_RESET:
            return {
                orderDetails:
                    {
                        user: {},
                        shippingAddress: {},
                        orderItems: []
                    }
            }
        default:
            return {
                ...state
            }
    }

}


export const orderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
        case ADMIN_ORDER_LIST_REQUEST:
            return {loading: true}
        case ORDER_LIST_SUCCESS:
        case ADMIN_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_FAIL:
        case ADMIN_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_LIST_RESET:
            return {
                orders: []
            }
        default:
            return {
                ...state
            }
    }

}
