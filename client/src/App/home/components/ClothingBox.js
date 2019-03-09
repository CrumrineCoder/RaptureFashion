import React, { Component } from 'react';

class ClothingBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            dress: {}
        }
    }

    componentWillMount(){
        this.setState({ dress: this.props.dress });
    }

    render(){
        return(
            <div>
                <p>{this.state.dress.name}</p>
            </div>
        )
    }
}

export default ClothingBox;