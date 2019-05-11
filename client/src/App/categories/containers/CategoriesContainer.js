import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import Filter from "../components/Filter";
import store from '../../store';
import Products from '../../shopify/Products'
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
            filter: {},
            sort: null
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.getFilteredArray = this.getFilteredArray.bind(this);
        this.arrayContainsAnotherArray = this.arrayContainsAnotherArray.bind(this);
        this.clean = this.clean.bind(this);
        this.addVariantToCart = this.addVariantToCart.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        //     console.log(this.props);
    }

    handleFilter(filter) {
        this.setState({
            filter: filter
        })
    }

    // Upon first render,  tell the back end to get all polls
    /*	componentDidMount() {
            this.props.dispatch(pollActions.selectPoll("All"));
            this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
        } */

    getFilteredArray(array, key, value) {
        return array.filter(function (e) {
            switch (key) {
                case "color":
                    var splitColor = e.options[1].values[0].value.split('/');
                    return splitColor.includes(value)
                case "vendor":
                    return e.vendor == value
                default:
                    return e[key] == value;
            }
        });
    }

    arrayContainsAnotherArray(needle, haystack) {
        for (var i = 0; i < needle.length; i++) {
            if (haystack.indexOf(needle[i]) === -1)
                return false;
        }
        return true;
    }

    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
        return obj;
    }

    addVariantToCart(variantId, quantity) {
        const state = store.getState().home.cart; // state from redux store
        const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
        const checkoutId = state.checkout.id
        state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            store.dispatch({ type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res } });
        });
    }

    sort(value) {
        this.setState({
            sort: value
        })
    }

    render() {

        let pageContent = '';


        let header;
        const state = store.getState().home.cart; // state from redux store
        let clothing = state.products;
        if (this.props.clothing != "all") {
            if (state.products["0"]) {
                if (this.props.clothing) {
                    if (this.props.clothing == "dresses") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Dress"
                        });
                    } else if (this.props.clothing == "accessories") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Accessory"
                        });
                    } else if (this.props.clothing == "shoes") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Shoe"
                        });
                    } else if (this.props.clothing == "hats") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Hat"
                        });
                    }
                    header = (
                        <div className="clothingHeader">
                            <div class='clothingBrandContainer'>
                                <h3>{this.props.clothing}</h3>
                            </div>
                        </div>
                    )
                } else if (this.props.vendor) {
                    let vendorImage;
                    let vendorText;
                    if (this.props.vendor == "Gibson Girls") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "Gibson Girls"
                        });
                        vendorImage = "Brand/gibson girls.png";
                    } else if (this.props.vendor == "Ryan Boutique") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "Ryan Boutique"
                        });
                        vendorImage = "Brand/andrew ryan.png";
                    } else if (this.props.vendor == "Apollo") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "Apollo"
                        });
                        vendorImage = "Brand/apollo.png";
                    } else if (this.props.vendor == "ÁVELINE'S") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "ÁVELINE'S"
                        });
                        vendorImage = "Brand/aveline.png";
                    }
                    /*     vendorText = vendorText.split('\n').map((item, i) => {
                             return <p key={i}>{item}</p>;
                         });
                         <div class='vendorBrandText'>
                         <p>{vendorText}</p>
                     </div> */
                    // Probably add the history text here too. 
                    header = (
                        <div className="vendorHeader">
                            <div class='vendorBrandContainer'>
                                <div class='vendorBrandImage'>
                                    {<img src={require("../../../assets/" + vendorImage)} />}
                                </div>
                                <h3>{this.props.vendor}</h3>
                            </div>
                        </div>
                    )
                }
            }
        } else{
            header = (
                <div className="clothingHeader">
                    <div class='clothingBrandContainer'>
                        <h3>All</h3>
                    </div>
                </div>
            )
        }

        if (this.state.sort) {
            if (this.state.sort == "sortPriceAsc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.variants["0"].price < b.variants["0"].price) {
                        return -1;
                    }
                    if (a.variants["0"].price > b.variants["0"].price) {
                        return 1;
                    }
                    return 0;
                })
            } else if (this.state.sort == "sortPriceDesc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.variants["0"].price < b.variants["0"].price) {
                        return 1;
                    }
                    if (a.variants["0"].price > b.variants["0"].price) {
                        return -1;
                    }
                    return 0;
                })
            } else if (this.state.sort == "sortNameAsc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                })
            }
            else if (this.state.sort == "sortNameDesc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.title < b.title) {
                        return 1;
                    }
                    if (a.title > b.title) {
                        return -1;
                    }
                    return 0;
                })
            }
        } else if (!this.props.vendor) {
            clothing = state.products;
        }

        if (!(Object.entries(this.state.filter).length === 0 && this.state.filter.constructor === Object)) {
            let filteredClothing = clothing;
            var filteredFilter = this.clean(this.state.filter);
            // If there's a vendor, don't filter for user selected filters

            for (var filter in filteredFilter) {
                if (filter == "vendor" && this.props.vendor) {
                    break
                }
                filteredClothing = this.getFilteredArray(filteredClothing, filter, this.state.filter[filter])
            }
            pageContent = (
                <ul className="clothingContainer">
                    {filteredClothing.map((article, i) => <ClothingBox key={i} dress={article} />)}
                </ul>
            )
        } else {
            pageContent = (
                <ul className="clothingContainer">
                    {clothing.map((article, i) => <ClothingBox key={i} dress={article} />)}
                </ul>
            )
        }

        return (
            <div className="categoriesContainer">
                {header}
                <Filter clothing={this.props.clothing} onChange={this.handleFilter} sort={this.sort}></Filter>
                {pageContent}
            </div>
        );

    }
}

export default connect((state) => state)(CategoriesContainer);

