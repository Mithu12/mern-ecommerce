import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../Redux/Cart/cartActions";


const ShippingScreen = ({history,}) => {

    const dispatch = useDispatch()
    const {shippingAddress} = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <h1>shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        value={address}
                        placeholder='enter address'
                        onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        value={city}
                        placeholder='enter city'
                        onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='postal-code'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        type='text'
                        value={postalCode}
                        placeholder='enter postal code'
                        onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        value={country}
                        placeholder='enter country'
                        onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>


                <Button type='submit' variant={'primary'}>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
};

export default ShippingScreen;