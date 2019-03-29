import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import { cartActions } from '../../_actions/cart.actions.js';
import { Link } from 'react-router-dom';
import Address from "../components/address.js";
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
            address: {}
        }
    }




    render() {

        return (
            <div className="">
                <Address></Address>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const cart = state.home.cart.cart;
    return { cart };
}

export default connect(mapStateToProps)(CheckoutContainer);
