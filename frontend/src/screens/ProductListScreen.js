import React, {useEffect, useState} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import {
    listProducts,
    deleteProduct,
    createProduct,
} from "../Redux/Product/productActions";
import {PRODUCT_LIST_RESET} from "../Redux/Product/productConstants";
import AddProductModal from "../components/AddProductModal";

const ProductListScreen = ({history, location}) => {

    const page = location.search && location.search.split('=')[1]

    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const [newProduct, setNewProduct] = useState(false);
    const [updateProduct, setUpdateProduct] = useState(false);

    const handleClose = () => {
        setId('')
        setShow(false)
    };
    const handleShow = (id) => {
        setId(id)
        setShow(true)
    };

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.user)

    const productList = useSelector(state => state.productList)
    const {loading, error, products, removed, created, updated, pages, currentPage} = productList

    useEffect(() => {
        if (!userInfo.isAdmin)
            history.push('/login')
    }, [dispatch]);

    useEffect(() => {
        if (products && products.length === 0)
            dispatch(listProducts(page))
    }, [products, page]);

    useEffect(()=>{
        dispatch(listProducts(page))
    }, [page])

    const createProductHandler = async () => {
        setUpdateProduct(false)
        setNewProduct(true)
    }


    const updateProductHandler = async (id) => {
        setId(id)
        setUpdateProduct(true)
        setNewProduct(true)
    }

    const confirmHandler = async (id) => {
        handleShow()
        setId(id)
    }
    const deleteHandler = async () => {
        handleClose()
        await dispatch(deleteProduct(id))
        // dispatch(listProducts())
    }

    const resetHandler = (none) => {
        dispatch({type: PRODUCT_LIST_RESET})
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
            {created && <Message variant="success" flash={resetHandler}>Successfully Added new product</Message>}
            {updated && <Message variant="success" flash={resetHandler}>Successfully updated product</Message>}
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
                            <th>image</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
{/*// ==== product add/update modal*/}
                        {
                            newProduct && <AddProductModal
                                id={id}
                                update={updateProduct}
                                setNewProduct={setNewProduct}
                            />
                        }


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
                                <td><img src={`http://localhost:3000${product.image}`} width={'100px'} alt="..."/></td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Button variant="light" className="btn-sm"
                                            onClick={() => updateProductHandler(product._id)}>
                                        <i className="fas fa-edit"></i>
                                    </Button>
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
                    <Paginate pages={pages} page={currentPage} path={'/admin/products/list'}/>
                </>
            )}
        </>
    )
};

export default ProductListScreen;