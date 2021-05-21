import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL
} from './productConstants'

export const productListReducer = (state={products:[]}, action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:    // get list req
        case PRODUCT_CREATE_REQUEST:    // Add product req
            return {
                ...state,
                loading: true
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case PRODUCT_CREATE_SUCCESS:   // Add product success
            console.log(state.products)
            return {
                products: [
                    ...(state.products),
                    action.payload
                ],
                created: true
            }
        case PRODUCT_DELETE_SUCCESS:   //delete success
            return {
                ...state,
                removed: true
            }
        case PRODUCT_LIST_RESET:      // reset
            return {
                ...state,
                removed: false,
                created: false
            }
        case PRODUCT_LIST_FAIL:
        case PRODUCT_CREATE_FAIL:
        case PRODUCT_DELETE_FAIL:
            console.log(state)
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const productDetailsReducer = (state={product:{reviews:[]}}, action) =>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}