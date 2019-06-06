import React, { Component } from 'react';

class ChangeButton extends Component {

  render(){
    let changeDisplay = this.props.changeDisplay;

    return(
      <div>
        <button onClick={() => changeDisplay(this.props.switchTo)}>{this.props.name}</button>
      </div>
    )
  }

}

export default ChangeButton;