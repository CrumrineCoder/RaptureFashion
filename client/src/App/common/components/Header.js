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
		const { isLoggedIn } = this.props
		let userLinks;
		//Conditional rendering
		if (isLoggedIn) {
			userLinks =
				<>
					<NavItem>
						<NavLink href="#/profile">Profile</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#/login">Logout</NavLink>
					</NavItem>
				</>
		} else {
			userLinks =
				<>
					<NavItem>
						<NavLink href="#/login">Login</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#/register">Register</NavLink>
					</NavItem>
				</>
		}
		return (
			<header>
				<Navbar color="faded" light expand="md">
					<NavbarBrand href="/">Rapture Fashion</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="#/">Home</NavLink>
							</NavItem>
							<NavItem>
								<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
									<DropdownToggle caret>
										Brands
       							 </DropdownToggle>
									<DropdownMenu>
										<NavLink href="#/categories/brands/gibson">Gibson Girl</NavLink>
										<NavLink href="#/categories/brands/ryan">Ryan Boutique</NavLink>
										<NavLink href="#/categories/brands/apollo">Apollo</NavLink>
										<NavLink href="#/categories/brands/áveline">ÁVELINE'S</NavLink>
									</DropdownMenu>
								</Dropdown>
							</NavItem>

							<NavItem>
								<NavLink href="#/categories/all">All</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#/categories/dresses">Dresses</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#/categories/shoes">Shoes</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#/categories/accessories">Accessories</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#/categories/hats">Hats</NavLink>
							</NavItem>
							<NavItem className="cartRelativeItemWrapper">
								<div class="cartWrapper">
									<a class="cartLink" href="#/bag">
										<span class="cartQuantity">{this.props.cartAmount}</span>
									</a>
								</div>
							</NavItem>
							{userLinks}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		)
	}
}

Header.propTypes = {
	//	isLoggedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
	const isLoggedIn = state.home.authenticate.loggedIn;
	const cartAmount = state.home.cart.checkout.lineItems.length;
	return { isLoggedIn, cartAmount };
}

export default connect(mapStateToProps)(Header);

//export default Header;