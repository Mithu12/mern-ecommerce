import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createProduct, getProductDetails, listProducts, updateProduct} from "../Redux/Product/productActions";
import {useDispatch, useSelector} from "react-redux";

const AddProductModal = ({setNewProduct, update, id}) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [numReviews, setNumReviews] = useState(0);
    const [description, setDescription] = useState('');

    const {product} = useSelector(state => state.productDetails)

    const handleClose = () => {
        setShow(false)
        setNewProduct(false)
    };

    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getProductDetails(id))

        }
        getDetails()
    }, [dispatch]);

    useEffect(() => {
        if (update && product)
        {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setStock(product.stock)
            setNumReviews(product.numReviews)
            setDescription(product.description)

        }
    }, [product]);



    const addHandler = async () => {

        await dispatch(createProduct({
            name,
            price,
            image,
            brand,
            category,
            stock,
            numReviews,
            description
        }))
        setShow(false)
        setNewProduct(false)
    };

    const updateHandler = async () => {

        await dispatch(updateProduct(id,{
            name,
            price,
            image,
            brand,
            category,
            stock,
            numReviews,
            description
        }))
        setShow(false)
        setNewProduct(false)
        dispatch(listProducts())
    };

    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>

                <Modal.Title> <span style={{
                    color: "red"
                }}>Add product</span></Modal.Title>

            </Modal.Header>
            <Modal.Body>

                <Form>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="price"
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                    </Form.Group>



                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="image"
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="brand"
                            value={brand}
                            onChange={(e)=>setBrand(e.target.value)}
                        />
                    </Form.Group>



                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="category"
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="stock"
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                        />
                    </Form.Group>



                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>numReviews</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="numReviews"
                            value={numReviews}
                            onChange={(e)=>setNumReviews(Number(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </Form.Group>


                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={update ? updateHandler : addHandler}>
                    {update ? 'update' : 'Add'} product
                </Button>
            </Modal.Footer>

        </Modal>
    )
};

export default AddProductModal;