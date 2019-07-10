import React, { Component, Fragment } from 'react';
import './Movie.css';

class Movie extends Component {
    
    state = {
       title : null,
       poster: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState !== nextProps) {
            return nextProps;
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log('shouldComponentUpdate');
       return true;
    }
  
    componentDidUpdate(prevProps, prevState) {
      console.log('componentDidUpdate :value 값이 바뀌었다!');
    }
  
    componentWillUnmount() {
      this.setState({
        title:null,
        poster:null
      });
      console.log('Good Bye');
    }
  
    
  render(){
    return (
      <Fragment>
          <div className="movie-item">
              <h2>{this.state.title}</h2>
              <div className="movie-img">
                  <img src={this.state.poster} alt={this.state.title} />
              </div>
          </div>
      </Fragment>
    );

  }
}

export default Movie;
