import React, { Component } from 'react';

// Landing page 
class Filter extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            brandName: ""
        };
        this.changeBrand = this.changeBrand.bind(this);
    }

    changeBrand(e) {
        this.setState({
            brandName: e.target.value
        }, function () {
            this.props.onChange(this.state);
        });
    }

    render() {

        return (
            <div className="filter">
                <label>
                    <input type="radio" name="brandName" value="Gibson Girl" checked={this.state.brandName === "Gibson Girl"} onChange={this.changeBrand} />
                    Gibson Girl
                </label>
                <label>
                    <input type="radio" name="brandName" value="Ryan Boutique" checked={this.state.brandName === "Ryan Boutique"} onChange={this.changeBrand} />
                    Ryan Boutique
                </label>
                <label>
                    <input type="radio" name="brandName" value="Apollo" checked={this.state.brandName === "Apollo"} onChange={this.changeBrand} />
                    Apollo
                </label>
                <label>
                    <input type="radio" name="brandName" value="ÁVELINE'S" checked={this.state.brandName === "ÁVELINE'S"} onChange={this.changeBrand} />
                    ÁVELINE'S
                </label>
            </div>
        );

    }
}

export default Filter;
