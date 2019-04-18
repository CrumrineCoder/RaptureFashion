import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AboutContainer from './containers/About';

// Needed for router.js
class aboutIndex extends Component {
	render() {
      
		return (
			<div id="bagIndex">
				<Container>
					<AboutContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default aboutIndex;
