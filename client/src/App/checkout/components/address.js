import React, { Component } from 'react';

class Address extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            email: "",
            fName: "",
            lName: "",
            address: "",
            apartment: "",
            city: "",
            country: "",
            phone: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {

        return (
            <div className="checkoutAddress">
                <p>Already have an account? Log In</p>
                <h3>Contact Information</h3>
                {this.state.country}
                <input type="text" placeholder="Email" name="email" onChange={this.handleInputChange} value={this.state.email}></input>
                <h3>Shipping Address</h3>
                <input type="text" placeholder="First name" name="fName" onChange={this.handleInputChange} value={this.state.fName}></input>
                <input type="text" placeholder="Last name" name="lName" onChange={this.handleInputChange} value={this.state.lName}></input>
                <input type="text" placeholder="Address" name="address" onChange={this.handleInputChange} value={this.state.address}></input>
                <input type="text" placeholder="Apartment, suite, etc. (optional)" name="apartment" onChange={this.handleInputChange} value={this.state.apartment}></input>
                <input type="text" placeholder="City" name="city" onChange={this.handleInputChange} value={this.state.city}></input>
                <select name="country" onChange={this.handleInputChange} value={this.state.country}>
                    <option value="NULL">Select a Country</option>
                    <option value="Canada">Canada</option>
                    <option value="Rapture">Rapture</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                </select>
                <input type="text" placeholder="Phone" name="phone" onChange={this.handleInputChange} value={this.state.phone}></input>
                <button>Continue to Shipping</button>
            </div>
        )
    }
}

export default Address;