import React, { useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

// import AdaptiveImage from 'react-adaptive-image';
import { redirectToClickURL } from '../shared/clickURL'

export default function ProductCard(props) {

    // enable 'holder.js'
    useEffect(() => {
        window.enableHolder();
    }, []);

    // sometimes we get an image from the server. helper function to determine
    // whether we need a placeholder, or can load the image as is
    // TODO: Would be nice to show images without a watermark...
    // const determineImageSrc = (dataSrc) => {
    //     // dataSrc = false;
    //     return dataSrc ? <AdaptiveImage width={300} className="card-img-top"  variant="top" fileName={props.product["imageName"]} /> : <Card.Img className="ProductImage" variant="top" data-src="holder.js/100px280" />
    // }

    return (
        <Card style={{ width: '20rem', margin: '0.5rem' }}>
            <a href={'/product/' + props.product["_id"]}>
                {/* {determineImageSrc(props.product["imageName"])*/}
                <Card.Img className="ProductImage" variant="top" data-src="holder.js/100px280" />
            </a>
            <Card.Body>
                <Card.Title><a href={'/product/' + props.product["_id"]}><b>{props.product["name"]}</b></a></Card.Title>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col>{props.product["prices"][0]["vendor"]}</Col>
                    <Col className="text-right">
                        <a href={props.product["prices"][0]["link"]} onClick={(e) => {redirectToClickURL(e, props.product["prices"][0]["link"])}}>
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