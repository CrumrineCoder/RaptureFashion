import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import Client from 'shopify-buy';

const client = Client.buildClient({
    storefrontAccessToken: 'your-access-token',
    domain: 'your-shopify-url.myshopify.com'
});

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
