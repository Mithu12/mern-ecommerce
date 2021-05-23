import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {searchProducts} from "../Redux/Product/productActions";
import Loader from "./Loader";
import {PRODUCT_SEARCH_RESET} from "../Redux/Product/productConstants";

const SearchBox = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {suggestions, loading, error} = useSelector(state => state.productSearch)

    const [text, setText] = useState('');

    const submitHandler = (e, id) => {
        e.preventDefault()
        history.push('/product/' + id)
    }

    const fetchProducts = (name) => {
        dispatch(searchProducts(name))
    }

    const productPage = (id) => {
        history.push('/product/' + id)
        dispatch({type: PRODUCT_SEARCH_RESET})
        setText('')
    }


    return (
        <div style={{
            position: 'relative'
        }
        }>
            <Form onSubmit={submitHandler} inline>
                <div className="autocomplete">
                    <Form.Control
                        type="text"
                        name="q"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                            fetchProducts(e.target.value)
                        }}
                        placeholder="Search Products"
                        className="mr-sm-2 ml-sm-5"
                        list="wizards-list"
                        autocomplete="off"

                    ></Form.Control>
                </div>


                {suggestions && <div style={{
                    position: 'absolute',
                    top: '50px',
                    left: '0',
                    background: 'white',
                    zIndex: '100',
                }}>
                    {loading && <Loader/>}
                    {error && <p>{error}</p>}

                    <ul style={{
                        listStyle: 'none',

                    }}>

                        {suggestions.map((p, index) => <li
                            onClick={() => {
                                productPage(p._id)
                            }}
                            key={p._id}
                            value={p.name}
                            style={{
                                padding: '5px',
                                cursor: 'pointer',
                                borderBottom: '1px solid black'
                            }}
                        >{p.name}</li>)}
                    </ul>
                </div>
                }


                {/* <ul>{suggestions && suggestions.map((p, index) => <li>{p.name}</li>)}</ul> */}

                <Button type="submit" variant="outline-success" className="p-2">
                    Search
                </Button>
            </Form>
        </div>
    )
};

export default SearchBox;