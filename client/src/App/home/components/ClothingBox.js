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
      //  let variant = this.state.selectedVariant || this.state.dress.variants[0];
        let img;
        if (this.state.dress.images.length === 1) {
            img = (
                <img className="clothingBoxImage rounded"
                    src={this.state.dress.images[0].src}
                    alt="Clothing"
                />
            )
        } else {
            img = (
                <img className="clothingBoxImage rounded"
                    src={this.state.dress.images[0].src}
                    onMouseOver={e => (e.currentTarget.src = this.state.dress.images[1].src)}
                    onMouseOut={e => (e.currentTarget.src = this.state.dress.images[0].src)}
                    alt="Clothing"
                />
            )
        }
        return (
            <div className="clothingBox">
                <Link to={"/products/" + this.state.dress.id} className="yellowLink">
                    {img}
                    <div className="clothingBoxFooter">
                        {this.state.dress.title}
                    </div>
                </Link>
            </div>
        )
        /* 
                <p className="clothingBoxTitle clothingBoxDesc">{this.state.dress.title}</p>
                    <p className="clothingBoxSubTitle clothingBoxDesc">{this.state.dress.vendor}</p>
                    <p className="clothingBoxPrice clothingBoxDesc">${variant.price}</p>
                    */
    }
}

export default ClothingBox;