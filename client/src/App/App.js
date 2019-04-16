import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import routes from './routes';
import Header from './common/components/Header'
import Footer from './common/components/Footer'
import Cart from './shopify/Cart';
import { connect } from 'react-redux';

class App extends Component {
  // Provider is for redux store
  // connectedrouter is for history & router
  // header is always on top of hte page
  // routes is whatever routes.js brings back
  // footer is always on the bottom of the page
  render() {
 
    return (
  
        <ConnectedRouter history={history}>
          <div className="App">
            <Header />
            <div className="wrap">
              {routes}
            </div>
            <Footer />
          </div>
        </ConnectedRouter>
  
    );
  }
}


export default connect((state) => state)(App);