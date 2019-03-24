import React, { Component } from 'react';

class CheckoutBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            box: {}
        }
    }

    componentWillMount(){
        console.log("You can hardly breathe")
    }

    render(){
        // TO DO: ADD LINK
        console.log(this.props);
        let pageContent = '';
        pageContent = (
            <ul className="checkoutCell mediumCell">
                {this.props.color.map((color, i) => <li key={i}>{color}</li>)}
            </ul>
        )
        return(
            <div className="checkout">
              <img className="checkoutCell mediumCell" src={require("../../../assets/" + this.props.images[0])} />
              <h3 className="checkoutCell bigCell">{this.props.name}</h3>
              {pageContent}
              <h3 className="checkoutCell littleCell">S</h3>
              <h3 className="checkoutCell littleCell">1</h3>
              <h3 className="checkoutCell littleCell">{this.props.price}</h3>
              <h3 className="checkoutCell littleCell">X</h3>
            </div>
        )
    }
}

export default CheckoutBox;