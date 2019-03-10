import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class CategoriesContainer extends Component {

	constructor(props) {
		super(props);
		// Used for when searching and tagging functionality whenever that comes
		this.state = { };
	}

	static propTypes = {
		//	selectedPoll: PropTypes.string.isRequired,
		//	polls: PropTypes.array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
    }
    
    componentDidMount() {
        console.log(this.props);
    }

	// Upon first render,  tell the back end to get all polls
/*	componentDidMount() {
		this.props.dispatch(pollActions.selectPoll("All"));
		this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
	} */

	render() {
        var filters = {

        }

        var dresses = {

        }

        var gibsonDress = {
			name: "Unique Vintage Black Iridescent Beaded Zelia Fringe Flapper Dress",
			brandName: "Gibson Girl",
			images: [
				"Dresses/74683/74683_1_2048x2048.jpg",
				"Dresses/74683/74683_2_2048x2048.jpg",
				"Dresses/74683/74683_3_1024x1024.jpg",
				"Dresses/74683/74683_4_1024x1024.jpg",
				"Dresses/74683/74683_5_2048x2048.jpg"
			],
			price: 98.00
        }
        
        var ryanDress = {
			name: "Unique Vintage Black Iridescent Beaded Zelia Fringe Flapper Dress",
			brandName: "Ryan Boutique",
			images: [
				"Dresses/74683/74683_1_2048x2048.jpg",
				"Dresses/74683/74683_2_2048x2048.jpg",
				"Dresses/74683/74683_3_1024x1024.jpg",
				"Dresses/74683/74683_4_1024x1024.jpg",
				"Dresses/74683/74683_5_2048x2048.jpg"
			],
			price: 103.00
        }
        
        var apolloDress = {
			name: "Unique Vintage Black Iridescent Beaded Zelia Fringe Flapper Dress",
			brandName: "Apollo",
			images: [
				"Dresses/74683/74683_1_2048x2048.jpg",
				"Dresses/74683/74683_2_2048x2048.jpg",
				"Dresses/74683/74683_3_1024x1024.jpg",
				"Dresses/74683/74683_4_1024x1024.jpg",
				"Dresses/74683/74683_5_2048x2048.jpg"
			],
			price: 23.00
        }
        
        var avelineDress = {
			name: "Unique Vintage Black Iridescent Beaded Zelia Fringe Flapper Dress",
			brandName: "ÁVELINE'S",
			images: [
				"Dresses/74683/74683_1_2048x2048.jpg",
				"Dresses/74683/74683_2_2048x2048.jpg",
				"Dresses/74683/74683_3_1024x1024.jpg",
				"Dresses/74683/74683_4_1024x1024.jpg",
				"Dresses/74683/74683_5_2048x2048.jpg"
			],
			price: 294.00
        }

		return (
			<div className="categoriesContainer">
				<ClothingBox dress={gibsonDress}></ClothingBox>
                <ClothingBox dress={ryanDress}></ClothingBox>
                <ClothingBox dress={apolloDress}></ClothingBox>
                <ClothingBox dress={avelineDress}></ClothingBox>
			</div>
		);

	}
}

CategoriesContainer.propTypes = {
	//selectedPoll: PropTypes.string.isRequired,
	//polls: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(CategoriesContainer);
