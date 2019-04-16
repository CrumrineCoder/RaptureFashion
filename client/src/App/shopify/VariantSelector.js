import React, { Component } from 'react';

class VariantSelector extends Component {
  render() {
    let filter = this.props.option.values.map(a => a.value);
    var del = (
      <div className="detailsSizeBoxList">
        {filter.map((size, i) => <button onClick={() => this.props.changeSize({ size })} className={this.props.currentSize === size ? 'detailsSizeBoxListButton detailsSizeBoxListButtonActive' : 'detailsSizeBoxListButton'} key={i}> {size}</button>)}
      </div>
    )
    //onClick={() => this.changeSize({ size })} className={this.state.size === size ? 'detailsSizeBoxListButton detailsSizeBoxListButtonActive' : 'detailsSizeBoxListButton'} key={i}
    return (
      <div>
      { del }
      </div>
    );
  }
}

export default VariantSelector;