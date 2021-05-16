import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {register} from "../Redux/User/userActions";
import FormContainer from "../components/FormContainer";

const SignUpScreen = ({location, history}) => {
    const initState = ''
    const [name, setName] = useState(initState);
    const [email, setEmail] = useState(initState);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(initState);

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
        if (password === confirmPassword)
            await dispatch(register(name, email, password))
        else
            setMessage('Password does not match')

    }


    return (
        <FormContainer>
            <h1>
                Sing Up
            </h1>
            { message && <Message variant='danger' flash={setMessage} >{message}</Message> }
            { error && <Message variant='danger'>{error}</Message> }
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='enter name'
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
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
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant={'primary'}>
                    Sign up
                </Button>

                <Row className={'py-3'}>
                    <Col>
                        Have an account? {' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Login
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
};

export default SignUpScreen;