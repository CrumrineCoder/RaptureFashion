import React, { Component } from 'react';

class VariantSelector extends Component {
  render() {
    let filter = this.props.option.values.map(a => a.value);
    let buttons = (
      <div className="detailsSizeBoxList">
        {filter.map((property, i) => <button onClick={() => this.props.changeProperty({ property })} className={this.props.currentProperty === property ? 'detailsSizeBoxListButton detailsSizeBoxListButtonActive' : 'detailsSizeBoxListButton'} key={i}> {property}</button>)}
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