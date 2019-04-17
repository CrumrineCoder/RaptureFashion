import React, { Component } from 'react';
import ColorBox from '../../common/components/ColorBox';
import { Link } from 'react-router-dom';

class BagSubtotal extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            subTotal: "0",
            estimatedShipping: "6.00"
        }
        this.addZeroes = this.addZeroes.bind(this);
    }

    componentWillMount() {
        let sum = "0";
        for (var i = 0; i < this.props.clothing.length; i++) {
            let calculatedPrice = (parseInt(this.props.clothing[i].price) * this.props.clothing[i].quantity);
            calculatedPrice += parseInt(sum);
            calculatedPrice = this.addZeroes(calculatedPrice.toString());
            sum = calculatedPrice;
        }
        let total = this.addZeroes((parseInt(sum) + parseInt(this.state.estimatedShipping)).toString());
        this.setState({
            subTotal: sum,
            total: total
        })
    }

    addZeroes(num) {
        // Convert input string to a number and store as a variable.
        var value = Number(num);
        // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");
        // If there is no decimal point or only one decimal place found.
        if (res.length == 1 || res[1].length < 3) {
            // Set the number to two decimal places
            value = value.toFixed(2);
        }
        // Return updated or original number.
        return value;
    }

    changeQuantity(num) {
        this.setState({
            quantity: this.state.quantity + num
        })
    }

    render() {
        console.log("BAG SUBTOTAL PROPS", this.props); 
        return (
            <div className="bagSubtotalContainer">
                <div className="bagHeader">
                    <h2 className="bagHeaderTitle">Order Summary</h2>
                </div>
                <div className="bagBody">
                    <p>Subtotal: ${this.props.checkout.subtotalPrice}</p>
                    <p>Estimated Shipping: ${this.state.estimatedShipping}</p>
                    <p>Total: ${this.state.total}</p>
                    <Link to={"/checkout"}><button>Secure Checkout</button></Link>
                </div>
            </div>
        )
    }
}

export default BagSubtotal;