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
    DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

// Header hosts navigation info at the top of the screen. It appears on all pages.
// Redirects to landing page, and depending on if the user is logged in redirect to either the profile or logout page, or if they're not logged in then login or register page 
class SubHeader extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            isOpen: false,
            brandDropdownOpen: false, 
            clothingDropdownOpen: false
            //		isLoggedIn: typeof localStorage["user"] !== 'undefined'
        };
    }

    // Toggle the collapsed navbar
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown(value) {
        if(value == "clothing"){
            this.setState({brandDropdownOpen: false, clothingDropdownOpen: !this.state.clothingDropdownOpen})
        } else if (value == "brand"){
            this.setState({brandDropdownOpen: !this.state.brandDropdownOpen, clothingDropdownOpen: false})
        }
    }

    render() {
        return (
            <header>
                <Navbar color="faded" light expand="md" className="subHeader">
                    <Collapse isOpen={this.state.isOpen} navbar className="centerFlex">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/categories/all">All</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.brandDropdownOpen} toggle={() => this.toggleDropdown("brand")}>
                                    <DropdownToggle id="raptureFashionHeaderDropdownToggle" caret>
                                        Brands
       								</DropdownToggle>
                                    <DropdownMenu id="raptureFashionHeaderDropdownMenu">
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("brand")} href="#/categories/brands/gibson">Gibson Girls</NavLink>
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("brand")} href="#/categories/brands/ryan">Ryan Boutique</NavLink>
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("brand")} href="#/categories/brands/apollo">Apollo</NavLink>
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("brand")} href="#/categories/brands/áveline">ÁVELINE'S</NavLink>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.clothingDropdownOpen} toggle={() => this.toggleDropdown("clothing")}>
                                    <DropdownToggle id="raptureFashionHeaderDropdownToggle" caret>
                                        Clothing
       								</DropdownToggle>
                                    <DropdownMenu id="raptureFashionHeaderDropdownMenu">
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("clothing")} href="#/categories/dresses">Dresses</NavLink>
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("clothing")} href="#/categories/shoes">Shoes</NavLink>
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("clothing")} href="#/categories/accessories">Accessories</NavLink>
                                        <NavLink className="raptureFashionHeaderDropdownItem" onClick = {() => this.toggleDropdown("clothing")} href="#/categories/hats">Hats</NavLink>
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
export default connect(mapStateToProps)(SubHeader);
//export default Header;
