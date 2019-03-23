import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CheckoutContainer from './containers/checkoutContainer';

// Needed for router.js
class checkoutIndex extends Component {
	render() {
        let pageContent = '';
        pageContent = (
            <ul className="polls">
                {dresses.map((dress, i) => <PollLink update={this.update} key={i} {...poll} />)}
            </ul>
        )
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
