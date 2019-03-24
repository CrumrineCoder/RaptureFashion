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
        return(
            <div className="honk">
              Mess
            </div>
        )
    }
}

export default CheckoutBox;