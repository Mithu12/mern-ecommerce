import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./Product/productReducers";
import {cartReducer} from "./Cart/cartReducer";
import {userDetailsReducer, userListReducer, userLoginReducer} from './User/userReducer'
import {orderDetailsReducer, orderListReducer, orderPlaceReducer} from "./Order/orderReducer";


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userLoginReducer,
    userDetails: userDetailsReducer,
    placedOrder: orderPlaceReducer,
    singleOrder: orderDetailsReducer,
    orderList: orderListReducer,
    userList: userListReducer
})

const cartItemsFromLocal = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const shippingAddressFromLocal = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const paymentMethodFromLocal = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : {}


const userInfoFromLocal = localStorage.getItem('UserInfo') ?
    JSON.parse(localStorage.getItem('UserInfo')) : null


const initialState = {
    cart: {
        cartItems: cartItemsFromLocal,
        shippingAddress: shippingAddressFromLocal,
        paymentMethod: paymentMethodFromLocal
    },
    user: {userInfo: userInfoFromLocal}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store