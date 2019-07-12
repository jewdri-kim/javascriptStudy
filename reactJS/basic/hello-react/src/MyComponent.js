import React, { Component, Fragment } from 'react';


class MyComponent extends Component {
    
    state = {
       value : 0
    }

    static getDerivedStateFromProps(nextProps, prevState) {  //nextProps: 다음으로 받아올, prevState: 업데이트 되기전 상태
        if (prevState.value !== nextProps.value) {
            return {
              value: nextProps.value
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {  //업데이트 성능 최적화 false면 업데이트안함 
      if (nextProps.value === 10) return false;
      return true;
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (this.props.value !== prevProps.value) {
        console.log('value 값이 바뀌었다!', this.props.value);
      }
    }
  
    componentWillUnmount() {
      console.log('Good Bye');
    }
  
    
  render(){
    return (
      <Fragment>
          {/*{this.props.missing.something }*/}
          <p>props: {this.props.value}</p>
          <p>state: {this.state.value}</p>
      </Fragment>
    );

  }
}

export default MyComponent;
