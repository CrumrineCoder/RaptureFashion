import React, { Component } from 'react';

class InstagramBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            user: {},
            popup: false
        }
        this.showPopup = this.showPopup.bind(this);
        this.hidePoup = this.hidePoup.bind(this);
    }

    componentWillMount(){
        this.setState({ 
            user: this.props.user
         });
    }

    showPopup(){
        this.setState({
            popup: true
        })
    }

    hidePoup(){
        this.setState({
            popup: false
        })
    }

    render(){
        // TO DO: ADD LINK
        // onMouseEnter={() => this.showPopup()}  onMouseLeave={() => this.hidePoup()}
        return(
            <div className="instagramBox"  onMouseEnter={() => this.showPopup()}  onMouseLeave={() => this.hidePoup()}>
                <img className="instagramBoxImage" src={require("../../../assets/Instagram/"+this.state.user.image)} />
                <div className="instagramBoxPopup" style={{ display: this.state.popup ? 'block' : 'none' }}>
                   <a target="_blank" href={"https://twitter.com/"+this.state.user.handle} className="instagramBoxLink"><p className="instagramBoxHandle">@{this.state.user.handle}</p></a> 
                    <p className="instagramBoxLikes"><i className="fas fa-heart instagramIcon"></i> {this.state.user.likes}</p>
                </div>    
            </div>
        )
    }
}

export default InstagramBox;