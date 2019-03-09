import React, { Component } from 'react';

class InstagramBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            user: {}
        }
    }

    componentWillMount(){
        this.setState({ user: this.props.user });
    }

    render(){
        // TO DO: ADD LINK
        return(
            <div className="instagramBox">
                <img className="instagramBoxImage" src={require("../../../assets/Instagram/"+this.state.user.image)} />
                <p className="instagramBoxHandle">@{this.state.user.handle}</p>
                <p className="instagramBoxLikes"><i className="fas fa-heart instagramIcon"></i> {this.state.user.likes}</p>
            </div>
        )
    }
}

export default InstagramBox;