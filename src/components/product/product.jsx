import React, { useEffect, useState } from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    useParams,
} from "react-router-dom";

import { Container, Jumbotron, Row, Spinner, Table } from 'react-bootstrap'

export default function Product() {
    let match = useRouteMatch();

    // enable 'holder.js'
    useEffect(() => {
        window.enableHolder();
    }, []);


    return (
        <div>

            {/* The Product page has its own <Switch> with more routes
          that build on the /product URL path. You can think of the
          2nd <Route> here as an "index" page for all products, or
          the page that is shown when no product is selected */}
            <Switch>
                <Route path={`${match.path}/:productId`}>
                    <ProductEntry />
                </Route>
                <Route path={match.path}>
                    <h3>Invalid product ID.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function ProductEntry() {

    let { productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const dummyData = [
        {
            name: "Mod1",
            prices: [
                {vendor: 'Vendor1', price: '1234', link: 'http://www.vendor1.com/store/items/mod1'},
                {vendor: 'Vendor2', price: '1234', link: 'http://www.vendor2.com/product?id=mod1'},
            ]
        }
    ]
    let productRows = dummyData[0]["prices"].map((priceEntry, index) => {
        console.log(priceEntry)
        return ( 
            <tr>
                <td key={index}><a href={priceEntry.link}>{priceEntry.vendor}</a></td>
                <td key={index}><a href={priceEntry.link}>{priceEntry.price}</a></td>
            </tr>
        )
    })

    return (
        <>
            <Jumbotron>
                <Container id="product-container">
                    <Spinner animation="border" variant="primary" className={!isLoading && "invisible"} />
                    <img className="ProductImage" src="holder.js/100px280" alt={"Product of " + productId} />
                    <p><b>Requested product ID: {productId}</b></p>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Vendor Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productRows}
                        </tbody>
                    </Table>
                </Container>
            </Jumbotron>
        </>
    );
}