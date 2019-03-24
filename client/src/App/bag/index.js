import React, { Component } from 'react';
import { Container } from 'reactstrap';
import BagContainer from './containers/bagContainer';

// Needed for router.js
class bagIndex extends Component {
	render() {
      
		return (
			<div id="bagIndex">
				<Container>
					<BagContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default bagIndex;
