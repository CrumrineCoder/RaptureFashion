import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import { cartActions } from '../../_actions/cart.actions.js';
import BagRow from "../components/bagRow.js";
import BagSubtotal from "../components/bagSubtotal.js"
import { Link } from 'react-router-dom';
import Products from '../../shopify/Products';
import store from '../../store';
/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class BagContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            dresses: [
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
                    price: "14",
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
                    ],
                    size: "S",
                    quantity: 1
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
                    price: "100",
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
                    ],
                    size: "XL",
                    quantity: 1
                }]
        }
        this.removeItem = this.removeItem.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.addVariantToCart = this.addVariantToCart.bind(this);
    }

    removeItem(itemName) {
        let filteredClothes = this.state.dresses.filter(function (obj) {
            return obj.name !== itemName;
        });
        //   let filteredClothes = this.state.dresses.splice(index-1, 1)
        this.setState({
            dresses: filteredClothes
        })
    }

    changeQuantity(index, num) {
        let clonedItems = this.state.dresses;
        clonedItems[index].quantity += num;
        this.setState({
            dresses: clonedItems
        })
    }

    addVariantToCart(variantId, quantity) {
        const state = store.getState(); // state from redux store
        const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
        const checkoutId = state.checkout.id
        state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            store.dispatch({ type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res } });
        });
    }

    render() {
        let pageContent = '';
        // this.props.cart
        pageContent = (
            <ul className="bagRows">
                {this.state.dresses.map((dress, i) => <BagRow changeQuantity={this.changeQuantity} removeItem={this.removeItem} key={i} index={i} {...dress}> </BagRow>)}
            </ul>
        )

        const state = store.getState().home.cart; // state from redux store
        let oProducts = <Products
          products={state.products}
          client={state.client}
          addVariantToCart={this.addVariantToCart}
        />;
        return (
            <div className="">
                <div className="bagHeader">
                    <Link className="bagHeaderLink" to={"/"}><i class="fas fa-arrow-left"></i> Continue Shopping</Link>
                    <h2 className="bagHeaderTitle">Your Shopping Bag </h2>
                </div>
                <div className="bagBody">
                    <div className="bagContHead">
                        <p className="bagItemHeader bagContHeader">Item</p>
                        <p className="bagPriceHeader bagContHeader">Price / Quantity / Subtotal</p>
                    </div>
                    {oProducts}
                </div>
                <BagSubtotal clothing={this.state.dresses}></BagSubtotal>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const cart = state.home.cart.cart;
    return { cart };
}

export default connect(mapStateToProps)(BagContainer);
