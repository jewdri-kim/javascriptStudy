import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  //Render : componentWillMount() -> render() -> componentDidMount()

  //Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() ->render() -> componentDidUpdate()
  state = {
  }
  componentWillMount(){
    console.log('componentWillMount');
  }
 
  componentDidMount(){
   this._getMovies();
  }

  _renderMovies = ()=>{
    const movies = this.state.movies.map(movie => {
      console.log(movie);
      return <Movie 
      title={movie.title} 
      poster={movie.medium_cover_image} 
      key={movie.id} 
      genres={movie.genres}
      synopsis = {movie.synopsis}
    />
    })
    return movies
  }

   _getMovies = async ()=>{  // async :  asynchronous function 
    const movies = await this._callApi(); // await: call api기능이 끝나는것을 기다림 
    // api작업후에 아래가 실행 
    this.setState({
      movies 
    })
  }

  _callApi = () => {
    return fetch('https://yts.ag/api/v2/list_movies.json')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))   
  }
  render() {
    console.log('render');
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
