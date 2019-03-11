import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import Filter from "../components/Filter";
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
        this.state = {
            filter: {}
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.getFilteredArray = this.getFilteredArray.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    handleFilter(filter) {
        this.setState({
            filter: filter
        })
        console.log(filter);
    }

    // Upon first render,  tell the back end to get all polls
    /*	componentDidMount() {
            this.props.dispatch(pollActions.selectPoll("All"));
            this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
        } */

    getFilteredArray(array, key, value) {
        return array.filter(function (e) {
            return e[key] == value;
        });
    }

    render() {
        var filters = {

        }
        let pageContent = '';

        var dresses = [
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
        ]


        if (!(Object.entries(this.state.filter).length === 0 && this.state.filter.constructor === Object)) {
            let filteredDresses = dresses;
            for (var filter in this.state.filter) {
                filteredDresses = this.getFilteredArray(filteredDresses, filter, this.state.filter[filter])
            }
            pageContent = (
                <ul className="polls">
                    {filteredDresses.map((dress, i) => <ClothingBox key={i} dress={dress} />)}
                </ul>
            )
        } else {
            console.log("jive");
            pageContent = (
                <ul className="polls">
                    {dresses.map((dress, i) => <ClothingBox key={i} dress={dress} />)}
                </ul>
            )
        }

        console.log(pageContent);

        return (
            <div className="categoriesContainer">
                <Filter onChange={this.handleFilter}></Filter>
                {pageContent}
            </div>
        );

    }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(CategoriesContainer);
