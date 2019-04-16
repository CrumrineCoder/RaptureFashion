import React, { Component } from 'react';

class VariantSelector extends Component {
  render() {
    let filter = this.props.option.values.map(a => a.value);
    console.log("Filter", filter); 
    let buttons = (
      <div className="detailsSizeBoxList">
        {filter.map((size, i) => <button onClick={() => this.props.changeSize({ size })} className={this.props.currentSize === size ? 'detailsSizeBoxListButton detailsSizeBoxListButtonActive' : 'detailsSizeBoxListButton'} key={i}> {size}</button>)}
      </div>
    )
    return (
      <div>
      { buttons }
      </div>
    );
  }
}

export default VariantSelector;