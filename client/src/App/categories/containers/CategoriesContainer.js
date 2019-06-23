import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import Filter from "../components/Filter";
import store from '../../store';
//import SubHeader from "../../common/components/SubHeader";

// For the Brand, All, and Clothing pages
class CategoriesContainer extends Component {

    constructor(props) {
        super(props);
        // Filter variables
        this.state = {
            filter: {
                vendor: ["Gibson Girls", "Ryan Boutique", "Apollo", "ÁVELINE'S"],
                color: ["Purple","Black", "Blue", "Green", "White", "Gold"],
                clothing: ["Dress", "Shoe", "Accessory", "Hat"]
            },
            sort: null/*,
            vendor: "",
            clothing: ""*/
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.sort = this.sort.bind(this);
        this.getFilteredArray = this.getFilteredArray.bind(this);
        this.clean = this.clean.bind(this);
        //    this.updateFromSubheader = this.updateFromSubheader.bind(this);
    }
    /*
    updateFromSubheader(vendor, clothing) {
        this.setState({ vendor, clothing });
    }
    */
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
        console.log("Get filtered array array", array);
        console.log("Get filtered array key", key);
        console.log("Get filtered array value", value);
        return array.filter(function (e) {
            console.log("e", e)
            // Depending on what tag we're filtering by, we check the value in a different place
            switch (key) {
                case "color":
                    var splitColor = e.options[1].values[0].value.split('/');
                    console.log("include " + value)
                    console.log("split color", splitColor)
                    console.log("Does it include?" + value.includes(splitColor))
                    console.log(splitColor.every(elem => value.indexOf(elem) > -1));
                    //return value.includes(splitColor)
                    return splitColor.every(elem => value.indexOf(elem) > -1);
                case "vendor":
                    console.log("include " + value)
                    console.log("split color", e.vendor)
                    console.log("Does it include?" + value.includes(e.vendor))
                    return value.includes(e.vendor)

                default:
                    console.log("include " + value)
                    console.log("split color", e[key])
                    console.log("Does it include?" + value.includes(e[key]))
                    return value.includes(e[key])
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

    /*
        // If we're sorting by clothing
            console.log("Does the filter includes dresses", this.state.filter.clothing.includes("Dresses"))
            // Based on the type of clothing, filter the clothing array by its type (set in Shopify)
            if (this.state.filter.clothing.includes("Dresses")) {
                clothing = state.products.filter(function (a) {
                    return a.options[2].values["0"].value === "Dress"
                });
            } else if (this.state.filter.clothing.includes("Accessories")) {
                clothing = state.products.filter(function (a) {
                    return a.options[2].values["0"].value === "Accessory"
                });
            } else if (this.state.filter.clothing.includes("Shoes")) {
                clothing = state.products.filter(function (a) {
                    return a.options[2].values["0"].value === "Shoe"
                });
            } else if (this.state.filter.clothing.includes("Hats")) {
                clothing = state.products.filter(function (a) {
                    return a.options[2].values["0"].value === "Hat"
                });
            }

            // Based on the vendor, filter the clothing array by its vendor (set in Shopify)
            if (this.state.filter.vendor === "Gibson Girls") {
                clothing = clothing.filter(function (a) {
                    return a.vendor === "Gibson Girls"
                });
            } else if (this.state.filter.vendor === "Ryan Boutique") {
                clothing = clothing.filter(function (a) {
                    return a.vendor === "Ryan Boutique"
                });
            } else if (this.state.filter.vendor === "Apollo") {
                clothing = clothing.filter(function (a) {
                    return a.vendor === "Apollo"
                });
            } else if (this.state.filter.vendor === "ÁVELINE'S") {
                clothing = clothing.filter(function (a) {
                    return a.vendor === "ÁVELINE'S"
                });
            }

            */

    render() {
        let filters = this.state.filter;
        console.log("Render filter", this.state.filter);
        let pageContent = '';
        let header;
        const state = store.getState().home.cart; // state from redux store
        let clothing = state.products;
   
        // If we're not including All clothes
        // If the products are loaded
        if (state.products["0"]) {
            console.log("Clothing before purge", clothing);
            for(var i=0; i<clothing.length; i++){
            
            }
            clothing = clothing.filter(function(item){
                console.log("Filter filters", filters);
                console.log("Filter vendor", item.vendor);
                console.log("Filter clothing in shopify", item.options[2].values["0"].value);
                console.log("Vendor?", filters['vendor'].includes(item.vendor));
                console.log("Clothing?", filters['clothing'].includes(item.options[2].values["0"].value));
                var splitColor = item.options[1].values[0].value.split('/');
         // && splitColor.every(elem => value.indexOf(elem) > -1)
                //return value.includes(splitColor)
                return filters['vendor'].includes(item.vendor) && filters['clothing'].includes(item.options[2].values["0"].value)
            });
        }
        console.log("Clothing after purge", clothing);

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
        console.log("Are there no filters", Object.entries(this.state.filter).length === 0);
        console.log("is the filter an object", this.state.filter.constructor === Object);
        console.log("clothing", clothing);
        // If we have filters
        if (!(Object.entries(this.state.filter).length === 0 && this.state.filter.constructor === Object)) {
            console.log("we're in");
            // Clone the copies object
            let filteredClothing = clothing;
            console.log("filteredClothing ", filteredClothing);
            // Clean it
            var filteredFilter = this.clean(this.state.filter);
            // For each filter
            console.log("filtered filter after clean", filteredFilter);
            
            for (var filter in filteredFilter) {
                // If there's a vendor, don't filter for brand filters
                if (filter === "vendor" && this.props.vendor) {
                    break
                } else if (filter === "clothing" && this.props.clothing) {
                    break;
                }
                console.log("filter", filter);
                console.log("filter in state", this.state.filter[filter]);
                // Further filter the collection each time
                filteredClothing = this.getFilteredArray(filteredClothing, filter, this.state.filter[filter])
            }
            
            console.log("filtered clothing after array", filteredClothing);
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
        else if (clothing.length == 0) {
            pageContent = (
                <p className="clothingDismisser">There are no items to show for these filters.</p>
            )
        }
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

