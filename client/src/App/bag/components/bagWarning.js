import React, { Component } from 'react';


class BagWarnning extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    document.body.style.overflow = "hidden";
    return (
      <div className="bagWarning">
        <h4 className="bagWarningHeader">Note: the Checkout linked by the button would work if I linked a Credit Card to my account, but I don't want people making purchases as this store is for LEARNING and TESTING purposes only.</h4>
        <p className="bagWarningSubtext">Contact me at crumrinecoding@gmail.com if you have any questions or need me to cancel and refund an order if you somehow make a payment, which I have no idea how you would do that but please don't try.</p>
      </div>
    );
  }
}

export default BagWarnning;