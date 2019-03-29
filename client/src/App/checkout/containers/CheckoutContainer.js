import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import { cartActions } from '../../_actions/cart.actions.js';
import { Link } from 'react-router-dom';
/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class CheckoutContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            email: "",
            fName: "",
            lName: "",
            address: "",
            apartment: "",
            city: "",
            country: "",
            phone: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    render() {

        return (
            <div className="">
                <p>Already have an account? Log In</p>
                <h3>Contact Information</h3>
                {this.state.country}
                <input type="text" placeholder="Email" name="email" onChange={this.handleInputChange} value={this.state.email}></input>
                <h3>Shipping Address</h3>
                <input type="text" placeholder="First name" name="fName" onChange={this.handleInputChange} value={this.state.fName}></input>
                <input type="text" placeholder="Last name" name="lName" onChange={this.handleInputChange} value={this.state.lName}></input>
                <input type="text" placeholder="Address" name="address" onChange={this.handleInputChange} value={this.state.address}></input>
                <input type="text" placeholder="Apartment, suite, etc. (optional)" name="apartment" onChange={this.handleInputChange} value={this.state.apartment}></input>
                <input type="text" placeholder="City" name="city" onChange={this.handleInputChange} value={this.state.city}></input>
                <select name="country" onChange={this.handleInputChange} value={this.state.country}>
                    <option value="NULL">Select a Country</option>
                    <option value="Canada">Canada</option>
                    <option value="Rapture">Rapture</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                </select>
                <input type="text" placeholder="Phone" name="phone" onChange={this.handleInputChange} value={this.state.phone}></input>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const cart = state.home.cart.cart;
    return { cart };
}

export default connect(mapStateToProps)(CheckoutContainer);
