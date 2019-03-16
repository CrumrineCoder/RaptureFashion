import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class DetailsContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
        };
    }

    render() {
        let dress = {
            name: "Deco Purple & Black Sequin Veronique Fringe Flapper Dress",
            brandName: "Gibson Girl",
            images: [
                "Dresses/61626/61626-1_2048x2048.jpg",
                "Dresses/61626/61626-2_2048x2048.jpg",
                "Dresses/61626/61626-3_2048x2048.jpg",
                "Dresses/61626/61626-4_1024x1024.jpg",
                "Dresses/61626/61626-5_2048x2048.jpg"
            ],
            price: 14.00,
            color: ["Purple", "Black"],
            desc: "With a bit of royalty and aristocratic detail, the Veronique Flapper dress is fresh from Unique Vintage in stunning 1920s design. Intricately deco beaded black mesh boasts black iridescent sequins and small black beads wrought in flourishing deco swirls and spirals, while a deep eggplant purple knit lining creates a radiant effect. The sleeveless, v-neck design shows you off with a modest touch, while the curve hugging fit and jagged edge dripping with fringe will turn every head!  \n Available in sizes S-3X while supplies last.",
            details: [
                "Imported",
                "Side Zipper",
                "Sheer Beaded Mesh Over Knit Lining",
                "Some Stretch",
                "Length Includes Fringe",
                "Model Pictured Wearing Size M; Medium Length 43",
                "Model Info: Height: 5’9\” | Waist: 26 | Hips: 36.5 | Bust: 34C"
            ]
        }
        return (
            <div className="detailsContainer">
                <div className="detailsImageScrollContainer">
                    <img className="detailsImage" src={require("../../../assets/" + dress.images[0])} />
                    <img className="detailsImage" src={require("../../../assets/" + dress.images[1])} />
                    <img className="detailsImage" src={require("../../../assets/" + dress.images[2])} />
                    <img className="detailsImage" src={require("../../../assets/" + dress.images[3])} />
                    <img className="detailsImage" src={require("../../../assets/" + dress.images[4])} />
                </div>
                <div className="detailsRightHandInfo">
                    <h4 className="detailsName">{dress.name}</h4>
                    <p className="detailsBrand">{dress.brandName}</p>
                    <h4 className="detailsPrice">${dress.price}</h4>
                    <div className="detailsSizeBox">
                        <p className="detailsSizeBoxTitle">Size</p>
                        <p className="detailsSizeBoxLink">Size Chart</p>
                        <div className="detailsSizeBoxList">
                            <button className="detailsSizeBoxListButton">2</button>
                            <button className="detailsSizeBoxListButton">4</button>
                            <button className="detailsSizeBoxListButton">6</button>
                            <button className="detailsSizeBoxListButton">8</button>
                            <button className="detailsSizeBoxListButton">10</button>
                            <button className="detailsSizeBoxListButton">12</button>
                        </div>
                    </div>
                    <button className="detailsCartButton">Add to Cart</button>

                </div>
            </div>
        );

    }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(DetailsContainer);
