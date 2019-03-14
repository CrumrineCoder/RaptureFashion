import React, { Component } from 'react';
import { Container } from 'reactstrap';
import DetailsContainer from './containers/detailsContainer';

// Needed for router.js
class categoriesIndex extends Component {
	render() {
		return (
			<div id="pollIndex">
				<Container>
					<DetailsContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default categoriesIndex;
