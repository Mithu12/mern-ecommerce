import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

import Loader from "../components/Loader";
import Message from "../components/Message";
import {userList, userRemove} from "../Redux/User/userActions";

const UserListScreen = ({history}) => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const handleClose = () => {
        setEmail('')
        setId('')
        setShow(false)
    };
    const handleShow = (id, email) => {
        setEmail(email)
        setId(id)
        setShow(true)
    };

    const dispatch = useDispatch()
    const {users, loading, error} = useSelector(state => state.userList)
    const {userInfo} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(userList())
        if(!userInfo.isAdmin)
            history.push('/login')
    }, [dispatch]);


    const deleteHandler = async () => {
        await dispatch(userRemove(id))
        handleClose()
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader/> :

                error ? <Message variant="danger">{error}</Message>
                    : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>ADMIN</th>
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
                                <Modal.Body>Remove User {email}!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={deleteHandler}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                                    </td>
                                    <td>
                                        {user.isAdmin ? <i className="fas fa-check" style={{color: "green"}}></i> :
                                            (<i className="fas fa-times" style={{color: "red"}}></i>)}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm" onClick={() => handleShow(user._id, user.email)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
        </>
    )
};

export default UserListScreen;