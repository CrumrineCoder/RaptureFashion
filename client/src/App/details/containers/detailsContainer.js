import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import { cartActions } from '../../_actions/cart.actions.js';
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
            sizeSelected: false,
            size: "",
            dress: {
                name: "Deco Purple & Black Sequin Veronique Fringe Flapper Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/61626/61626-1_2048x2048.jpg",
                    "Dresses/61626/61626-2_2048x2048.jpg",
                    "Dresses/61626/61626-3_2048x2048.jpg",
                    "Dresses/61626/61626-4_1024x1024.jpg",
                    "Dresses/61626/61626-5_2048x2048.jpg"
                ],
                price: "14",
                color: ["Purple", "Black"],
                desc: "With a bit of royalty and aristocratic detail, the Veronique Flapper dress is fresh from Unique Vintage in stunning 1920s design. Intricately deco beaded black mesh boasts black iridescent sequins and small black beads wrought in flourishing deco swirls and spirals, while a deep eggplant purple knit lining creates a radiant effect. The sleeveless, v-neck design shows you off with a modest touch, while the curve hugging fit and jagged edge dripping with fringe will turn every head!  \n Available in sizes S-3X while supplies last.",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "Made from authentic indigo dyes, so color transfer may occur. Wash inside out cold with like colors. Tumble dry low.",
                fabric: "Sheer beaded mesh over knit lining | 99% Polyester",
                details: [
                    "Side Zipper",
                    "Some Stretch",
                    "Length Includes Fringe",
                    "Model Pictured Wearing Size M; Medium Length 43",
                    "Model Info: Height: 5’9\” | Waist: 26 | Hips: 36.5 | Bust: 34C"
                ],
                sizes: [
                    "2",
                    "4",
                    "6",
                    "8",
                    "10",
                    "12"
                ]
            }
        };
        this.addZeroes = this.addZeroes.bind(this);
        this.addCart = this.addCart.bind(this);
    }

    addCart(){
        let clothing = this.state.dress;
        clothing.size = this.state.size;
        clothing.quantity = 1; 
        this.props.dispatch(cartActions.addToCart(clothing));
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

    changeSize(size) {
        this.setState(
            size
        );
        this.setState({
            sizeSelected: true
        });
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
            price: "14",
            color: ["Purple", "Black"],
            desc: "With a bit of royalty and aristocratic detail, the Veronique Flapper dress is fresh from Unique Vintage in stunning 1920s design. Intricately deco beaded black mesh boasts black iridescent sequins and small black beads wrought in flourishing deco swirls and spirals, while a deep eggplant purple knit lining creates a radiant effect. The sleeveless, v-neck design shows you off with a modest touch, while the curve hugging fit and jagged edge dripping with fringe will turn every head!  \n Available in sizes S-3X while supplies last.",
            tip: "Pair with studded ankle boots for a simple yet rebellious look.",
            wash: "Made from authentic indigo dyes, so color transfer may occur. Wash inside out cold with like colors. Tumble dry low.",
            fabric: "Sheer beaded mesh over knit lining | 99% Polyester",
            details: [
                "Side Zipper",
                "Some Stretch",
                "Length Includes Fringe",
                "Model Pictured Wearing Size M; Medium Length 43",
                "Model Info: Height: 5’9\” | Waist: 26 | Hips: 36.5 | Bust: 34C"
            ],
            sizes: [
                "2",
                "4",
                "6",
                "8",
                "10",
                "12"
            ]
        }
        let details = ""
        details = (
            <ul className="detailsDescUL">
                {dress.details.map((detail, i) => <li className="detailsDescLI" key={i}> {detail} </li>)}
            </ul>
        )

        let returns = (
            <ul className="detailsDescUL">
                <li className="detailsDescLI">Delivery in Rapture within 1 to 3 business days</li>
                <li className="detailsDescLI">Delivery in North America and Europe within 4 to 7 business days </li>
                <li className="detailsDescLI">Up to 15 days to make return</li>
            </ul>
        )

        console.log(this.state.size);
        console.log(this.state);

        let sizes = (
            <div className="detailsSizeBoxList">
                {dress.sizes.map((size, i) => <button onClick={() => this.changeSize({ size })} className={this.state.size === size ? 'detailsSizeBoxListButton detailsSizeBoxListButtonActive' : 'detailsSizeBoxListButton'} key={i}> {size}</button>)}
            </div>
        )

        let cart = "";

        if (this.state.sizeSelected) {
            cart = (
                <button className="detailsCartButton enabledCartButton" onClick={this.addCart}>Add to Cart</button>
            )
        } else {
            cart = (
                <button className="detailsCartButton disabledCartButton">Select a Size</button>
            )
        }


        /* Wishlist? */
        dress.price = this.addZeroes(dress.price);
        return (
            <div>
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
                        <h4 className="detailsPrice">{dress.price} USD</h4>
                        <div className="detailsSizeBox">
                            <p className="detailsSizeBoxTitle">Size</p>
                            <p className="detailsSizeBoxLink">Size Chart</p>
                            {sizes}
                        </div>
                        {cart}
                        <p className="detailsDescriptionText">{dress.desc}</p>
                        <p className="detailsDescriptionText"><b>Style Tip:</b> {dress.tip}</p>
                        <div className="detailsDescContainer">
                            <img className="detailsDescImage" id="hangerImage" src={require("../../../assets/Icons/hanger.png")} />
                            <p className="detailsDescText">{dress.wash}</p>
                        </div>
                        <div className="detailsDescContainer">
                            <img className="detailsDescImage" src={require("../../../assets/Icons/fabric.png")} />
                            <p className="detailsDescText">{dress.fabric}</p>
                        </div>
                        <div className="detailsDescContainer">
                            <i className="fas fa-pencil-ruler detailsDescImage"></i>
                            <p className="detailsDescText">{details}</p>
                        </div>
                        <div className="detailsDescContainer">
                            <i className="fas fa-box-open detailsDescImage"></i>
                            <p className="detailsDescText">{returns}</p>
                        </div>
                    </div>
                </div>
                <div className="detailsRecommendation">
                    <h1>Get the Look</h1>
                    <ClothingBox dress={dress}></ClothingBox>
                    <ClothingBox dress={dress}></ClothingBox>
                    <ClothingBox dress={dress}></ClothingBox>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    console.log(state.home);
}

export default connect(mapStateToProps)(DetailsContainer);
