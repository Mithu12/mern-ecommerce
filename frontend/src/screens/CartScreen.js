import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {addToCart, removeFromCart} from "../Redux/Cart/cartActions";


const CartScreen = () => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)


    const checkOutHandler = () => {

    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?
                    <Message>
                        Your Cart is Empty
                    </Message> :
                    (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item =>
                                    <ListGroup.Item key={item._id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as={'select'}
                                                    value={item.quantity}
                                                    onChange={(e) => dispatch(addToCart(item._id, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.stock).keys()]
                                                            .map(x => (
                                                                <option value={x + 1} key={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light'
                                                        onClick={() => dispatch(removeFromCart(item._id))}>
                                                    <i className='fa fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0 )}) items</h2>
                            ${cartItems
                            .reduce((acc, item) => acc + item.quantity * item.price, 0 ).toFixed(2)
                        }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length===0}
                                onClick={checkOutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
};

export default CartScreen;