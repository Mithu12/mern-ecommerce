import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {Fragment} from "react";

import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, updateUserDetails} from "../Redux/User/userActions";
import {ADMIN_USER_PROFILE_RESET} from "../Redux/User/userConstants";


const UserEditScreen = ({match, history}) => {
    const userId = match.params.id;

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetailsByAdmin);
    const {loading, error, user} = userDetails;


    useEffect(() => {
        const getDetails = async () => {

            await dispatch(getUserDetails(userId))
        }
        if (!user || user.id !== userId)
            getDetails()



    }, [dispatch, userId]);

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user]);



    const submitHandler = async (e) => {
        e.preventDefault();

        await dispatch(updateUserDetails(user._id,{ name, email, isAdmin}))
        history.push('/admin/users/list')
    };

    return (
        <Fragment>
            <Link to="/admin/users/list" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {/*{loadingUpdate && <Loader/>}*/}
                {/*{errorUpdate && <Message>{errorUpdate}</Message>}*/}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="isadmin">

                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </Fragment>
    );
};

export default UserEditScreen;