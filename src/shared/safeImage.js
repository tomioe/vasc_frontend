import React from 'react'
import { Card } from 'react-bootstrap'
import AdaptiveImage from 'react-adaptive-image';

export const safeImage = (productObject, holderWidth, cb) => {
    let imagePath = productObject["imageName"];
    if(imagePath) {
        // TODO: Get rid of this trashy plugin...
        return <AdaptiveImage width={holderWidth} className="product-image" fileName={imagePath} onShow={cb} />;
    } else {
        return <Card.Img className="ProductImage" variant="top" data-src="holder.js/100px280" />;
    }
};