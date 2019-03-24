import React, { Component } from 'react';
import ColorBox from '../../common/components/ColorBox';

class BagRow extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            box: {}
        }
    }

    componentWillMount() {
        console.log("You can hardly breathe")
    }

    render() {
        // TO DO: ADD LINK
        console.log(this.props);
        let colorBoxes = "";
        colorBoxes = (
            <ul className="checkoutCell">
                {this.props.color.map((color, i) =>  <ColorBox readOnly={true} key={i} Color={color}></ColorBox>)}
            </ul>
        )
        return (
            <div className="checkout">
                <img className="checkoutCell mediumCell" src={require("../../../assets/" + this.props.images[0])} />
                <div className="bigCell">
                    <h3 className="checkoutCell">{this.props.name}</h3>
                    <h3 className="checkoutCell">{this.props.brandName}</h3>
                    <p><b>Color:</b> {colorBoxes}</p>
                    <p><b>Size:</b> S</p>
                </div>
                <h3 className="checkoutCell littleCell">{this.props.price}</h3>
                <h3 className="checkoutCell littleCell">1</h3>
                <h3 className="checkoutCell littleCell">new price: {this.props.price}</h3>
                <h3 className="checkoutCell littleCell">X</h3>
            </div>
        )
    }
}

export default BagRow;