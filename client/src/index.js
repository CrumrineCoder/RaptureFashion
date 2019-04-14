import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import Client from 'shopify-buy';
import store from "./App/store";

// build shopify client
const client = Client.buildClient({
    storefrontAccessToken: 'YOUR_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
    domain: 'YOUR_MYSHOPIFY_STORE_URL'
});
store.dispatch({type: 'CLIENT_CREATED', payload: client});

// buildClient() is synchronous, so we can call all these after!
client.product.fetchAll().then((res) => {
  store.dispatch({type: 'PRODUCTS_FOUND', payload: res});
});
client.checkout.create().then((res) => {
  store.dispatch({type: 'CHECKOUT_FOUND', payload: res});
});
client.shop.fetchInfo().then((res) => {
  store.dispatch({type: 'SHOP_FOUND', payload: res});
});

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
