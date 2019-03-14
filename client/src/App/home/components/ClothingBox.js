import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ClothingBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            dress: {}
        }
    }

    componentWillMount() {
        this.setState({ dress: this.props.dress });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ dress: nextProps.dress });
    }

    render() {
        // TO DO: ADD LINK
        return (
            <div className="clothingBox">
                <Link to={"/products/" + this.props._id}>
                    <img className="clothingBoxImage rounded"
                        src={require("../../../assets/" + this.state.dress.images[0])}
                        onMouseOver={e => (e.currentTarget.src = require("../../../assets/" + this.state.dress.images[1]))}
                        onMouseOut={e => (e.currentTarget.src = require("../../../assets/" + this.state.dress.images[0]))}
                    />
                    <p className="clothingBoxTitle clothingBoxDesc">{this.state.dress.name}</p>
                    <p className="clothingBoxSubTitle clothingBoxDesc">{this.state.dress.brandName}</p>
                    <p className="clothingBoxPrice clothingBoxDesc">${this.state.dress.price}</p>
                </Link>
            </div>
        )
    }
}

export default ClothingBox;