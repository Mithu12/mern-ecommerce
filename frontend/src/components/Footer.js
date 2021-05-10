import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; Mithu
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;