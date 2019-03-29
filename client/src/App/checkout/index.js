import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CheckoutContainer from './containers/CheckoutContainer';

// Needed for router.js
class checkoutIndex extends Component {
	render() {
		return (
			<div id="pollIndex">
				<Container>
					<CheckoutContainer clothing={this.props.clothing} />
				</Container>
			</div>
		);
	}
}

export default checkoutIndex;
