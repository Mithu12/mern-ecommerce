import {
    CART_ADD_ITEM,
    CART_CHANGE_ITEM_QUANTITY,
    CART_REMOVE_ITEM, RESET_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD,
    SAVE_SHIPPING_ADDRESS_SUCCESS
} from "./cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case CART_CHANGE_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: action.payload
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: action.payload
            }
        case SAVE_SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case RESET_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: {}
            }
        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state

    }
}
