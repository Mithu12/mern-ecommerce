import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {profile, update} from "../Redux/User/userActions";

const ProfileScreen = ({location, history}) => {
    const initState = ''
    const [name, setName] = useState(initState);
    const [email, setEmail] = useState(initState);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const {userInfo} = user

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, details, success} = userDetails


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (!details)
            dispatch(profile())
        else {
            setName(details.name)
            setEmail(details.email)
        }
    }, [dispatch, history, details])

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log('yoyo')
        if (password === confirmPassword){
            dispatch(update(name, email, password))
            setMessage({success: 'Updated', error: ''})
        }
        else
            setMessage({success: '', error: 'Password does not match'})

    }


    return (
        <>
            <h1 className='text-center my-3'>
                Sing Up
            </h1>
            <Row>
                <Col md={3}>
                    {message.error && <Message variant='danger' flash={setMessage}>{message.error}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {(success && message.success) && <Message variant='success' flash={setMessage}>Updated Successfully</Message>}
                    {loading && <Loader/>}
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                placeholder='enter name'
                                onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type='email'
                                value={email}
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
                            Update
                        </Button>
                    </Form>
                </Col>

            </Row>
        </>
    )
};

export default ProfileScreen;