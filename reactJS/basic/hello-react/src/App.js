import React, { Component, Fragment } from 'react';
import  MyComponent from './MyComponent';
import logo from './logo.svg';
import './base.css';
import './App.css';

class App extends Component {
  state = {
    counter : 1,
    error : false
  };

  constructor(props){
    super(props);
    console.log('constructor');
  }

  componentDidMound(){
    console.log('componentDidMount');
  }

  componentDidCatch(error, info) {
    {
      /* 에러가 발생할수이쓴  */
    }
    this.setState({
      error: true
    });
    console.log('에러');
    console.log(error);
    console.log(info);
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render(){
    if (this.state.error) {
      return <div>에러가 났어요 ---수ㅠ정수정</div>;
    }
    return (
      <Fragment>
        {this.state.counter <10 && <MyComponent value={this.state.counter} />}
        <button onClick={this.handleClick}>Click Me</button>
        
      </Fragment>
    );

  }
}

export default App;
