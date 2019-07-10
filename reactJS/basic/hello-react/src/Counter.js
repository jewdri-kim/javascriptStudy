import React, { Component, Fragment } from 'react';


class Counter extends Component {
    
    state = {
        number : 0,
        min : -10,
        max : 10
    }

    handleIncrease = () => {
        var lTemp = this.state.number + 1;
        if(lTemp >= this.state.max) lTemp = this.state.max;
        this.setState({
            number: lTemp
        })        
    }
    handleDecrease = () => {
        var lTemp = this.state.number - 1;
        if(lTemp <= this.state.min) lTemp = this.state.min;
        this.setState({
            number: lTemp
        })        
    }
  render(){
    return (
      <Fragment>
          <h1>카운터 (최소 : {this.state.min}, 최대 : {this.state.max})</h1>
          <div> 값 : {this.state.number}</div>
          <button type="button" onClick={this.handleIncrease}>+</button>
          <button type="button" onClick={this.handleDecrease}>-</button>
      </Fragment>
    );

  }
}

export default Counter;
