import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails} from "../Redux/Product/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {addToCart} from "../Redux/Cart/cartActions";
import ProductReviews from "../components/ProductReviews";


const ProductScreen = ({match}) => {
    const [quantity, setQuantity] = useState(1);
    const [viewMessage, setViewMessage] = useState(false);


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [match, dispatch]);

    useEffect(() => {
        setTimeout(() => setViewMessage(false), 2000);
    }, [viewMessage])

    const addToCartHandler = async () => {
        await dispatch(addToCart(match.params.id, quantity))
        setViewMessage(true)
    }

    return (
        <div>
            <Link className={'btn btn-light my-3'} to="/">Go back</Link>
            {viewMessage && <Message variant={'success'}>Product Added Successfully</Message>}
            {

                loading ? <Loader/>
                    : error ? <Message variant={'danger'}/> :
                    product && <>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant={'flush'}>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating rating={product.rating} reviewCount={product.numReviews}/>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: ${product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant={'flush'}>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col><strong>${product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className={'btn-block'} type="button"
                                                disabled={product.stock <= 0}>
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>

                                        {
                                            product.stock > 0 ? (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Quantity</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as={'select'}
                                                                value={quantity}
                                                                onChange={(e) => setQuantity(Number(e.target.value))}
                                                            >
                                                                {
                                                                    [...Array(product.stock).keys()]
                                                                        .map(x => (
                                                                            <option value={x + 1} key={x + 1}>
                                                                                {x + 1}
                                                                            </option>
                                                                        ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ) : ''
                                        }

                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <ProductReviews id={match.params.id} reviews={product.reviews}/>
                    </>
            }


        </div>
    )
}

export default ProductScreen