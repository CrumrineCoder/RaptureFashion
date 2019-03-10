import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CategoriesContainer from './containers/CategoriesContainer';

// Needed for router.js
class categoriesIndex extends Component {
	render() {
		return (
			<div id="pollIndex">
				<Container>
					<CategoriesContainer />
				</Container>
			</div>
		);
	}
}

export default categoriesIndex;
