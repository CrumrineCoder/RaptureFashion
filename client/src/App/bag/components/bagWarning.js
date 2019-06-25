import React, { Component } from 'react';


class BagWarnning extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
    }
   
  }

  

  render() {
    if (this.props.modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    return (
      <div className={this.props.modalOpen ? "bagWarning openModal" : "bagWarning"}>
        <h4 className="bagWarningHeader">Checkout Redirect</h4>
        <button onClick={this.props.toggleModal}>Close Out</button>
        <p>I have disabled payment as this store is for learning and testing only. If you somehow manage to spend money, contact me at crumrinecoding@gmail.com. Please don't try to break this more than I have.</p>
        <button>I understand</button>
      </div>
    );
  }
}

export default BagWarnning;