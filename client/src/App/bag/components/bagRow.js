import React, { Component } from 'react';
import ColorBox from '../../common/components/ColorBox';

class BagRow extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            quantity: 1
        }
        this.addZeroes = this.addZeroes.bind(this);
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

    changeQuantity(num){
        this.setState({
            quantity: this.state.quantity+num
        })
    }

    render() {
        // TO DO: ADD LINK
        console.log(this.props);
        let colorBoxes = "";
        colorBoxes = (
            <ul className="bagColors">
                {this.props.color.map((color, i) =>  <ColorBox readOnly={true} key={i} Color={color}></ColorBox>)}
            </ul>
        )
        let price = this.addZeroes(this.props.price);
        let calculatedPrice = parseInt(this.props.price)*this.state.quantity;
        return (
            <div className="checkout">
                <img className="checkoutCell mediumCell" src={require("../../../assets/" + this.props.images[0])} />
                <div className="bigCell">
                    <h3 className="checkoutCell">{this.props.name}</h3>
                    <h3 className="checkoutCell">{this.props.brandName}</h3>
                    {colorBoxes}
                    <p className="bagSmallText"><b>Size:</b> S</p>
                </div>
                <h3 className="checkoutCell littleCell">{price}</h3>
                <div className="checkoutCell littleCell">
                    <button className={this.state.quantity>0 ? 'Blue' : 'Purple'} onClick={() => this.changeQuantity(-1)}>-</button>
                    <div>{this.state.quantity}</div>
                    <button onClick={() => this.changeQuantity(1)}>+</button>
                </div>
                <h3 className="checkoutCell littleCell">{calculatedPrice}</h3>
                <h3 className="checkoutCell littleCell">X</h3>
            </div>
        )
    }
}

export default BagRow;