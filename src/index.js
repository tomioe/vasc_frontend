import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';
import { initImages } from 'react-adaptive-image'

import { API_BASE_URL } from './shared/apiConfiguration'

initImages({
  imageResolver: function(image){
    console.log('width:' + image.width)
      return `${API_BASE_URL}/image/${image.fileName}/?w=${image.width}`
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
