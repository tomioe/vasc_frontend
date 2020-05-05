import React, { useState, useEffect, useRef } from 'react'
import { Form, Container, Jumbotron, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import ProductCard from '../product-card/product-card'

import API_BASE_URL from '../../shared/apiConfiguration'

export default function Search() {
    // Extract the "q" URL parameter
    let urlParameters = window.location.search;
    let parsedParameters = new URLSearchParams(urlParameters);
    let searchQuery = parsedParameters.get('q') || '';
    
    // Initial state for "query" and "API" objects
    const [query, setQuery] = useState(searchQuery);
    const [products, setProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Create reference for Search Input
    const focusSearch = useRef(null);

    // Focus on Search Input
    useEffect(() => {
        focusSearch.current.focus()
    }, []);

    // Helper function for retrieving API data
    const getProducts = async (query) => {
        const request = await fetch(`${API_BASE_URL}/search?q=${query}`, {
            headers: {
                'accept': 'application/json'
            }
        }).catch((e) => {
            console.log("Network error during API request.")
        });
        const productData = await request.json();
        return productData;
    }

    // Prevent render filckering as user types in Search Input
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Helper function to list products
    // TODO: Implement with Cards instead, https://react-bootstrap.github.io/components/cards/
    let productComponents = products.map((product, index) => {
        return (
            <ProductCard product={product} key={index} />   
        )
    })

    // Define the "history" object, so we can update the url 
    const history = useHistory();

    // useEffect - Only renders when "query" is changed
    useEffect(() => {
        let currentQuery = true;
        const controller = new AbortController();
        const loadProducts = async () => {
            if (!query)
                return setProducts([]);
            
            history.push({
                pathname: '/search',
                search: '?q='+query
            })

            await sleep(350);
            
            if (currentQuery) {
                setIsSearching(true);
                const products = await getProducts(query, controller);
                setProducts(products);
                setIsSearching(false);
            }
            
        }
        
        loadProducts();

        return () => {
            currentQuery = false;
            controller.abort();
        }
    }, [query, history]);



    // RENDER COMPONENT
    return (
        <>
            <Jumbotron fluid>
                
                <Form id="search-form">
                    <h4>Product Search</h4>
                    <Form.Control
                        required
                        placeholder="Enter product name..."
                        ref={focusSearch}
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <Spinner animation="border" variant="primary" className={!isSearching && "invisible"} />
                </Form>
                <Container fluid>
                    <Row>
                        {productComponents}
                    </Row>
                </Container>
            </Jumbotron>
        </>
    )
}