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
import classnames from "classnames";
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
			dropdownOpen: false,
			prevScrollpos: window.pageYOffset,
			visible: true
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

	  // Adds an event listener when the component is mount.
	  componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
	  }
	
	  // Remove the event listener when the component is unmount.
	  componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	  }
	
	  // Hide or show the menu.
	  handleScroll = () => {
		const { prevScrollpos } = this.state;
	
		const currentScrollPos = window.pageYOffset;
		const visible = prevScrollpos > currentScrollPos;
	
		this.setState({
		  prevScrollpos: currentScrollPos,
		  visible
		});
	  };

	render() {
		return (
			<header >
				<Navbar className={classnames("navbar", {
				"navbar--hidden": !this.state.visible
			  })} color="faded" light expand="md">
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
								<NavLink className="raptureFashionHeaderDropdownMenuLink" href="#/clothing/">Clothing</NavLink>
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
