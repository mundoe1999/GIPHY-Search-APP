import React, { Component } from 'react';
import '../style/GifCard.css'
class GifCard extends Component {


  render() {
    return(
      <div className="GifCard">
        <img src={this.props.gifURL}/>
      </div>
    )}
}


export default GifCard;