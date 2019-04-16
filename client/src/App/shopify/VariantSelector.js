import React, { Component } from 'react';

class VariantSelector extends Component {
  render() {
    console.log("PRANK!", this.props.option.values)
    let filter = this.props.option.values.map(a => a.value);
    console.log(filter);
    var del = (
      <div className="detailsSizeBoxList">
        {filter.map((size, i) => <button onClick={() => this.changeSize({ size })} className={size === size ? 'detailsSizeBoxListButton detailsSizeBoxListButtonActive' : 'detailsSizeBoxListButton'} key={i}> {size}</button>)}
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