import React, { useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";



export default function ProductCard(props) {

    // enable 'holder.js'
    useEffect(() => {
        window.enableHolder();
    }, []);


    // <img src={require('./logo.jpeg')} />
    return (
        <Card style={{ width: '20rem', margin: '0.5rem' }}>
            <a href={'/product/' + props.product["_id"]}>
                <Card.Img className="ProductImage" variant="top" data-src="holder.js/100px280" />
            </a>
            <Card.Body>
                <Card.Title><b>{props.product["name"]}</b></Card.Title>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col>{props.product["prices"][0]["vendor"]}</Col>
                    <Col className="text-right">
                        <a href={'/product/' + props.product["_id"]}>
                            {props.product["prices"][0]["price"]}
                        </a>
                    </Col>
                </Row>
                <ProductButton productId={props.product["_id"]} />
            </Card.Body>
        </Card>
    )
    
}


function ProductButton(buttonProps) {
    const history = useHistory();
  
    function handleClick() {
        history.push(`/product/${buttonProps.productId}`);
    }
  
    return (
      <Button type="button" onClick={handleClick}>
        See Details
      </Button>
    );
}