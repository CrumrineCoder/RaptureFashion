import React, { Component } from 'react';

// Landing page 
class Filter extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            amountOfFilters: 0,
        };
        this.clear = this.clear.bind(this);
    }
 
    /*
        delete(filterToDelete) {
            let filters = Object.assign({}, this.state.filters);
            filters[filterToDelete] = null;
            this.setState({
                filters,
                amountOfFilters: this.state.amountOfFilters - 1
            }, function () {
                this.props.onChange(this.state.filters);
            });
        }
    */
    clear() {
        this.setState({ filters: {}, sort: null }, function () {
            this.props.onChange(this.state.filters);
            this.props.sort(null)
        });
    }
    changeFilter(key, value) {
        // Get previous filters
        let filters = Object.assign({}, this.props.filters);
      //  let change = 0;
       // if (filters[key] === null || filters[key] === undefined || filters[key] === "") {
     //       change = 1;
     //   }

        if(filters[key].indexOf(value) == -1){
            filters[key].push(value);
        } else{
            filters[key].splice(filters[key].indexOf(value), 1)
        }
        // Add filter to the key array
     
        // Set the state with the new filters and send them up to the container
   /*     this.setState({
            filters,
            amountOfFilters: this.state.amountOfFilters + change
        }, function () {
            this.props.onChange(this.state.filters);
        }); */
            this.props.onChange(filters)
    }

    changeSort(value) {
     //   this.setState({ sort: value }, this.props.sort(value));
        this.props.sortFunction(value);
    }

    isActive(base, selector, type) {
      /*  console.log("Base", base);
        console.log("Selector", selector);
        console.log("Type", type);
        console.log("TypeStuff", this.state.filters[type]); */
        if (base === "filterSort") {
            return base + ' ' + selector + ' ' + ((this.props[type] === (selector)) ? 'filterSortActive' : 'default');
        }
        return base + ' ' + selector + ' ' + ((this.props.filters[type].includes(selector)) ? 'filterActive' : 'default');
    }

    render() {
    /*      let activeFilter = [];
      if (this.state.amountOfFilters > 0) {
            activeFilter.push(
                <h3>Active Filters</h3>
            )
        } 
        if (this.state.filters.vendor !== undefined) {
            activeFilter.push(
                <div>
                    <i onClick={() => this.delete("vendor")} className="fas fa-times activeFilterDelete"></i> Brand: {this.state.filters.vendor}
                </div>
            )
        }
        if (this.state.filters.color !== undefined) {
            activeFilter.push(
                <div>
                    <i onClick={() => this.delete("color")} className="fas fa-times activeFilterDelete"></i> Color: {this.state.filters.color}
                </div>
            )
        }
        */
        //   {activeFilter}
/*
        let clear;
        if ((this.props.filters.color !== null && this.props.filters.color !== undefined) || (this.props.filters.vendor !== null && this.props.filters.vendor !== undefined) || this.props.sort !== null) {
            clear = (
                <div className="filterClear">
                    <i onClick={this.clear} className="fas fa-times activeFilterDelete"></i> Clear
                </div>
            )
        } */
        /*
         <div className="filterHeaderSection">
                    <h4 className="filterHeader">Filters</h4>
                    {clear}
                </div>
                */
        /*
                    */
        return (
            <div className="filter">
                <div className="filterSectionContainer">
                    <div className="filterSection">
                        <h5 className="filterSubheader">Colors</h5>
                        <div className="filterRow">
                            <label>
                                <div className={this.isActive('filterRadio', "Purple", "color")} type="checkbox" name="color" value="Purple" checked={this.props.filters.color === "Purple"} filter="color" onClick={() => this.changeFilter("color", "Purple")} />
                            </label>
                            <label>
                                <div className={this.isActive('filterRadio', "Black", "color")} type="radio" name="color" value="Black" checked={this.props.filters.color === "Black"} filter="color" onClick={() => this.changeFilter("color", "Black")} />
                            </label>
                            <label>
                                <div className={this.isActive('filterRadio', "Blue", "color")} type="checradiokbox" name="color" value="Blue" checked={this.props.filters.color === "Blue"} filter="color" onClick={() => this.changeFilter("color", "Blue")} />
                            </label>
                            <label>
                                <div className={this.isActive('filterRadio', "Green", "color")} type="radio" name="color" value="Green" checked={this.props.filters.color === "Green"} filter="color" onClick={() => this.changeFilter("color", "Green")} />
                            </label>
                            <label>
                                <div className={this.isActive('filterRadio', "White", "color")} type="radio" name="color" value="White" checked={this.props.filters.color === "White"} filter="color" onClick={() => this.changeFilter("color", "White")} />
                            </label>
                            <label>
                                <div className={this.isActive('filterRadio', "Gold", "color")} type="radio" name="color" value="Gold" checked={this.props.filters.color === "Gold"} filter="color" onClick={() => this.changeFilter("color", "Gold")} />
                            </label>
                        </div>
                    </div>
                    <div className="filterSection">
                        <h5 className="filterSubheader">Brands</h5>
                        {this.props.clothing &&
                            <div className="filterRow">
                                <div className={this.isActive('filterText', "Gibson Girls", "vendor")} type="radio" name="vendor" value="Gibson Girls" checked={this.props.filters.vendor === "Gibson Girls"} filter="vendor" onClick={() => this.changeFilter("vendor", "Gibson Girls")} >
                                    Gibson Girls
                            </div>
                                <div className={this.isActive('filterText', "Ryan Boutique", "vendor")} type="radio" name="vendor" value="Ryan Boutique" checked={this.props.filters.vendor === "Ryan Boutique"} filter="vendor" onClick={() => this.changeFilter("vendor", "Ryan Boutique")} >
                                    Ryan Boutique
                            </div>
                                <div className={this.isActive('filterText', "Apollo", "vendor")} type="radio" name="vendor" value="Apollo" checked={this.props.filters.vendor === "Apollo"} filter="vendor" onClick={() => this.changeFilter("vendor", "Apollo")} >
                                    Apollo
                            </div>
                                <div className={this.isActive('filterText', "ÁVELINE'S", "vendor")} type="radio" name="vendor" value="ÁVELINE'S" checked={this.props.filters.vendor === "ÁVELINE'S"} filter="vendor" onClick={() => this.changeFilter("vendor", "ÁVELINE'S")} >
                                    ÁVELINE'S
                            </div>
                            </div>
                        }
                    </div>
                    <div className="filterSection">
                        <h5 className="filterSubheader">Clothing</h5>
                        {this.props.clothing &&
                            <div className="filterRow">
                                <div className={this.isActive('filterText', "Dress", "clothing")} type="radio" name="vendor" value="Gibson Girls" checked={this.props.filters.clothing === "Dress"} filter="vendor" onClick={() => this.changeFilter("clothing", "Dress")} >
                                    Dresses
                            </div>

                                <div className={this.isActive('filterText', "Shoe", "clothing")} type="radio" name="vendor" value="Gibson Girls" checked={this.props.filters.clothing === "Shoe"} filter="vendor" onClick={() => this.changeFilter("clothing", "Shoe")} >
                                    Shoes
                            </div>

                                <div className={this.isActive('filterText', "Accessory", "clothing")} type="radio" name="vendor" value="Gibson Girls" checked={this.props.filters.clothing === "Accessory"} filter="vendor" onClick={() => this.changeFilter("clothing", "Accessory")} >
                                    Accessories
                            </div>

                                <div className={this.isActive('filterText', "Hat", "clothing")} type="radio" name="vendor" value="Gibson Girls" checked={this.props.filters.clothing === "Hat"} filter="vendor" onClick={() => this.changeFilter("clothing", "Hat")} >
                                    Hats
                            </div>
                            </div>
                        }
                    </div>

                    <div className="filterSection">
                        <h5 className="filterSubheader">Sort</h5>
                        <div className="filterRow">
                            <div className={this.isActive('filterSort', "sortPriceAsc", "sort")} onClick={() => this.changeSort("sortPriceAsc")} > Price Low-High</div>
                            <div className={this.isActive('filterSort', "sortPriceDesc", "sort")} onClick={() => this.changeSort("sortPriceDesc")} > Price High-Low</div>
                            <div className={this.isActive('filterSort', "sortNameAsc", "sort")} onClick={() => this.changeSort("sortNameAsc")} >Name A-Z</div>
                            <div className={this.isActive('filterSort', "sortNameDesc", "sort")} onClick={() => this.changeSort("sortNameDesc")} >Name Z-A</div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Filter;
