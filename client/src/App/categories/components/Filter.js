import React, { Component } from 'react';

// Landing page 
class Filter extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            amountOfFilters: 0, 
            filters: {
                brandName: null,
                color: null
            }
        };
        this.changeBrand = this.changeBrand.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    changeBrand(e) {
        let filters = Object.assign({}, this.state.filters); 
        filters.brandName = e.target.value;
        this.setState({
            filters,
            amountOfFilters: this.state.amountOfFilters+1
        }, function () {
            this.props.onChange(this.state.filters);
        });
    }

    changeColor(e) {
        let filters = Object.assign({}, this.state.filters); 
        console.log(filters);
        filters.color = e.target.value;
        this.setState({
            filters,
            amountOfFilters: this.state.amountOfFilters+1
        }, function () {
            this.props.onChange(this.state.filters);
        });
    }
    

    render() {
        let activeFilter = []; 
        if(this.state.amountOfFilters > 0){
            activeFilter.push(
                <h3>Active Filters</h3> 
            )
        }
        if(this.state.filters.brandName != undefined){
            activeFilter.push(
                <div>
                   <i class="fas fa-times activeFilterDelete"></i> Brand Name: {this.state.filters.brandName}
                </div>      
            )
        }
        if(this.state.filters.color != undefined){
            activeFilter.push(
                <div>
                  <i class="fas fa-times activeFilterDelete"></i> Color: {this.state.filters.color}
                </div>      
            )
        }
        return (
            <div className="filter">
                {activeFilter}
                <div className="filterRow">
                    <label>
                        <input type="radio" name="brandName" value="Gibson Girl" checked={this.state.filters.brandName === "Gibson Girl"} filter="brandName" onChange={this.changeBrand} />
                        Gibson Girl
                    </label>
                    <label>
                        <input type="radio" name="brandName" value="Ryan Boutique" checked={this.state.filters.brandName === "Ryan Boutique"} filter="brandName" onChange={this.changeBrand} />
                        Ryan Boutique
                    </label>
                    <label>
                        <input type="radio" name="brandName" value="Apollo" checked={this.state.filters.brandName === "Apollo"} filter="brandName" onChange={this.changeBrand} />
                        Apollo
                    </label>
                    <label>
                        <input type="radio" name="brandName" value="ÁVELINE'S" checked={this.state.filters.brandName === "ÁVELINE'S"} filter="brandName" onChange={this.changeBrand} />
                        ÁVELINE'S
                    </label>
                </div>
                <div className="filterRow">
                    <label>
                        <input type="radio" name="color" value="Purple" checked={this.state.filters.color === "Purple"} filter="color" onChange={this.changeColor} />
                        Purple
                    </label>
                    <label>
                        <input type="radio" name="color" value="Black" checked={this.state.filters.color === "Black"} filter="color" onChange={this.changeColor} />
                        Black
                    </label>
                    <label>
                        <input type="radio" name="color" value="Blue" checked={this.state.filters.color === "Blue"} filter="color" onChange={this.changeColor} />
                        Blue
                    </label>
                    <label>
                        <input type="radio" name="color" value="Green" checked={this.state.filters.color === "Green"} filter="color" onChange={this.changeColor} />
                        Green
                    </label>
                    <label>
                        <input type="radio" name="color" value="White" checked={this.state.filters.color === "White"} filter="color" onChange={this.changeColor} />
                        White
                    </label>
                </div>
            </div>
        );

    }
}

export default Filter;
