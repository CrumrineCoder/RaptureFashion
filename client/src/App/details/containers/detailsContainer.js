import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class DetailsContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
        };
    }

    render() {
        return (
            <div className="detailsContainer">
             
            </div>
        );

    }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(DetailsContainer);
