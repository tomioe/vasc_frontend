import React, { useState, useEffect, useRef } from 'react'
import { Form, Container, Jumbotron, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import ProductCard from '../product-card/product-card'

import {API_BASE_URL} from '../../shared/apiConfiguration'

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
    const searchProducts = async (query) => {
        const request = await fetch(`${API_BASE_URL}/search?q=${query}`, {
            headers: {
                'accept': 'application/json'
            }
        }).catch((e) => {
            console.log("[VASC] Network error during API 'search' request.")
        });
        if(!request) {
            return null;
        }
        const productData = await request.json();
        return productData;
    }

    // Prevent render filckering as user types in Search Input
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Helper function to list products
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
                const products = await searchProducts(query, controller);
                if(products) 
                    setProducts(products);
                else {
                    // good time to show a modal, or call out an error  
                    // https://react-bootstrap.github.io/components/alerts/
                    setProducts([]);
                }
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
                <Form id="search-form" onSubmit={(e) => e.preventDefault()}>
                    <h4>Product Search</h4>
                    <Form.Control
                        placeholder="Enter product name..."
                        ref={focusSearch}
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        disabled={isSearching}
                    />
                    <Spinner animation="border" variant="primary" className={!isSearching && "invisible"} />
                </Form>
                <Container>
                    <Row>
                        {productComponents}
                    </Row>
                </Container>
            </Jumbotron>
        </>
    )
}