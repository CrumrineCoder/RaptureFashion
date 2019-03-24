import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import { cartActions } from '../../_actions/cart.actions.js';
import CheckoutBox from "../components/checkoutBox.js"
/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class CheckoutContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
        }
    }


    render() {

        let pageContent = 'lol';
        var dresses = [
            {
                name: "Deco Purple & Black Sequin Veronique Fringe Flapper Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/61626/61626-1_2048x2048.jpg",
                    "Dresses/61626/61626-2_2048x2048.jpg",
                    "Dresses/61626/61626-3_2048x2048.jpg",
                    "Dresses/61626/61626-4_2048x2048.jpg",
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
            },
            {
                name: "Navy Hemingway Flapper Dress",
                brandName: "Ryan Boutique",
                images: [
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_6_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_2_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_4_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_3_1024x1024.jpg"
                ],
                price: 74.00,
                color: ["Blue"],
                desc: "It’s time to go totally Gatsby, darling! With this navy Hemingway flapper dress, you can achieve that perfect 1920s look without all of the effort. This fabulous frock features a slightly fitted shape with a narrow waist, V-neck and loose, knee-length skirt. A slight cowl neck with draping across the neckline and back adds an extra feminine touch to this flapper dress. Panels of matching navy-blue lace are situated between the pleats of the skirt and underneath the draped back, while art deco sequined details line the drop waist and décolletage. There’s even a bit of lace detailing in the center of the neckline to show a bit of skin without revealing too much. \n Create a completely retro look that pairs perfectly with sky-high pumps, a perfectly matte red lip and a matching feather headband with this navy Hemingway flapper dress from Unique Vintage. You’ll look absolutely lovely wearing this stylish flapper dress for all kinds of occasions, whether it’s for a 1920s theme party, a holiday bash or even a very special date night. With just the right hint of sparkle, you’re sure to shine in this art deco stunner. Order yours from Unique Vintage and enjoy free shipping on orders of $150 or more. \n Available in sizes XS-4X while supplies last.",
                details: [
                    "Imported",
                    "Professional spot clean",
                    "Lightweight chiffon",
                    "Pullover dress",
                    "Sequin and bead detailing",
                    "Chiffon panel hem",
                    "Subtle lace detail",
                    "Moderately lined",
                    "Material does not provide stretch",
                    "Model Info: Height: 5’8\” | Bust: 34B | Waist: 24 | Hip: 36"
                ]
            }];
        // this.props.cart
        pageContent = (
            <ul className="help">
                {dresses.map((dress, i) => <CheckoutBox key={i} {...dress}> </CheckoutBox>)}
            </ul>
        )
        return (
            <div>
                <h2>Shopping Cart</h2>
                
                {pageContent}
            </div>
        );

    }
}

function mapStateToProps(state) {
    const cart = state.home.cart.cart;
    return { cart };
}

export default connect(mapStateToProps)(CheckoutContainer);
