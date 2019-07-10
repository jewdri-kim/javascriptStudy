import React, { Component, Fragment } from 'react';
import imgLoading from './img/loading_motion.png';

class Loading extends Component {  
    
  render(){
    return (
      <Fragment>
         <div className="loading-box">
             <img src={imgLoading} alt=""/>
         </div>
      </Fragment>
    );

  }
}

export default Loading;
