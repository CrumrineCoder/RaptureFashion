import React, { Component } from 'react';

class ColorBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
        }
    }

    render(){
        let pageContent = "Loading...";
        console.log(this.props.Color);
        let Class = "ColorBoxFill " + this.props.Color;
        if(this.props.readOnly){
            pageContent = (
                <div className={Class}></div>
            )
        }

        // TO DO: ADD LINK
        return(
            <div className="ColorBox">
                {pageContent}
            </div>
        )
    }
}

export default ColorBox;