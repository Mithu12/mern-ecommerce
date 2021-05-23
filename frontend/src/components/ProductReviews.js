import React, {useState} from 'react';
import {Button, Col, Form, ListGroup, Row} from "react-bootstrap";
import Message from "./Message";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import {useDispatch, useSelector} from "react-redux";
import {reviewProduct} from "../Redux/Product/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from "../Redux/Product/productConstants";
import Loader from "./Loader";

const ProductReviews = ({id, reviews}) => {

    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.user)
    const productDetails = useSelector(state => state.productDetails)
    const {reviewSuccess, reviewMessage, reviewError, reviewLoading} = productDetails

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const submitHandler =async (e) => {
        e.preventDefault()
        await dispatch(reviewProduct(id,{rating, comment}))
        setComment('')
        setRating(0)
    }

    const messageReset = () => {
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }


    return (
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                { reviews.length === 0 && (
                    <Message>No Reviews</Message>
                )}
                <ListGroup variant="flush">
                    {reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating} />
                            <p>{review.createdAt && review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {
                            reviewLoading && <Loader/>
                        }
                        {
                            reviewSuccess && <Message variant="success" flash={messageReset}>
                                {reviewMessage}
                            </Message>
                        }
                        {
                            reviewError && <Message variant="danger" flash={messageReset}>
                                {reviewError}
                            </Message>
                        }
                        {
                            userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as="select"
                                                      value={rating}
                                                      onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="">
                                                Select...
                                            </option>
                                            <option value="1">
                                                1- Poor
                                            </option>
                                            <option value="2">
                                                2- Fair
                                            </option>
                                            <option value="3">
                                                3- Good
                                            </option>
                                            <option value="4">
                                                4- Very Good
                                            </option>
                                            <option value="5">
                                                5- Excellent
                                            </option>

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as="textarea" row={3} value={comment}
                                                      onChange={(e) => setComment(e.target.value)}>

                                        </Form.Control>
                                    </Form.Group>
                                    <Button type="submit" variant="primary">Submit</Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to="/login">Sign In</Link> to write a review
                                </Message>
                            )
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )

}
export default ProductReviews;