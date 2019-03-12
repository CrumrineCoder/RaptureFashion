import React, { Component } from 'react';

// Landing page 
class Filter extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            brandName: "",
            color: []
        };
        this.changeFilter = this.changeFilter.bind(this);
    }

    changeFilter(e) {
        var selector = e.target.filter;
        this.setState({
            selector: e.target.value
        }, function () {
            this.props.onChange(this.state);
        });
    }

    render() {

        return (
            <div className="filter">
                <div className="filterRow">
                    <label>
                        <input type="radio" name="brandName" value="Gibson Girl" checked={this.state.brandName === "Gibson Girl"} filter="brandName" onChange={this.changeFilter} />
                        Gibson Girl
                    </label>
                    <label>
                        <input type="radio" name="brandName" value="Ryan Boutique" checked={this.state.brandName === "Ryan Boutique"} filter="brandName" onChange={this.changeFilter} />
                        Ryan Boutique
                    </label>
                    <label>
                        <input type="radio" name="brandName" value="Apollo" checked={this.state.brandName === "Apollo"} filter="brandName" onChange={this.changeFilter} />
                        Apollo
                    </label>
                    <label>
                        <input type="radio" name="brandName" value="ÁVELINE'S" checked={this.state.brandName === "ÁVELINE'S"} filter="brandName" onChange={this.changeFilter} />
                        ÁVELINE'S
                    </label>
                </div>
                <div className="filterRow">
                    <label>
                        <input type="radio" name="color" value="Purple" checked={this.state.color === "Purple"} filter="color" onChange={this.changeFilter} />
                        Purple
                    </label>
                    <label>
                        <input type="radio" name="color" value="Black" checked={this.state.color === "Black"} filter="color" onChange={this.changeFilter} />
                        Black
                    </label>
                    <label>
                        <input type="radio" name="color" value="Blue" checked={this.state.color === "Blue"} filter="color" onChange={this.changeFilter} />
                        Blue
                    </label>
                    <label>
                        <input type="radio" name="color" value="Green" checked={this.state.color === "Green"} filter="color" onChange={this.changeFilter} />
                        Green
                    </label>
                    <label>
                        <input type="radio" name="color" value="White" checked={this.state.color === "White"} filter="color" onChange={this.changeFilter} />
                        White
                    </label>
                </div>
            </div>
        );

    }
}

export default Filter;
