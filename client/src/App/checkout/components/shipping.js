import React, { Component } from 'react';

class Shipping extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {

        }
        this.changeShipping = this.changeShipping.bind(this);
    }

    changeShipping(e){
        this.setState({
            shipping: e.target.value
        }, function () {
            this.props.onChange(this.state);
        });
    }

    render() {

        // Express 1-2 business
        // Second day 2-3
        // Standard 3-10 
        // Express International
        // Free Domestic Standard

        // Need to conditionally render these based on the store. 
        return (
            <div className="checkoutShipping">
                <p>Contact {this.props.contact}</p>
                <p>Ship to {this.props.address}</p>
                <label className="checkoutShippingLabel">
                    <input type="radio" name="shipping" value="Pickup" checked={this.state.shipping === "Pickup"}  onChange={this.changeShipping} />
                    Pickup at Store
                    <p className="checkoutShippingPrice">$0.00</p>
                </label>
                <label className="checkoutShippingLabel">
                    <input type="radio" name="shipping" value="Standard" checked={this.state.shipping === "Standard"}  onChange={this.changeShipping} />
                    Standard (3-10 business days)
                    <p className="checkoutShippingPrice">$5.38</p>
                </label>
                <label className="checkoutShippingLabel">
                    <input type="radio" name="shipping" value="Second" checked={this.state.shipping === "Second"}  onChange={this.changeShipping} />
                    Second Day (2-3 business days)
                    <p className="checkoutShippingPrice">$10.25</p>
                </label>
                <label className="checkoutShippingLabel">
                    <input type="radio" name="shipping" value="Express" checked={this.state.shipping === "Express"}  onChange={this.changeShipping} />
                    Express (1-2 business days)
                    <p className="checkoutShippingPrice">$23.95</p>
                </label>
            </div>
        )
    }
}

export default Shipping;