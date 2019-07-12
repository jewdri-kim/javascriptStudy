import React, { Component, Fragment } from 'react';
import './Movie.css';

class Movie extends Component {
    
    state = {
       title : null,
       poster: null,
    }

    constructor(props){
      super(props);
      console.log('Movie : constructor');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState !== nextProps) {
            return nextProps;
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {     //특정조건에 따라 랜더링 막아줌
      if (nextProps.title === this.state.title){
        console.log('Movie False : shouldComponentUpdate');
        return false;
      }else{
        console.log('Movie True: shouldComponentUpdate');
        return true;
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      console.log('Movie : componentDidUpdate :value 값이 바뀌었다!');
    }
  
    componentWillUnmount() {
      this.setState({
        title:null,
        poster:null,
      });
      console.log('Movie : Good Bye');
    }
  
    
  render(){
    console.log('Movie : render');
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
