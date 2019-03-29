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
        }
    }


    render() {

        return (
            <div className="">
                <p>Already have an account? Log In</p>
                <h3>Contact Information</h3>
                <input type="text" placeholder="Email"></input>
                <h3>Shipping Address</h3>
                <input type="text" placeholder="First name"></input>
                <input type="text" placeholder="Last name"></input>
                <input type="text" placeholder="Address"></input>
                <input type="text" placeholder="Apartment, suite, etc. (optional)"></input>
                <input type="text" placeholder="City"></input>
                <label for="country">Country:</label>
                <input list="countries" id="country" name="country" />
                <datalist id="countries">
                    <option value="Canada" />
                    <option value="United Kingdom" />
                    <option value="United States" />
                </datalist>
                <input type="text" placeholder="Phone"></input>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const cart = state.home.cart.cart;
    return { cart };
}

export default connect(mapStateToProps)(CheckoutContainer);
