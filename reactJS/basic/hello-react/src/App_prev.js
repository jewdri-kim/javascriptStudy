import React, { Component, Fragment } from 'react';
import Counter from './Counter';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render(){
    const value= 3;
    const name= "Jewdri";
    const style = {
      backgroundColor : 'black',
      padding: '16px',
      color: '#fff',
      fontSize: '36px'
    };
    return (
      <Fragment>
          <h1>지난번 </h1>
        <Counter />
        <div>Hello {name}!</div>
        <div>Bye</div> {/*dfdfdff */}
        {
          (()=>{
            if(value === 1) return (<div>하나</div>);
            if(value === 2) return (<div>둘</div>);
            if(value === 3) return (<div>셋</div>);
          })()
        }

        <div className="text">안녕하세요</div>
      </Fragment>
    );

  }
}

export default App;
