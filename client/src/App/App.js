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
  constructor() {
    super();
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
    this.handleCartOpen = this.handleCartOpen.bind(this);
  }
  updateQuantityInCart(lineItemId, quantity) {
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]
    state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      store.dispatch({ type: 'UPDATE_QUANTITY_IN_CART', payload: { checkout: res } });
    });
  }
  removeLineItemInCart(lineItemId) {
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id
    state.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      store.dispatch({ type: 'REMOVE_LINE_ITEM_IN_CART', payload: { checkout: res } });
    });
  }
  handleCartClose() {
    store.dispatch({ type: 'CLOSE_CART' });
  }
  handleCartOpen() {
    store.dispatch({ type: 'OPEN_CART' });
  }

  // Provider is for redux store
  // connectedrouter is for history & router
  // header is always on top of hte page
  // routes is whatever routes.js brings back
  // footer is always on the bottom of the page
  render() {
    const state = store.getState().home.cart; // state from redux store
    console.log("state!!!", state);
    return (
  
        <ConnectedRouter history={history}>
          <div className="App">
            <Header />
            <div className="wrap">
            <Cart
                checkout={state.checkout}
                isCartOpen={state.isCartOpen}
                handleCartClose={this.handleCartClose}
                updateQuantityInCart={this.updateQuantityInCart}
                removeLineItemInCart={this.removeLineItemInCart}
              />
            
              {routes}
            </div>
            <Footer />
          </div>
        </ConnectedRouter>
  
    );
  }
}


export default connect((state) => state)(App);