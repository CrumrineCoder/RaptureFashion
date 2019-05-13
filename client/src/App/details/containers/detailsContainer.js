import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import store from '../../store';
import VariantSelector from '../../shopify/VariantSelector';
const ONE_SIZE_FITS_MOST = "One Size Fits Most";

// One product details page
class DetailsContainer extends Component {

    constructor(props) {
        super(props);
        // Which size of the dress does the user want
        this.state = {
            sizeSelected: false
        };
        this.addCart = this.addCart.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.changeSize = this.changeSize.bind(this);
    }
    // Add cart, product, and options from product to the state on load   
    componentWillMount() {
        const state = store.getState().home.cart; // state from redux store
        const products = state.products;
        // Find the specific product we're looking at
        let product = products.find(obj => {
            return obj.id === this.props.id
        })

        let defaultOptionValues = {};
        // Default title (since it's not within the variant, thanks Shopify)
        if (product) {
            product.options.forEach((selector) => {
                defaultOptionValues[selector.name] = selector.values[0].value;
            });
        }

        this.setState({ product, state, selectedOptions: defaultOptionValues });
    }
    // Repeat the above whenever we receive props
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

    // Functionality for add to cart button
    addCart(variantId) {
        const state = store.getState().home.cart; // state from redux store
        const lineItemsToAdd = [{ variantId, quantity: 1 }]
        const checkoutId = state.checkout.id;
        const additionalData = {
            vendor: this.state.product.vendor
        }
        // Using the  id of the line item, the id of the checkout, and the vendor (we have to send it manually, thanks Shopify), add the variant to the cart
        state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            store.dispatch({ type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res, additionalData, variantId } });
        });
    }

    // Change the local size selected
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

    // Change the selected variant we're currently hosting to be sent to the cart when the user decides to 
    handleOptionChange(target) {
        // Maybe pass this as a props
        const state = store.getState().home.cart; // state from redux store
        let selectedOptions = this.state.selectedOptions;
        selectedOptions = { ...selectedOptions, ...target }
        // Use Shopify to get the variant based on the product and the options
        const selectedVariant = state.client.product.helpers.variantForOptions(this.state.product, selectedOptions);
        this.setState({
            selectedVariant: selectedVariant,
            selectedVariantImage: selectedVariant.attrs.image
        });
    }

    render() {
        let cart = "";

        // If the product is loaded
        if (this.state.product) {
            // If we have a size selected or there is only one size, show the cart button
            if (this.state.sizeSelected || this.state.product.options["0"].values.length === 1) {
                cart = (
                    <button className="detailsCartButton enabledCartButton" onClick={() => this.addCart(variant.id)}>Add to Cart</button>
                )
            } // Tell the user to select a size if they've not already
            else {
                cart = (
                    <button className="detailsCartButton disabledCartButton">Select a Size</button>
                )
            }
        }

        let img;
        let rightHand;
        let related;
        let variant = "Loading price...";
        // If the product is loaded 
        if (this.state.product) {
            // Go through the array of model images and post them to the left into a scroll container
            img = (
                <div className="detailsImageScrollContainer">
                    {this.state.product.images.map((img, i) => <img className="detailsImage" key={i} src={img.src} alt="Model" />)}
                </div>
            )
            let aOptionNames = [];
            // Get the current variant
            variant = this.state.selectedVariant || this.state.product.variants[0];
            let variantSelectors;
            if (this.state.product) {
                // eslint-disable-next-line array-callback-return
                variantSelectors = this.state.product.options.map((option) => {
                    // If the option has more than 1 option
                    if (option.values.length > 1) {
                        // Add it to the options
                        aOptionNames.push(option.name);
                        // Create a variant selector out of the options
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
            }
            // If there's no variant selectors, then just use one size fits most
            let bShowOneSizeFitsMost = (variantSelectors.length === 1 && aOptionNames[0] === "Title");
            // Get the Desc
            let desc = new DOMParser().parseFromString(this.state.product.descriptionHtml, "text/xml").getElementById("horn").children;
            desc = Array.prototype.slice.call(desc);
            desc = desc.map(a => a.innerHTML);
            // Generate right hand info from desc
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
                        <img className="detailsDescImage" id="hangerImage" src={require("../../../assets/Icons/hanger.png")} alt="Hanger" />
                        <p className="detailsDescText">{desc[2]}</p>
                    </div>
                    <div className="detailsDescContainer">
                        <img className="detailsDescImage" src={require("../../../assets/Icons/fabric.png")} alt="Fabric" />
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
            // Get related products IDs from Shopify desc (Thanks shopify!)
            let relatedProducts = new DOMParser().parseFromString(this.state.product.descriptionHtml, "text/xml").getElementById("relatedProducts").children;
            relatedProducts = Array.prototype.slice.call(relatedProducts);
            relatedProducts = relatedProducts.map(a => a.innerHTML);
            const state = store.getState().home.cart; // state from redux store
            // Get the projects that match the Ids retrieved from shopify
            var results = state.products.filter(obj => {
                return relatedProducts.indexOf(obj.id) !== -1
            })
            // Generate related products
            related = (
                <div>
                    {results.map((result, i) => <ClothingBox dress={result}></ClothingBox>)}
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
                    {related}
                </div>
            </div>
        );



    }
}

export default connect((state) => state)(DetailsContainer);
