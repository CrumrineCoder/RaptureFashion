import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import Filter from "../components/Filter";
import store from '../../store';

// For the Brand, All, and Clothing pages
class CategoriesContainer extends Component {

    constructor(props) {
        super(props);
        // Filter variables
        this.state = {
            filter: {},
            sort: null
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.sort = this.sort.bind(this);
        this.getFilteredArray = this.getFilteredArray.bind(this);
        this.clean = this.clean.bind(this);
    }

    // Change the container's state to match its child
    handleFilter(filter) {
        this.setState({
            filter: filter
        })
    }

    // Change the container's sorting style to match its child
    sort(value) {
        this.setState({
            sort: value
        })
    }

    // Filter an array of products
    getFilteredArray(array, key, value) {
        return array.filter(function (e) {
            // Depending on what tag we're filtering by, we check the value in a different place
            switch (key) {
                case "color":
                    var splitColor = e.options[1].values[0].value.split('/');
                    return splitColor.includes(value)
                case "vendor":
                    return e.vendor === value
                default:
                    return e[key] === value;
            }
        });
    }

    // Remove all empty keys/values in an object
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
        return obj;
    }

    render() {
        let pageContent = '';
        let header;
        const state = store.getState().home.cart; // state from redux store
        let clothing = state.products;
        // If we're not including All clothes
        if (this.props.clothing !== "all") {
            // If the products are loaded
            if (state.products["0"]) {
                // If we're sorting by clothing
                if (this.props.clothing) {
                    // Based on the type of clothing, filter the clothing array by its type (set in Shopify)
                    if (this.props.clothing === "dresses") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value === "Dress"
                        });
                    } else if (this.props.clothing === "accessories") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value === "Accessory"
                        });
                    } else if (this.props.clothing === "shoes") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value === "Shoe"
                        });
                    } else if (this.props.clothing === "hats") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value === "Hat"
                        });
                    }
                    // For the header of this page, we're only showing by what type of clothing they're inherently sorting by
                    header = (
                        <div className="clothingHeader">
                            <div className='clothingBrandContainer'>
                                <h3>{this.props.clothing}</h3>
                            </div>
                        </div>
                    )
                }
                // If we're sorting by vendor
                else if (this.props.vendor) {
                    let vendorImage;
                    // Based on the vendor, filter the clothing array by its vendor (set in Shopify)
                    if (this.props.vendor === "Gibson Girls") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor === "Gibson Girls"
                        });
                        vendorImage = "Brand/gibson girls.png";
                    } else if (this.props.vendor === "Ryan Boutique") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor === "Ryan Boutique"
                        });
                        vendorImage = "Brand/andrew ryan.png";
                    } else if (this.props.vendor === "Apollo") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor === "Apollo"
                        });
                        vendorImage = "Brand/apollo.png";
                    } else if (this.props.vendor === "ÁVELINE'S") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor === "ÁVELINE'S"
                        });
                        vendorImage = "Brand/aveline.png";
                    }
                    // For the header of this page, we're showing by what vendor they're inherently sorting by and that vendor's image
                    header = (
                        <div className="vendorHeader">
                            <div className='vendorBrandContainer'>
                                <div className='vendorBrandImage'>
                                    {<img src={require("../../../assets/" + vendorImage)} alt="Brand" />}
                                </div>
                                <h3>{this.props.vendor}</h3>
                            </div>
                        </div>
                    )
                }
            }
        } else {
            // For the header of All, we just tell the user they're seeing all types of clothes
            header = (
                <div className="clothingHeader">
                    <div className='clothingBrandContainer'>
                        <h3>All</h3>
                    </div>
                </div>
            )
        }

        // If we're  sorting
        if (this.state.sort) {
            // Depending on the type of sort, sort accordingly
            // Sort by highest price first
            if (this.state.sort === "sortPriceAsc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.variants["0"].price < b.variants["0"].price) {
                        return -1;
                    }
                    if (a.variants["0"].price > b.variants["0"].price) {
                        return 1;
                    }
                    return 0;
                })
            } // Sort by lowest price first 
            else if (this.state.sort === "sortPriceDesc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.variants["0"].price < b.variants["0"].price) {
                        return 1;
                    }
                    if (a.variants["0"].price > b.variants["0"].price) {
                        return -1;
                    }
                    return 0;
                })
            } // Sort by A names first 
            else if (this.state.sort === "sortNameAsc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                })
            } // Sort by Z names first
            else if (this.state.sort === "sortNameDesc") {
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
        }

        // If we have filters
        if (!(Object.entries(this.state.filter).length === 0 && this.state.filter.constructor === Object)) {
            // Clone the copies object
            let filteredClothing = clothing;
            // Clean it
            var filteredFilter = this.clean(this.state.filter);
            // For each filter
            for (var filter in filteredFilter) {
                // If there's a vendor, don't filter for brand filters
                if (filter === "vendor" && this.props.vendor) {
                    break
                }
                // Further filter the collection each time
                filteredClothing = this.getFilteredArray(filteredClothing, filter, this.state.filter[filter])
            }
            // If there are still clothing items remaining after the filters
            if (filteredClothing.length) {
                // Return a clothing box for each item still remaining in the filtered Array
                pageContent = (
                    <ul className="clothingContainer">
                        {filteredClothing.map((article, i) => <ClothingBox key={i} dress={article} />)}
                    </ul>
                )
            } else {
                // Tell the user if there are no items to show for the filters they've selected
                pageContent = (
                    <p className="clothingDismisser">There are no items to show for these filters.</p>
                )
            }
        } // User is not filtering the clothing 
        else {
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

