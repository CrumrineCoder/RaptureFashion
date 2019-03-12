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
        this.arrayContainsAnotherArray = this.arrayContainsAnotherArray.bind(this);
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
            console.log(key);
            switch(key){
                case "color":
                    console.log("test");
                    break
                default:
                    return e[key] == value;
            }
        });
    }

    arrayContainsAnotherArray(needle, haystack){
        for(var i = 0; i < needle.length; i++){
          if(haystack.indexOf(needle[i]) === -1)
             return false;
        }
        return true;
      }

    render() {
        var filters = {

        }
        let pageContent = '';

        var dresses = [
            {
                name: "Deco Purple & Black Sequin Veronique Fringe Flapper Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/61626/61626-1_2048x2048.jpg",
                    "Dresses/61626/61626-2_2048x2048.jpg",
                    "Dresses/61626/61626-3_2048x2048.jpg",
                    "Dresses/61626/61626-4_2048x2048.jpg",
                    "Dresses/61626/61626-5_2048x2048.jpg"
                ],
                price: 14.00,
                color: ["Purple", "Black"]
            },
            {
                name: "Navy Hemingway Flapper Dress",
                brandName: "Ryan Boutique",
                images: [
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_6_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_2_2048x2048",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_4_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_3_1024x1024.jpg"
                ],
                price: 74.00,
                color: ["Blue"]
            },
            {
                name: "Black & Green Beaded Antoinette Peacock Flapper",
                brandName: "Apollo",
                images: [
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_2_f3b364a1-4a7a-4a7a-a1d8-9657de078c3b_2048x2048.jpg",
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_5_1d72e5c4-3365-4fcc-83da-fa85c7f33bb8_2048x2048.jpg",
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_6_3a343f09-e1bd-4224-847e-7a4c497698ef_2048x2048.jpg",
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_c6a4d060-a7a5-4825-9e4b-4bbe641b95e4_2048x2048.jpg",
                    "Dresses/53556/53556_L_2048x2048.jpg"
                ],
                price: 98.00,
                color: ["Green", "Black"]
            },
            {
                name: "Black Iridescent Beaded Zelia Fringe Flapper Dress",
                brandName: "ÁVELINE'S",
                images: [
                    "Dresses/74683/74683_1_2048x2048.jpg",
                    "Dresses/74683/74683_2_2048x2048.jpg",
                    "Dresses/74683/74683_3_1024x1024.jpg",
                    "Dresses/74683/74683_4_1024x1024.jpg",
                    "Dresses/74683/74683_5_2048x2048.jpg"
                ],
                price: 300.00,
                color: ["Black"]
            },
            {
                name: "Style Champagne Beaded Fringe Aurore Flapper Dress",
                brandName: "ÁVELINE'S",
                images: [
                    "Dresses/43915/s191854_1_aaca9fce-1f27-494b-9239-f6203eb48441_2048x2048.jpg",
                    "Dresses/43915/s191854_2_f761fe2a-3bcb-4edd-a1bd-b9ba96b781e4_1024x1024.jpg",
                    "Dresses/43915/s191854_3_6c8f29ca-efa0-48f4-95a4-293765309c62_2048x2048.jpg",
                    "Dresses/43915/s191854_4_658e7f58-948d-418a-a9bd-3e44f4a1a245_1024x1024.jpg",
                    "Dresses/43915/s191854_5_a86de98f-f546-4480-bc11-a20d3ecd1a31_2048x2048.jpg"
                ],
                price: 205.00,
                color: ["White"]
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
            pageContent = (
                <ul className="polls">
                    {dresses.map((dress, i) => <ClothingBox key={i} dress={dress} />)}
                </ul>
            )
        }

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
