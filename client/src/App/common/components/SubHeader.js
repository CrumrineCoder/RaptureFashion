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
        this.state = {
            isOpen: false,
            brandDropdownOpen: false, 
            clothingDropdownOpen: false,
            brand: '',
            clothing: ''
            //		isLoggedIn: typeof localStorage["user"] !== 'undefined'
        };
    }
    componentDidMount(){
        this.setState({
            brand: 'Brand',
            clothing: 'Clothing'
        })
    }

    componentDidUpdate(){
       this.props.history.push('/clothing/brand=' + this.state.brand + "&&clothing=" + this.state.clothing);
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

    select(type, item){
        this.toggleDropdown(type);
        this.setState({[type]: item})
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
                                        {this.state.brand}
       								</DropdownToggle>
                                    <DropdownMenu id="raptureFashionHeaderDropdownMenu">
                                        <DropdownItem  active className="raptureFashionHeaderDropdownItem" onClick = {() => this.select("brand", "gibson")}>Gibson Girls</DropdownItem >
                                        <DropdownItem  className="raptureFashionHeaderDropdownItem" onClick = {() => this.select("brand", "ryan")}>Ryan Boutique</DropdownItem >
                                        <DropdownItem  className="raptureFashionHeaderDropdownItem" onClick = {() => this.select("brand", "apollo")}>Apollo</DropdownItem >
                                        <DropdownItem  className="raptureFashionHeaderDropdownItem" onClick = {() => this.select("brand", "áveline")}>ÁVELINE'S</DropdownItem >
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown isOpen={this.state.clothingDropdownOpen} toggle={() => this.toggleDropdown("clothing")}>
                                    <DropdownToggle id="raptureFashionHeaderDropdownToggle" caret>
                                        Clothing
       								</DropdownToggle>
                                    <DropdownMenu id="raptureFashionHeaderDropdownMenu">
                                        <DropdownItem className="raptureFashionHeaderDropdownItem "onClick = {() => this.select("clothing", "dresses")}>Dresses</DropdownItem>
                                        <DropdownItem className="raptureFashionHeaderDropdownItem" onClick = {() => this.select("clothing", "shoes")}>Shoes</DropdownItem>
                                        <DropdownItem className="raptureFashionHeaderDropdownItem" onClick = {() => this.select("clothing", "accessories")}>Accessories</DropdownItem>
                                        <DropdownItem className="raptureFashionHeaderDropdownItem" onClick = {() => this.select("clothing", "hats")}>Hats</DropdownItem>
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
