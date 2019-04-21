import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesBox extends Component {

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
        console.log("PROPSAROONI", this.props);

        return (
            <div className="categoriesBox" onMouseEnter={this.hoverEnter} onMouseLeave={this.hoverExit}>
                <div className="categoriesBoxInside">
                    <img className="categoriesBoxImage rounded" src={require("../../../assets/" + this.state.box.image)} />
                    {this.state.hover && 
                        <div>    
                            <p className="categoriesBoxTag">{this.state.box.name}</p>
                            <button value={this.props.box.name} onClick={this.props.learnMore}>Learn More</button>
                            <Link to={"/categories/" + this.props.category} >
                                <button>Go to Collection</button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default CategoriesBox;