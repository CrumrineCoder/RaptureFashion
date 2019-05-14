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
class Header extends Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.state = {
			isOpen: false,
			dropdownOpen: false
			//		isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
	}

	// Toggle the collapsed navbar
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	toggleDropdown() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render() {
		return (
			<header>
				<Navbar color="faded" light expand="md">
					<NavbarBrand href="/" id="raptureFashionHeaderLeft">
						<i className="raptureFashionHeaderLogo" src="../../../assets/Icons/rapture.png"></i>
						<span className="raptureFashionHeaderTitle">Rapture Fashion</span>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/">Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/about">About</NavLink>
							</NavItem>
							<NavItem>
								<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
									<DropdownToggle id="raptureFashionHeaderDropdownToggle" caret>
										Brands
       								</DropdownToggle>
									<DropdownMenu id="raptureFashionHeaderDropdownMenu">
										<NavLink className="raptureFashionHeaderDropdownItem" href="#/categories/brands/gibson">Gibson Girls</NavLink>
										<NavLink className="raptureFashionHeaderDropdownItem" href="#/categories/brands/ryan">Ryan Boutique</NavLink>
										<NavLink className="raptureFashionHeaderDropdownItem" href="#/categories/brands/apollo">Apollo</NavLink>
										<NavLink className="raptureFashionHeaderDropdownItem" href="#/categories/brands/áveline">ÁVELINE'S</NavLink>
									</DropdownMenu>
								</Dropdown>
							</NavItem>
							<NavItem>
								<NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/categories/all">All</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="raptureFashionHeaderDropdownMenuLink"href="#/categories/dresses">Dresses</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/categories/shoes">Shoes</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/categories/accessories">Accessories</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/categories/hats">Hats</NavLink>
							</NavItem>
							<NavItem className="cartRelativeItemWrapper">
								<div className="cartWrapper2">
									<Link to="/bag">
										<i className="fas fa-briefcase cartLink2 raptureFashionHeaderDropdownMenuLink">
											<span className="cartQuantity2">{this.props.cartAmount}</span>
										</i>
							</Link>
								</div>
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
export default connect(mapStateToProps)(Header);
//export default Header;