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
    ORDER_LIST_RESET
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
            return {loading: true}
        case SINGLE_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                orderDetails: action.payload
            }
        case SINGLE_ORDER_DETAILS_FAIL:
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
            return {loading: true}
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_LIST_RESET:
            return {}
        default:
            return {
                ...state
            }
    }

}
