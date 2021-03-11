import React, { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router-dom";
import { Card, Container, Jumbotron, Spinner, Table } from "react-bootstrap"
import AdaptiveImage from 'react-adaptive-image';

import ModalComponent from '../components/modal-comp'

import { redirectToClickURL } from '../shared/clickURL'
import { API_BASE_URL } from '../shared/apiConfiguration'


const Product = () => {
  // enable "holder.js"
  useEffect(() => {
    window.enableHolder();
  }, []);

  let pageHistory = useHistory();

  // extract the product ID
  let urlMatch = useRouteMatch('/product/:productId');
  let urlProductId = urlMatch.params.productId;

  const [product, setProduct] = useState({});
  const [productPrices, setProductPrices] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [modalShowing, setModalShowing] = useState(false);
  const [modalData, setModalData] = useState([]);


  // helper methods to ease modal handling
  const handleCloseModal = () => setModalShowing(false);
  const handleShowModal = () => setModalShowing(true);

  // Helper function for retrieving API data
  const getProduct = async () => {
    const request = await fetch(`${API_BASE_URL}/product/${urlProductId}`, {
      headers: {
        'accept': 'application/json'
      }
    }).catch((e) => {
      setModalData({
        title: 'API Error',
        body: 'API Response resulted in an error during "product" lookup.'
      });
      handleShowModal();
      console.log("[VASC] Network error during API 'product' request.")
    });
    if (!request) {
      return null;
    }
    const productData = await request.json();
    return productData;
  }

  useEffect(() => {
    const loadProduct = async () => {
      setIsSearching(true);
      const apiProduct = await getProduct();
      if (apiProduct) {
        setProduct(apiProduct[0]);
        //&console.log(apiProduct[0]);
        if (apiProduct[0]["prices"]) {
          setProductPrices(apiProduct[0]["prices"])
        }
      } else {
        // good time to show a modal, or call out an error  
        setModalData({
          title: 'API Error',
          body: 'API product request failed.'
        })
        handleShowModal();
        setProduct([]);
      }
      setIsSearching(false);
    }
    loadProduct();
  }, [urlProductId]);

  // Helper function to render product data
  let productImage = product["imageName"] ?
      <AdaptiveImage width={300} fileName={product["imageName"]} />
    : <Card.Img className="ProductImage" variant="top" data-src="holder.js/100px280" />;

  
  let productTable = productPrices.map((priceData, index) => {
    return (
      <tr key={index}>
        <td><a href={priceData.link} onClick={(e) => {redirectToClickURL(e, priceData.link)}}>{priceData.vendor}</a></td>
        <td><a href={priceData.link} onClick={(e) => {redirectToClickURL(e, priceData.link)}}>{priceData.price}</a></td>
      </tr>
    )
  })

  return (
    <>
      <ModalComponent
        show={modalShowing}
        handleClose={handleCloseModal}
        title={modalData.title}
        body={modalData.body}
      />
      <Jumbotron>
        <Container id="product-spinner-containter">
          <Spinner animation="border" variant="primary" className={!isSearching && "invisible"} />
        </Container>
        <Container id="product-container" className={isSearching && "invisible"}>
          <h2>{product["name"]}</h2>
          <br />
          {/* <p><b>Requested product ID: {urlProductId}</b></p> */}
          { productImage }
          <br />
          <br />
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              { productTable }
            </tbody>
          </Table>
          <br />
          <button onClick={() => pageHistory.goBack()} className={pageHistory.length>1 ? undefined : "invisible"}>Back</button> 
        </Container>
      </Jumbotron>
    </>
  );
};

export default Product;