import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./Product/productReducers";
import {cartReducer} from "./Cart/cartReducer";
import {userDetailsReducer, userLoginReducer} from './User/userReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userLoginReducer,
    userDetails: userDetailsReducer
})

const cartItemsFromLocal = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromLocal = localStorage.getItem('UserInfo') ?
    JSON.parse(localStorage.getItem('UserInfo')) : null


const initialState = {
    cart: {cartItems: cartItemsFromLocal},
    user: {userInfo: userInfoFromLocal}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store