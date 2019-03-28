import React, { Component } from 'react';
import ColorBox from '../../common/components/ColorBox';

class BagSubtotal extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            price: "0"
        }
        this.addZeroes = this.addZeroes.bind(this);
    }

    componentWillMount(){
        console.log(this.props.clothing);
        let sum = "0";
        for(var i=0; i<this.props.clothing.length; i++){
            let calculatedPrice = (parseInt(this.props.clothing[i].price) * this.props.clothing[i].quantity);
            console.log("Calculated price", calculatedPrice);
            console.log("Price", sum);
            calculatedPrice += parseInt(sum);
            calculatedPrice = this.addZeroes(calculatedPrice.toString());
            console.log("Calculated price 2", calculatedPrice)
           sum = calculatedPrice;
        }
        this.setState({
            price: sum
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
        console.log(this.props);
        return (
            <div className="checkout">
                <p>Order Summary</p>
                <p>Subtotal: {this.state.price}</p>
            </div>
        )
    }
}

export default BagSubtotal;