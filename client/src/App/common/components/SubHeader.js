import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import PropTypes from 'prop-types';

// Header hosts navigation info at the top of the screen. It appears on all pages.
// Redirects to landing page, and depending on if the user is logged in redirect to either the profile or logout page, or if they're not logged in then login or register page 
class SubHeader extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.select = this.select.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            isOpen: false,
            brandDropdownOpen: false,
            clothingDropdownOpen: false,
            brand: '',
            clothing: ''
            //		isLoggedIn: typeof localStorage["user"] !== 'undefined'
        };
    }
    componentDidMount() {
        this.setState({
            brand: 'Brand',
            clothing: 'Clothing'
        })
    }

    componentDidUpdate() {
        let brand = this.state.brand;
        let clothing = this.state.clothing;
        if (this.state.brand == "Brand") {
            brand = "all";
        }
        if (this.state.clothing == "Clothing") {
            clothing = "all"
        }
        this.props.history.push('/clothing/brand=' + brand + "&&clothing=" + clothing);
        this.props.updateContainer(brand, clothing);
    }

    // Toggle the collapsed navbar
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown(value) {
        if (value == "clothing") {
            this.setState({ brandDropdownOpen: false, clothingDropdownOpen: !this.state.clothingDropdownOpen })
        } else if (value == "brand") {
            this.setState({ brandDropdownOpen: !this.state.brandDropdownOpen, clothingDropdownOpen: false })
        }
    }

    select(type, item) {
        this.toggleDropdown(type);
        this.setState({ [type]: item })
    }

    reset() {
        let brand = "all";
        let clothing = "all"
        this.props.history.push('/clothing/brand=' + brand + "&&clothing=" + clothing);
        this.props.updateContainer(brand, clothing);
    }

    render() {
        return (
            <header>
                <Navbar color="faded" light expand="md" className="subHeader">
                    <Collapse isOpen={this.state.isOpen} navbar className="centerFlex">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="raptureFashionHeaderDropdownMenuLink" onClick={() => this.reset()}>All</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.brandDropdownOpen} toggle={() => this.toggleDropdown("brand")}>
                                    <DropdownToggle id="raptureFashionHeaderDropdownToggle" caret>
                                        {this.state.brand}
                                    </DropdownToggle>
                                    <DropdownMenu id="raptureFashionHeaderDropdownMenu">
                                        <DropdownItem active={this.state.brand == "all"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("brand", "all")}>All Brands</DropdownItem >
                                        <DropdownItem active={this.state.brand == "gibson"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("brand", "Gibson Girls")}>Gibson Girls</DropdownItem >
                                        <DropdownItem active={this.state.brand == "ryan"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("brand", "Ryan Boutique")}>Ryan Boutique</DropdownItem >
                                        <DropdownItem active={this.state.brand == "apollo"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("brand", "Apollo")}>Apollo</DropdownItem >
                                        <DropdownItem active={this.state.brand == "áveline"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("brand", "ÁVELINE's")}>ÁVELINE'S</DropdownItem >
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.clothingDropdownOpen} toggle={() => this.toggleDropdown("clothing")}>
                                    <DropdownToggle id="raptureFashionHeaderDropdownToggle" caret>
                                        {this.state.clothing}
                                    </DropdownToggle>
                                    <DropdownMenu id="raptureFashionHeaderDropdownMenu">
                                        <DropdownItem active={this.state.clothing == "all"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("clothing", "all")}>All Clothing</DropdownItem >
                                        <DropdownItem active={this.state.clothing == "dresses"} className="raptureFashionHeaderDropdownItem " onClick={() => this.select("clothing", "Dresses")}>Dresses</DropdownItem>
                                        <DropdownItem active={this.state.clothing == "shoes"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("clothing", "Shoes")}>Shoes</DropdownItem>
                                        <DropdownItem active={this.state.clothing == "accessories"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("clothing", "Accessories")}>Accessories</DropdownItem>
                                        <DropdownItem active={this.state.clothing == "hats"} className="raptureFashionHeaderDropdownItem" onClick={() => this.select("clothing", "Hats")}>Hats</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        )
    }
}
/*	<a className="cartLink" href="#/bag">
										<span className="cartQuantity">{this.props.cartAmount}</span>
									</a>*/

function mapStateToProps(state) {
    const cartAmount = state.home.cart.checkout.lineItems.length;
    return { cartAmount };
}
export default connect(mapStateToProps)(withRouter(SubHeader));
//export default Header;
