import React, { Component } from 'react';

// Landing page 
class Filter extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            brand: ""
        };
        this.changeBrand = this.changeBrand.bind(this);
    }

    changeBrand(e) {
        this.setState({
            brand: e.target.value
        });
    }

    render() {

        return (
            <div className="filter">
                <label>
                    <input type="radio" name="brand" value="Gibson Girls" checked={this.state.brand === "Gibson Girls"} onChange={this.changeBrand} />
                    Gibson Girls
                </label>
                <label>
                    <input type="radio" name="brand" value="Ryan Boutique" checked={this.state.brand === "Ryan Boutique"} onChange={this.changeBrand} />
                    Ryan Boutique
                </label>
                <label>
                    <input type="radio" name="brand" value="Apollo" checked={this.state.brand === "Apollo"} onChange={this.changeBrand} />
                    Apollo
                </label>
                <label>
                    <input type="radio" name="brand" value="ÁVELINE'S" checked={this.state.brand === "ÁVELINE'S"} onChange={this.changeBrand} />
                    ÁVELINE'S
                </label>
            </div>
        );

    }
}

export default Filter;
