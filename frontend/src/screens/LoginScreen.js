import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {login} from "../Redux/User/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({location, history}) => {
    const initState = ''
    const [email, setEmail] = useState(initState);
    const [password, setPassword] = useState(initState);

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const {loading, error, userInfo} = user

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if (userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(login(email, password))

    }


    return (
        <FormContainer>
            <h1>
                Sing in
            </h1>
            { error && <Message variant='danger'>{error}</Message> }
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='enter email'
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant={'primary'}>
                    Sign in
                </Button>

                <Row className={'py-3'}>
                    <Col>
                        New customer? {' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
};

export default LoginScreen;