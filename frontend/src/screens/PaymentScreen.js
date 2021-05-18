import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import {savePaymentMethod} from "../Redux/Cart/cartActions";


const PaymentScreen = ({history}) => {

    const dispatch = useDispatch()
    const {shippingAddress} = useSelector(state => state.cart)

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>


                <Form.Group controlId='country'>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type='radio'
                            name='payment'
                            label='paypal or credit card'
                            id='paypal'
                            value='PayPal'
                            checked = {paymentMethod === 'PayPal'}
                            onClick={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        <Form.Check
                            type='radio'
                            name='payment'
                            label= 'Stripe'
                            id= 'Stripe'
                            checked = {paymentMethod === 'Stripe'}
                            value= 'Stripe'
                            onClick={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>


                <Button type='submit' variant={'primary'}>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
};

export default PaymentScreen;