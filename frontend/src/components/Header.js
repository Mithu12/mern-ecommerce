import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";

import {logout} from "../Redux/User/userActions";
import {useHistory} from "react-router";
import SearchBox from "./SearchBox";

const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const {loading, error, userInfo} = user

    const Logout = () => {
        dispatch(logout())
        history.push('/login')
    }

    return <header>
        <Navbar bg="dark" variant={"dark"} expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>tech shop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                    <SearchBox/>

                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link href><i className={'fa fa-shopping-cart'}/> cart</Nav.Link>
                        </LinkContainer>
                        {
                            userInfo ?
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                        <NavDropdown.Item onClick={() => dispatch(Logout)}>
                                            Logout
                                        </NavDropdown.Item>
                                </NavDropdown>
                                :
                            <LinkContainer to="/login">
                                <Nav.Link><i className={'fa fa-user'}/> login</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            userInfo && userInfo.isAdmin && (
                                <NavDropdown title= 'admin' id='admin'>
                                    <LinkContainer to='/admin/users/list'>
                                        <NavDropdown.Item>
                                            User List
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/products/list'>
                                        <NavDropdown.Item>
                                            Products List
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orders/list'>
                                        <NavDropdown.Item>
                                            Orders List
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
};

export default Header;

