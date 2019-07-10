import React, { Component, Fragment } from 'react';
import  Movie from './Movie';
import './App.css';

class App extends Component {
  state = {
      error: false,
      data : null
  }

  constructor(props){
    super(props);
    console.log('constructor');
  }

  componentDidMount(){
    console.log('componentDidMount ');
    this._getMovies();    
  }

  componentDidCatch(error, info) {
    /* 에러가 발생할수이쓴  */
    this.setState({
      error: true
    });
    console.log('에러');
    console.log(error);
    console.log(info);
  }

  _getMovies = async()=>{
      const movies = await this._callApi();
      this.setState({
        data : movies
      })
      
      //console.log(this.state.data);
  }

  _callApi = () =>{
    return fetch('https://yts.lt/api/v2/list_movies.json?magnet:?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))   
  }

  _renderMovies = () =>{
      const movies = this.state.data.map(movie =>{
          return <li>
              <Movie
                title = {movie.title}
                poster={movie.medium_cover_image} 
                />
            </li>

      })

      return movies
  }

  render(){
    console.log('render')
    if (this.state.error) {
      return <div>에러가 났어요</div>;
    }
    return (
      <Fragment>
          Hi
         {this.state.data ? <ul>{this._renderMovies()}</ul> : "Loading"}        
      </Fragment>
    );

  }
}

export default App;
