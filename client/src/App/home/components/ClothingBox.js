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
            <div className="clothingBox">
                <img className="clothingBoxImage" src={require("../../../assets/"+this.state.dress.images[0])} />
                <p className="clothingBoxTitle clothingBoxDesc">{this.state.dress.name}</p>
                <p className="clothingBoxSubTitle clothingBoxDesc">{this.state.dress.brandName}</p>
                <p className="clothingBoxPrice clothingBoxDesc">${this.state.dress.price}</p>
            </div>
        )
    }
}

export default ClothingBox;