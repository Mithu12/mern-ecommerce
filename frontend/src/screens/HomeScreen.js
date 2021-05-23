import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProducts} from "../Redux/Product/productActions";
import Paginate from "../components/Paginate";
import TopProductCarousel from "../components/TopProductCarousel";

const HomeScreen = ({location}) => {
    const dispatch = useDispatch()

    const page = location.search && location.search.split('=')[1]

    const productList = useSelector(state => state.productList)
    const {loading, error, products, pages, currentPage} = productList

    useEffect(() => {
        dispatch(listProducts(page))
    }, [dispatch, page]);

    return (
        <div>
            <TopProductCarousel/>
            <h1>Latest Products</h1>
            {
                loading ? <Loader/>
                    : error ? <Message variant={'danger'}>{error}</Message> :
                    <>
                        <Row>
                            {products && products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={currentPage}/>
                    </>
            }

        </div>
    )
}

export default HomeScreen