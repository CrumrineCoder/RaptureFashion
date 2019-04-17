import React, { Component } from 'react';

class VariantSelector extends Component {
  render() {
    let propertyName = this.props.propertyName;
    let filter = this.props.option.values.map(a => a.value);
    console.log(this.props.currentProperty);
    console.log(filter); 
    let buttons = (
      <div className="detailsSizeBoxList">
        {filter.map((property, i) => <button onClick={() => this.props.changeProperty({ [propertyName]: property })} className={this.props.currentProperty === property ? 'detailsSizeBoxListButton detailsSizeBoxListButtonActive' : 'detailsSizeBoxListButton'} key={i}> {property}</button>)}
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