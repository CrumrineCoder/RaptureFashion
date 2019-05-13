import React, { Component } from 'react';
import { connect } from 'react-redux';
import Address from "../components/address.js";
import Shipping from "../components/shipping.js";

// Landing page 
class CheckoutContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            address: {},
            formattedAddress: "",
            shipping: ""
        }
        this.handleAddress = this.handleAddress.bind(this);
        this.handleShipping = this.handleShipping.bind(this);
    }

    handleAddress(address) {
        this.setState({
            address,
            formattedAddress: address.address + ", " +  address.city + " " +  address.zip + ", " +  address.country,
            emailAddress: address.email
        })
    }

    handleShipping(shipping){
        this.setState(shipping);
    }


    render() {
        return (
            <div className="checkout">
                <Address onChange={this.handleAddress}></Address>
                <Shipping onChange={this.handleShipping} contact={this.state.emailAddress} address={this.state.formattedAddress}></Shipping>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const cart = state.home.cart.cart;
    return { cart };
}

export default connect(mapStateToProps)(CheckoutContainer);
