import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            box: {}
        }
    }

    componentWillMount() {
        this.setState({ box: this.props.box });
    }

    render() {
        // TO DO: ADD LINK<Link to={{
        return (
            <Link className="categoriesBox yellowText yellowLink" 
            to={{
                pathname: "/clothing/", 
                state: {
                    clothing: this.state.box.link
                }
            }}>
                <div>
                    <img className="categoriesBoxImage rounded" src={require("../../../assets/" + this.state.box.image)} alt="Category"/>
                    <p className="categoriesBoxTag">{this.state.box.name}</p>
                </div>
            </Link>
        )
    }
}

export default CategoriesBox;