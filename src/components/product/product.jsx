import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function Product() {
  let match = useRouteMatch();
  
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
  return <h3>Requested product ID: {productId}</h3>;
}