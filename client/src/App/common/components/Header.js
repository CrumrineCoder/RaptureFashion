import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

// Header hosts navigation info at the top of the screen. It appears on all pages.
// Redirects to landing page, and depending on if the user is logged in redirect to either the profile or logout page, or if they're not logged in then login or register page 
class Header extends Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
			//		isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
	}

	// Toggle the collapsed navbar
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
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
							<NavItem>
								<div class="cartWrapper">
									<a class="cartLink" href="">
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
											<path fill="#000" fill-rule="nonzero" d="M12 7V6c0-1 1-2 2-2h4c1 0 2 1 2 2v1h7v19H5V7h7zm14 1H6v17h20V8zM13 6v1h6V6c0-.5-.5-1-1-1h-4c-.5 0-1 .5-1 1z"></path>
										</svg>
										<span class="cartQuantity">1</span>
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
	return { isLoggedIn };
}

export default connect(mapStateToProps)(Header);

//export default Header;