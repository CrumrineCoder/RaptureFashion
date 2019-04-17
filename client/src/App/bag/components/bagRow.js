import React, { Component } from 'react';
import ColorBox from '../../common/components/ColorBox';
import { connect } from 'react-redux';

class BagRow extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            quantity: 1
        }
        this.addZeroes = this.addZeroes.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const state = nextProps.state; // state from redux store
        const products = state.products;
        let product = products.find(obj => {
            return obj.id === nextProps.line_item.id
        })
        this.setState({ product, state });
    }
    componentWillMount() {
        const state = this.props.state; // state from redux store
        const products = state.products[0].variants;
        let product = products.find(obj => {
            return obj.id === this.props.line_item.id
        });
        this.setState({ product, state });
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

    changeQuantity(num) {
        this.setState({
            quantity: this.state.quantity + num
        })
    }

    render() {
        // TO DO: ADD LINK
        //     let price = this.addZeroes(this.props.price);
        //     let calculatedPrice = this.addZeroes((parseInt(this.props.price) * this.props.quantity).toString());
        console.log("Props", this.props);
        let Color = this.props.line_item.variant.selectedOptions["1"].value.replace(/\//g, '');
        return (
            <div className="bagRow">
                {this.props.line_item.variant.image ? <img className="bagCell bagImg" src={this.props.line_item.variant.image.src} alt={`${this.props.line_item.title} product shot`} /> : null}
                <div className="bagItem">
                    <h3 className="bagCell">{this.props.line_item.title}</h3>
                    <h3 className="bagCell">{this.props.home.cart.additionalData.vendor}</h3>
                    <p className="bagSmallText"><b>Color:</b> <ColorBox readOnly={true} Color={Color}></ColorBox></p>
                    <p className="bagSmallText"><b>Size:</b> {this.props.line_item.variant.selectedOptions["0"].value}</p>
                </div>
                <div className="bagCell bagQuantity">
                    <h3 className="bagCell">$ {(this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2)}</h3>
                </div>
            </div>
        )
        /* 
                <div className="bagCell bagQuantity">
                    <h3 className="bagCell">${price}</h3>
                    <button className={this.props.quantity > 1 ? 'bagQuantityButton' : 'bagQuantityButton bagQuantityButtonDisabled'} disabled={this.props.quantity <= 1} onClick={() => this.props.changeQuantity(this.props.index, -1)}>-</button>
                    <input readonly="" type="numeric" className="bagQuantityAmount" value={this.props.quantity}></input>
                    <button className="bagQuantityButton" onClick={() => this.props.changeQuantity(this.props.index, 1)}>+</button>
                    <h3 className="bagCell">${calculatedPrice}</h3>
                    <i onClick={() => this.props.removeItem(this.props.name)} class="fas fa-trash bagCell bagRowDelete"></i>
                </div>
                */
    }
}

export default connect((state) => state)(BagRow);