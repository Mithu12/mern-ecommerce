import {CART_ADD_ITEM, CART_CHANGE_ITEM_QUANTITY, CART_REMOVE_ITEM} from "./cartConstants";

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
        default:
            return state

    }
}