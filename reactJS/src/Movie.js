import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Movie.css';

// class Movie extends Component {
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     poster: PropTypes.string.isRequired
//   }
//   render() {    
//     return (
//       <div>
//         <MoviePoster poster={this.props.poster}/>
//        <h1>{this.props.title}</h1>
//       </div>
//     );
//   }
// }

function Movie({title, poster, genres, synopsis}){
  return (
    <div className="movie">
      <div classNume="movie_columns">
        <MoviePoster poster={poster} alt={title}/>
      </div>
      <div classNume="movie_columns">
        <h1>{title}</h1>
        <div className="movie_genres">
          {genres.map((genres,index)=><MovieGenre genre={genres} key={index} />)}
        </div>
        <p className="movie_synopsis">{synopsis}</p>
      </div>
    
    </div>
  )
}

// class MoviePoster extends Component {

//   static propTypes =  {
//     poster: PropTypes.string.isRequired
//   }
//   render() {
//     console.log(this.props);
//     return (
//       <img src={this.props.poster} alt="" />
//     );
//   }
// }

function MoviePoster({poster, alt}){
  return (
    <img src={poster} alt={alt} className="movie_poster"/>
  )
}

function MovieGenre({genre}){
  return (
    <span class="movie_genre">{genre} </span>
  )
}
Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  synopsis: PropTypes.string.isRequired,
}
MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

MovieGenre.propTypes = {
  genre: PropTypes.string.isRequired
}
  export default Movie;