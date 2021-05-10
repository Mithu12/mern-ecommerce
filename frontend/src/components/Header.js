import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => (
    <header>
        <Navbar bg="dark" variant={"dark"} expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>tech shop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link href><i className={'fa fa-shopping-cart'}/> cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link><i className={'fa fa-user'}/> login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
);

export default Header;

