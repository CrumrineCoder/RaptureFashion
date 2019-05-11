import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import { cartActions } from '../../_actions/cart.actions.js';
import BagRow from "../components/bagRow.js";
import BagSubtotal from "../components/bagSubtotal.js"
import { Link } from 'react-router-dom';
import store from '../../store';

/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class BagContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.removeItem = this.removeItem.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
        this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
        this.handleCartClose = this.handleCartClose.bind(this);
        this.handleCartOpen = this.handleCartOpen.bind(this);
    }
    updateQuantityInCart(lineItemId, quantity) {
        const state = store.getState().home.cart; // state from redux store
        const checkoutId = state.checkout.id
        const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]
        state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
            store.dispatch({ type: 'UPDATE_QUANTITY_IN_CART', payload: { checkout: res } });
        });
    }
    removeLineItemInCart(lineItemId) {
        const state = store.getState().home.cart; // state from redux store
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

    removeItem(itemName) {
        let filteredClothes = this.state.dresses.filter(function (obj) {
            return obj.name !== itemName;
        });
        //   let filteredClothes = this.state.dresses.splice(index-1, 1)
        this.setState({
            dresses: filteredClothes
        })
    }

    changeQuantity(index, num) {
        let clonedItems = this.state.dresses;
        clonedItems[index].quantity += num;
        this.setState({
            dresses: clonedItems
        })
    }

    render() {
        let pageContent = '';
        const state = store.getState().home.cart; // state from redux store
        let checkout = state.checkout;
        let isCartOpen = state.isCartOpen
        // this.props.cart
        pageContent = (
            <ul className="bagRows">
                {checkout.lineItems.map((line_item, i) => <BagRow changeQuantity={this.changeQuantity} product={state.products[i]} checkout={checkout} isCartOpen={isCartOpen} state={state} removeItem={this.removeItem} key={i} index={i} line_item={line_item} updateQuantityInCart={this.updateQuantityInCart} removeLineItemInCart={this.removeLineItemInCart}> </BagRow>)}
            </ul>
        )

        return (
            <div className="">
                <div className="bagHeader">
                    <Link className="bagHeaderLink" to={"/"}><i class="fas fa-arrow-left"></i> Continue Shopping</Link>
                    <h2 className="bagHeaderTitle">Your Shopping Bag </h2>
                </div>
                <div className="bagBody">
                    <div className="bagContHead">
                        <p className="bagItemHeader bagContHeader">Item</p>
                        <p className="bagPriceHeader bagContHeader">Price / Quantity / Subtotal</p>
                    </div>
                    {pageContent}
                </div>
                <div className="bagWarning">
                    <h4 className="bagWarningHeader">Note: the Checkout linked by the button would work if I linked a Credit Card to my account, but I don't want people making purchases as this store is for LEARNING and TESTING purposes only.</h4>
                    <p className="bagWarningSubtext">Contact me at crumrinecoding@gmail.com if you have any questions or need me to cancel and refund an order if you somehow make a payment, which I have no idea how you would do that but please don't try.</p>
                </div>
                <BagSubtotal checkout={checkout} clothing={this.state.dresses}></BagSubtotal>
            </div>
        );

    }
}

export default connect((state) => state)(BagContainer);
