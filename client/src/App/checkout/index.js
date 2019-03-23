import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CheckoutContainer from './containers/checkoutContainer';

// Needed for router.js
class checkoutIndex extends Component {
	render() {
		return (
			<div id="checkoutIndex">
				<Container>
					<CheckoutContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default checkoutIndex;
