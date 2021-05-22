import React, {useEffect} from 'react';
import OrderList from "../components/OrderList";
import {useSelector} from "react-redux";
const OrderListScreen = ({history}) => {

    const {userInfo} = useSelector(state => state.user)

    useEffect(() => {
        if (!userInfo.isAdmin)
            history.push('/')
    }, [userInfo]);



    return (
        <div>
            <OrderList admin/>
        </div>
    )
};

export default OrderListScreen;