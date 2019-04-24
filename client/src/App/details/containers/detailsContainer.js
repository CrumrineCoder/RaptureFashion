import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import { cartActions } from '../../_actions/cart.actions.js';
import store from '../../store';
import VariantSelector from '../../shopify/VariantSelector';
const ONE_SIZE_FITS_MOST = "One Size Fits Most";
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
        this.addCart = this.addCart.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.changeSize = this.changeSize.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const state = store.getState().home.cart; // state from redux store
        const products = state.products;
        let product = products.find(obj => {
            return obj.id === nextProps.id
        })

        let defaultOptionValues = {};
        // Default title
        if (product) {
            product.options.forEach((selector) => {
                defaultOptionValues[selector.name] = selector.values[0].value;
            });
        }

        this.setState({ product, state, selectedOptions: defaultOptionValues });
    }
    componentWillMount() {
        const state = store.getState().home.cart; // state from redux store
        const products = state.products;
        let product = products.find(obj => {
            return obj.id === this.props.id
        })

        let defaultOptionValues = {};
        // Default title
        if (product) {
            product.options.forEach((selector) => {
                defaultOptionValues[selector.name] = selector.values[0].value;
            });
        }

        this.setState({ product, state, selectedOptions: defaultOptionValues });
    }

    addCart(variantId) {
        /*     let clothing = this.state.dress;
             clothing.size = this.state.size;
             clothing.quantity = 1;
             this.props.dispatch(cartActions.addToCart(clothing)); */
        const state = store.getState().home.cart; // state from redux store
        const lineItemsToAdd = [{ variantId, quantity: 1 }]
        const checkoutId = state.checkout.id;
        const additionalData = {
            vendor: this.state.product.vendor
        }
        state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            store.dispatch({ type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res, additionalData, variantId } });
        });
    }

    changeSize(size) {
        this.setState(
            size
        );
        if (size["Size"]) {
            this.setState({
                sizeSelected: true
            });
        }
        this.handleOptionChange(size);
    }

    handleOptionChange(target) {
        // Maybe pass this as a props
        const state = store.getState().home.cart; // state from redux store
        let selectedOptions = this.state.selectedOptions;
        selectedOptions = { ...selectedOptions, ...target }
        const selectedVariant = state.client.product.helpers.variantForOptions(this.state.product, selectedOptions);
        this.setState({
            selectedVariant: selectedVariant,
            selectedVariantImage: selectedVariant.attrs.image
        });
    }

    render() {
        let cart = "";
       
        if (this.state.product) {
         
            if (this.state.sizeSelected || this.state.product.options["0"].values.length == 1) {
                cart = (
                    <button className="detailsCartButton enabledCartButton" onClick={() => this.addCart(variant.id)}>Add to Cart</button>
                )
            } else {
                cart = (
                    <button className="detailsCartButton disabledCartButton">Select a Size</button>
                )
            }
        }

        let img;
        let rightHand;
        let variant = "Loading price...";
        if (this.state.product) {
            img = (
                <div className="detailsImageScrollContainer">
                    {this.state.product.images.map((img, i) => <img className="detailsImage" src={this.state.product.images[i].src} />)}
                </div>
            )
            let aOptionNames = [];
            variant = this.state.selectedVariant || this.state.product.variants[0];
            let variantSelectors = this.state.product.options.map((option) => {
                if (option.values.length > 1) {
                    aOptionNames.push(option.name);
                    return (
                        <VariantSelector
                            handleOptionChange={this.handleOptionChange}
                            key={option.id.toString()}
                            option={option}
                            changeProperty={this.changeSize}
                            currentProperty={this.state.Size}
                            propertyName={option.name}
                        />
                    );
                }
            });
            // If there's no variant selectors, then just use one size fits most
            let bShowOneSizeFitsMost = (variantSelectors.length === 1 && aOptionNames[0] === "Title");
            let desc = new DOMParser().parseFromString(this.state.product.descriptionHtml, "text/xml").getElementById("horn").children;
            desc = Array.prototype.slice.call(desc);
            desc = desc.map(a => a.innerHTML);
            rightHand = (
                <div className="detailsRightHandInfo">
                    <h4 className="detailsName">{this.state.product.title}</h4>
                    <p className="detailsBrand">{this.state.product.vendor}</p>
                    <h4 className="detailsPrice">{variant.price} USD</h4>
                    <div className="detailsSizeBox">
                        <p className="detailsSizeBoxTitle">Size</p>
                        <p className="detailsSizeBoxLink">Size Chart</p>
                        {bShowOneSizeFitsMost ? <h5 className="Product__title">{ONE_SIZE_FITS_MOST}</h5> : variantSelectors}
                    </div>
                    {cart}
                    <p className="detailsDescriptionText">{desc[0]}</p>
                    <p className="detailsTipText"><b>Style Tip:</b> {desc[1]}</p>
                    <div className="detailsDescContainer">
                        <img className="detailsDescImage" id="hangerImage" src={require("../../../assets/Icons/hanger.png")} />
                        <p className="detailsDescText">{desc[2]}</p>
                    </div>
                    <div className="detailsDescContainer">
                        <img className="detailsDescImage" src={require("../../../assets/Icons/fabric.png")} />
                        <p className="detailsDescText">{desc[3]}</p>
                    </div>
                    <div className="detailsDescContainer">
                        <i className="fas fa-pencil-ruler detailsDescImage"></i>
                        <p className="detailsDescText" dangerouslySetInnerHTML={{ __html: desc[4] }}></p>
                    </div>
                    <div className="detailsDescContainer">
                        <i className="fas fa-box-open detailsDescImage"></i>
                        <p className="detailsDescText" dangerouslySetInnerHTML={{ __html: desc[5] }}></p>
                    </div>
                </div>
            )
        } else {
            img = (
                <div className="detailsImageScrollContainer">Loading images..</div>
            )
            rightHand = (
                <div className="detailsRightHandInfo">Loading content..</div>
            )
        }



        return (
            <div>
                <div className="detailsContainer">
                    {img}
                    {rightHand}
                </div>
                <div className="detailsRecommendation">
                    <h1>Get the Look</h1>
                    {this.state.product &&
                        <div>
                            <ClothingBox dress={this.state.product}></ClothingBox>
                            <ClothingBox dress={this.state.product}></ClothingBox>
                            <ClothingBox dress={this.state.product}></ClothingBox>
                        </div>
                    }
                </div>
            </div>
        );



    }
}

export default connect((state) => state)(DetailsContainer);
