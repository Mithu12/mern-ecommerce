import React, {useEffect} from 'react';
import {Button, Col, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import Message from "./Message";
import Loader from "./Loader";
import {useDispatch, useSelector} from "react-redux";
import {orderList, adminOrderList} from "../Redux/Order/orderActions";

const OrderList = ({admin}) => {

    const dispatch = useDispatch()
    const {orders, error, loading} = useSelector(state => state.orderList)

    useEffect(() => {
        if (admin){
            dispatch(adminOrderList())
        }
        else
            dispatch(orderList())
    }, [dispatch]);


    return (
        <Col md={9}>
            <h2>My orders</h2>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        {admin ? <th>Name</th> : ''}
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders && orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            {admin ? <td>{order.user && order.user.name}</td> : ''}
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <i className="fas fa-times" style={{color: "red"}}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (
                                    <i className="fas fa-times" style={{color: "red"}}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                    <Button className="btn-sm" variant="light">Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Col>
    )
};

export default OrderList;