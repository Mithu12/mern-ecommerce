import React, {useEffect, useState} from "react";
import { LinkContainer } from "react-router-bootstrap";
import {Table, Button, Row, Col, Modal} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import {
    listProducts,
    deleteProduct,
    createProduct,
} from "../Redux/Product/productActions";
import { PRODUCT_LIST_RESET } from "../Redux/Product/productConstants";

const ProductListScreen = ({history}) => {

    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setId('')
        setShow(false)
    };
    const handleShow = (id, email) => {
        setId(id)
        setShow(true)
    };

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.user)

    const productList = useSelector(state => state.productList)
    const {loading, error, products, removed} = productList

    useEffect(() => {
        if(!userInfo.isAdmin)
            history.push('/login')
    }, [dispatch]);

    useEffect(() => {
        if (products && products.length === 0)
            dispatch(listProducts())
    }, [products]);


    const createProductHandler = async () => {
        setMessage('create')
        console.log('create')
    }
    const confirmHandler = async (id) => {
        handleShow()
        setId(id)
    }
    const deleteHandler = async () => {
        handleClose()
        await dispatch(deleteProduct(id))
        dispatch(listProducts())
    }

    const resetHandler = (none) => {
        dispatch({type: PRODUCT_LIST_RESET })
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {message && <Message variant="success" flash={setMessage}>{message}</Message>}
            {removed && <Message variant="success" flash={resetHandler}>Successfully Removed</Message>}
            {error && <Message variant="danger">{error}</Message>}

            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>

                                <Modal.Title> <span style={{
                                    color: "red"
                                }}>Warning</span></Modal.Title>

                            </Modal.Header>
                            <Modal.Body>Remove User {id}!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={deleteHandler}>
                                    Yes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        {products &&
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => confirmHandler(product._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {/*<Paginate pages={pages} page={page} isAdmin={true}/>*/}
                </>
            )}
        </>
    )
};

export default ProductListScreen;