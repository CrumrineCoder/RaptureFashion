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
      <>
      <div className={this.props.modalOpen ? "bagDarkness openModal" : "bagDarkness"}></div>
      <div className={this.props.modalOpen ? "bagWarning openModal" : "bagWarning"}>
        <div className="bagWarningHeader">
          <p className="bagWarningHeaderTitle">Checkout Redirect</p>
          <i className="fas fa-times bagWarningHeaderExit" onClick={this.props.toggleModal}></i>
        </div>
        <div className="bagWarningBody">
          <p className="bagWarningBodyText">I have disabled payment as this store is for learning and testing only. If you somehow manage to spend money, contact me at crumrinecoding@gmail.com. Please don't try to break this more than I have.</p>
          <button className="btn btn-primary yellowButton">I understand</button>
        </div>
      </div>
      </>
    );
  }
}

export default BagWarnning;