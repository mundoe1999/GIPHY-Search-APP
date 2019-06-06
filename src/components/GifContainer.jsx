import React, { Component } from 'react';
import GifCard from './GifCard';
import ChangeButton from './ChangeButton';
import '../style/GifContainer.css'

class GifContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      whatDisplay: 'trending',
      api: NaN,
      searchTerm: ''
    }
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  componentDidMount(){
    this.loadAPI();
  }

  loadAPI(){
      let address = '';

    if(this.state.whatDisplay === 'trending'){
      address = 'http://api.giphy.com/v1/gifs/trending?api_key=A3w7lXRvwlnnfImVlKC3kd361Z2wwUAv';

    } else if(this.state.whatDisplay === 'search'){
      address = 'http://api.giphy.com/v1/gifs/search?q='+this.state.searchTerm+'&api_key=A3w7lXRvwlnnfImVlKC3kd361Z2wwUAv';

    } else if(this.state.whatDisplay === 'random'){
      address = 'http://api.giphy.com/v1/gifs/random?api_key=A3w7lXRvwlnnfImVlKC3kd361Z2wwUAv';
    }

    console.log(address);
    fetch(address)
    .then(response => response.json())
    .then(myJson => this.setState({api: JSON.parse((JSON.stringify(myJson)))}));
  } //End loadAPI


  ChangeSearch = event => {
    this.setState({
      searchTerm: event.target.value
    });
  } //End ChangeSearch

  changeDisplay = name => {
    this.setState({
      whatDisplay: name
    }, this.loadAPI);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
        console.log('enter press here! ');
        this.setState({
          whatDisplay: 'search'
        },this.loadAPI());
      
    }
  } //End handleKeyPress  
 

  render(){
    let gifList = this.state.api["data"] || [];
    console.log(gifList);
    let gifInfo;
    if(this.state.whatDisplay !== 'random'){
      gifInfo = (
        gifList.map( gif => {
          return(
            <GifCard gifURL={gif["images"]["original"]["url"]} />
          )
        })
      );
    }
    return(
      <div>
        Enter Search
        <input type='text' value={this.state.searchTerm} onChange={this.ChangeSearch} onKeyPress={this.handleKeyPress}/>
        <ChangeButton name="Trending" changeDisplay={this.changeDisplay.bind(this)} switchTo="trending" />
        <div className="GifContainer">


        {gifInfo}
                </div>
      </div>
    );
  }

}

export default GifContainer;