import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import Client from 'shopify-buy';
import store from './App/store';
import { Provider } from 'react-redux';
//import './styles/shopify.css';

// build shopify client
const client = Client.buildClient({
  storefrontAccessToken: '5ed1d6a4382088fd21f8c6edc60a8398',
  domain: 'rapturefashion.myshopify.com'
});


store.dispatch({ type: 'CLIENT_CREATED', payload: client });

// buildClient() is synchronous, so we can call all these after!
client.product.fetchAll().then((res) => {
  console.log(res);
  store.dispatch({ type: 'PRODUCTS_FOUND', payload: res });
});
client.checkout.create().then((res) => {
  store.dispatch({ type: 'CHECKOUT_FOUND', payload: res });
});
client.shop.fetchInfo().then((res) => {
  store.dispatch({ type: 'SHOP_FOUND', payload: res });
});


ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
