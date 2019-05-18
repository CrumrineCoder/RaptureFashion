import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BrandBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            box: {},
            hover: false
        }
        this.hoverEnter = this.hoverEnter.bind(this);
        this.hoverExit = this.hoverExit.bind(this);
    }

    componentWillMount() {
        this.setState({ box: this.props.box });
    }

    hoverEnter() {
        this.setState({ hover: true });
    }

    hoverExit() {
        this.setState({ hover: false });
    }

    render() {
        // TO DO: ADD LINK
        return (
            <div className="brandBox" onMouseEnter={this.hoverEnter} onMouseLeave={this.hoverExit}>
                <div className="brandBoxInside">
                    <img className="brandBoxImage rounded" onClick={() => this.props.learnMore(this.props.box.name)} src={require("../../../assets/" + this.state.box.image)} alt="Brand"/>
                </div>
            </div>
        )
    }
}

export default BrandBox;