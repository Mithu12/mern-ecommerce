import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {singleOrderDetails} from "../Redux/Order/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const OrderDetailsScreen = ({match}) => {
    const dispatch = useDispatch()
    const {orderDetails, error, loading} = useSelector(state => state.singleOrder)

    if (!loading && !error)
        orderDetails.itemsPrice = orderDetails.orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity
            , 0)


    useEffect(() => {
        const getSingleOrder = async () => {
            await dispatch(singleOrderDetails(match.params.id))
        }
        getSingleOrder()
    }, [dispatch]);


    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <h1>Order {orderDetails._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: {orderDetails.user.name}</strong>
                            </p>
                            <p>
                                <strong>Email: </strong>{" "}
                                <a href={`mailto: ${orderDetails.user.email}`}> {orderDetails.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}{" "}
                                {orderDetails.shippingAddress.postalCode}{" "}
                                {orderDetails.shippingAddress.country}
                            </p>
                            {orderDetails.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {orderDetails.DeliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {orderDetails.paymentMethod}
                            </p>
                            {orderDetails.isPaid ? (
                                <Message variant="success">Paid on {orderDetails.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {orderDetails.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {orderDetails.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x ${item.price} =
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${orderDetails.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${orderDetails.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${orderDetails.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${orderDetails.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderDetailsScreen;