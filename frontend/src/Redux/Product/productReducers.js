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
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET
} from './productConstants'

export const productListReducer = (state={products:[]}, action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:    // get list req
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
            return {
                products: [
                    action.payload,
                    ...(state.products)
                ],
                created: true
            }
        case PRODUCT_DELETE_SUCCESS:   //delete success
            return {
                products: action.payload,
                removed: true
            }
        case PRODUCT_UPDATE_SUCCESS:   //update success
            return {
                products: action.payload,
                updated: true
            }
        case PRODUCT_LIST_RESET:      // reset
            return {
                ...state,
                removed: false,
                created: false,
                updated: false
            }
        case PRODUCT_LIST_FAIL:
        case PRODUCT_CREATE_FAIL:
        case PRODUCT_DELETE_FAIL:
        case PRODUCT_UPDATE_FAIL:
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
        case PRODUCT_CREATE_REVIEW_REQUEST:
        return {
            ...state,
            reviewLoading: true
        }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:   // ================ creating a new review success
            return {
                ...state,
                reviewLoading: false,
                reviewSuccess: true,
                reviewMessage: action.payload.message,
                product: {
                    ...(state.product),
                    reviews: [
                        ...(state.product.reviews),
                        action.payload.review,
                    ]
                }
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_CREATE_REVIEW_FAIL:    // ================ creating a new review fail
            return {
                ...state,
                reviewLoading: false,
                loading: false,
                reviewError: action.payload
            }

        case PRODUCT_CREATE_REVIEW_RESET:    // ================ resetting a new review state
            return {
                ...state,

                reviewSuccess : false,
                reviewMessage : '',
                reviewError: false
            }

        default:
            return state
    }
}