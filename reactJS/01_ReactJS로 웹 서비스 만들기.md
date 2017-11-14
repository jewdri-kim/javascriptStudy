# Introduction to React

- react는 자바스크립트만 하면된다.

- 다른 angular 같은건 그 자체만에 필요한걸 해야함 - angular안쓰면 도루묵 그렇지만 react은 자바스크립트로만 

- component 단위로 개발

- 단방향 데이터플로우  

  - 데이터 -> 데이터 변경 -> UI변경

- 커뮤니티가 방대함

- react는 framework가 아니라 UI라이브러리다.

- 파이썬,루비랑 섞어 쓸 수 있다. 

  model view controller -  리액트는 view기에 다른것과 섞어쓸수 있다.
  리액트 장고....

# What are we building

https://yts.ag/api 

API를 이용하여 react로 영화앱 만들기



# Introduction to Create React App

자바스크립트로 바꿔주는게 필요해 - 트랜스파일러

리액트코드를 -> 브라우저가 알수 있는 자바스크립트로 변환 : webpack

웹팩을 이용해서 최근 자바스크립트를 브라우저가 이해할 수 있게 !

더 자세히 하고 싶다면 - '인스타그램 풀스택 강의' : 장고, 깃, 웹팩이용 

facebook - creat-react-app 설정작업없이 한번에 작업 . 



install

- node.js
- create-react-app
  - https://github.com/facebookincubator/create-react-app



# Hello World with React and CRA

hello jewdri!

# Creating React Components with JSX

무비리스트 만들기 

## JSX

- 리액트 컴포넌트를 만들때 사용하는 언어.
- 리액트로 작성하는 html 



### component 제작

- 모든 컴포넌트는 render function.을 갖고 있다.
  -  render : 보여주고 출력하는 기능
- js의 모든 코드를 가져와서 html 파일에 담아준다. 
  - public폴더의 index.html (CRA로 만들어진 파일)
  - app.js에 있는 jsx의 html이 index.html root안에 반영
  - index.js에서 파일을 만든다. 
  - index.js는 react, reactDOM, css, 컴포넌트app을 불러온다.
  - ​

**1개의 컴포넌트를 출력하는 index.js**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

#### reactDOM

- reactDOM은 리액트를 웹사이트에 출력(render)하는것을 도와주는 모델
- 리액트를 사용해서 웹사이트에 올려놓고 싶을 때 reactDOM을 쓰면된다.
- 리액트를 모바일앱에 올려놓고싶다 reactNative를 쓴다.
- 리액트 = 라이브러리, 리액트돔 - 라이브러리를 웹사이트에 출력해준다.
- 리액트돔은 1개의 컴포넌트를 출력하고, 그 도큐먼트안에 엘리먼트가 있는데
- 엘리먼트 ID는 root (index.html) - 여기에 모든 컴포넌트를 출력한다.

`import react > class > RENDER` 

`Component > render > return > JSX`



# Data flow with Props

리액트는 두가지 컨셉이 있다

- Data
- Props

## Props

부모가 자식에세 정보를 줄때 props 를 통해서 준다.

App.js

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';

// 이 영화들의 '제목'을 칠드런 컴포넌트인 movie 컴포넌트에 보내고 싶다면 ?
const movies = [
  "Matrix",
  "Full Metal Jacket",
  "Oldboy",
  "Star Wars"
]
class App extends Component {
  render() {
    return (
      <div className="App">
        Hello!
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </div>
    );
  }
}
```

```javascript
class App extends Component {
  render() {
    return (
      <div className="App">
        Hello!
        <Movie title={movies[0]}/>
        <Movie title={movies[1]}/>
        <Movie title={movies[2]}/>
        <Movie title={movies[3]}/>
      </div>
    );
  }
}
```

Movie.js

```javascript
import React, { Component } from 'react';
import './Movie.css';

class Movie extends Component {
  render() {
    console.log(this.props);  //영화제목들 보기 
    return (
      <div>
        <MoviePoster />
       <h1>hello this is movie</h1>
      </div>
    );
  }
}
class MoviePoster extends Component {
  render() {
    return (
      <img src="https://cdn.empireonline.com/jpg/80/0/0/1000/563/0/north/0/0/0/0/0/t/films/131631/images/fUn5I5f4069vwGFEEvA3HXt9xPP.jpg" alt="" />
    );
  }
}
  export default Movie;
```

  html에 data넣기

```javascript
class Movie extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <MoviePoster />
       <h1>{this.props.title}</h1>
      </div>
    );
  }
}
```

###poster넣기

app.js에 추가 

```javascript
const moviesPosters = [
  "http://ticketimage.interpark.com/Movie/still_image/V16/V1601447p_s01.gif",
  "https://resizing.flixster.com/G-2niPIShTNblY9-sUj9FrQit3U=/206x305/v1.bTsxMTE2ODAyOTtqOzE3NTg5OzEyMDA7ODAwOzEyMDA",
  "https://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg",
  "http://cdn.movieweb.com/img.albums/FRgAKNrSBIT2km_8_600.jpg"
  ]

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello!
        <Movie title={moviesTitles[0]} poster={moviesPosters[0]}/>
        <Movie title={moviesTitles[1]} poster={moviesPosters[1]}/>
        <Movie title={moviesTitles[2]} poster={moviesPosters[2]}/>
        <Movie title={moviesTitles[3]} poster={moviesPosters[3]}/>
      </div>
    );
  }
}
```

Movie.js

```javascript
import React, { Component } from 'react';
import './Movie.css';

class Movie extends Component {
  render() {
    
    return (
      <div>
        <MoviePoster poster={this.props.poster}/>
       <h1>{this.props.title}</h1>
      </div>
    );
  }
}
class MoviePoster extends Component {
  render() {
    console.log(this.props);
    return (
      <img src={this.props.poster} alt="" />
    );
  }
}
  export default Movie;
```

- 메인컴포넌트가 데이터 다 가지고 있다.
- 각각 컴포넌트에 props를 이용해 정보를 출력 
- 강력한 UI 구축 : 한개의 데이터 소스를 가지고 각각의 컴포넌트별로 출력만 하면 된다. 

# LIst with .maps

App.js

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';

const movies = [
  {
    title : "Matrix",
    poster: "http://ticketimage.interpark.com/Movie/still_image/V16/V1601447p_s01.gif"
  },
  {
    title: "Full Metal Jacket",
    poster: "https://resizing.flixster.com/G-2niPIShTNblY9-sUj9FrQit3U=/206x305/v1.bTsxMTE2ODAyOTtqOzE3NTg5OzEyMDA7ODAwOzEyMDA"
  },
  {
    title: "Oldboy",
    poster: "https://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg"
  },
  {
    title: "Star Wars",
    poster: "http://cdn.movieweb.com/img.albums/FRgAKNrSBIT2km_8_600.jpg"
  }
]
class App extends Component {
  render() {
    return (
      <div className="App">
        {movies.map(movie => {
          return <Movie title={movie.title} poster={movie.poster} />
        })}
      </div>
    );
  }
}

export default App;

```



# Validating Props with Prop Types

`Warning: Each child in an array or iterator should have a unique "key" prop.`

리액트는 엘리먼트가 많을경우 key를 줘야한다. (unique)

```javascript
class App extends Component {
  render() {
    return (
      <div className="App">
        {movies.map((movie, index) => {
          return <Movie title={movie.title} poster={movie.poster} key={index}/>
        })}
      </div>
    );
  }
}
```

만약에 영화제목에 숫자 출력되는걸 원하지 않으면 poster에 ture,false값 출력 원하지 않으면?

데이터 타입을 정의할 수 있다.

Movie.js

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Movie.css';

class Movie extends Component {
  static propTypes = {
    title: PropTypes.string,  //타이틀은 string타입으로만 쓸거다.
    poster: PropTypes.string
  }
  render() {    
    return (
      <div>
        <MoviePoster poster={this.props.poster}/>
       <h1>{this.props.title}</h1>
      </div>
    );
  }
}
class MoviePoster extends Component {
  render() {
    console.log(this.props);
    return (
      <img src={this.props.poster} alt="" />
    );
  }
}
  export default Movie;
```

만약, title타입을 넘버로 바꾸면?

```javascript
class Movie extends Component {
  static propTypes = {
    title: PropTypes.number,
    poster: PropTypes.string
  }
  render() {    
    return (
      <div>
        <MoviePoster poster={this.props.poster}/>
       <h1>{this.props.title}</h1>
      </div>
    );
  }
}
```

index.js:2177 Warning: Failed prop type: Invalid prop `title` of type `string` supplied to `Movie`, expected `number`.



#### isRequired 필수값 설정

Movie.js

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Movie.css';

class Movie extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }
  render() {    
    return (
      <div>
        <MoviePoster poster={this.props.poster}/>
       <h1>{this.props.title}</h1>
      </div>
    );
  }
}
class MoviePoster extends Component {

  static propTypes =  {
    poster: PropTypes.string.isRequired
  }
  render() {
    console.log(this.props);
    return (
      <img src={this.props.poster} alt="" />
    );
  }
}
  export default Movie;
```



# Component Lifecycle

컴포넌트는 여러 기능들(function)을 정해진 순서대로 실행한다.

## Render 

### componentWillMount() -> render() -> componentDidMount()

will mount 를 진행할때 api에 작업을 요청한다.

완료되면 데이터관련된 작업 !

will mount -  사이클이 시작되었음

render - 컴포넌트가 리액트 세계에 '존재'하게 되었음

did mount -  리액트 세계에 컴포넌트가 자리잡음



## update

### componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() ->render() -> componentDidUpdate()



# Thinking in React Component State

### state

: 리액트 컴포넌트 안에 있는 Object

컴포넌트 안에 있는state가 바뀔때마다 컴포넌트는 다시 render가 발생한다.

컴포넌트를 로드하는 방법이고 디폴트 state와 함께

App.js

```javascript
import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

const movies = [
  {
    title : "Matrix",
    poster: "http://ticketimage.interpark.com/Movie/still_image/V16/V1601447p_s01.gif"
  },
  {
    title: "Full Metal Jacket",
    poster: "https://resizing.flixster.com/G-2niPIShTNblY9-sUj9FrQit3U=/206x305/v1.bTsxMTE2ODAyOTtqOzE3NTg5OzEyMDA7ODAwOzEyMDA"
  },
  {
    title: "Oldboy",
    poster: "https://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg"
  },
  {
    title: "Star Wars",
    poster: "http://cdn.movieweb.com/img.albums/FRgAKNrSBIT2km_8_600.jpg"
  }
]
class App extends Component {

  //Render : componentWillMount() -> render() -> componentDidMount()

  //Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() ->render() -> componentDidUpdate()
  
  componentWillMount(){
    console.log('componentWillMount');
  }

  state = {
    greeting: "Hello!"
  }
 
  componentDidMount(){
    setTimeout( ()=>{
      this.setState({
        greeting: "Hello again!"
    });
    },5000)
  }
  render() {
    console.log('render');
    return (
      <div className="App">
        {this.state.greeting}
        {movies.map((movie, index) => {
          return <Movie title={movie.title} poster={movie.poster} key={index}/>
        })}
      </div>
    );
  }
}

export default App;

```



# Practicing this setState

영화목록에 하나 추가하기

1. movies를 state에 옮겨서 작업

App.js

```javascript
import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  //Render : componentWillMount() -> render() -> componentDidMount()

  //Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() ->render() -> componentDidUpdate()
  
  componentWillMount(){
    console.log('componentWillMount');
  }

  state = {
    greeting: "Hello!",
    movies: [
      {
        title : "Matrix",
        poster: "http://ticketimage.interpark.com/Movie/still_image/V16/V1601447p_s01.gif"
      },
      {
        title: "Full Metal Jacket",
        poster: "https://resizing.flixster.com/G-2niPIShTNblY9-sUj9FrQit3U=/206x305/v1.bTsxMTE2ODAyOTtqOzE3NTg5OzEyMDA7ODAwOzEyMDA"
      },
      {
        title: "Oldboy",
        poster: "https://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg"
      },
      {
        title: "Star Wars",
        poster: "http://cdn.movieweb.com/img.albums/FRgAKNrSBIT2km_8_600.jpg"
      }
    ]
  }
 
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        movies: [
          ...this.state.movies,
          {
            title: "Trainpotting",
            poster: "http://cdn.movieweb.com/img.albums/FRgAKNrSBIT2km_8_600.jpg"
          }
        ]
      });
    }, 1000);
  }
  render() {
    console.log('render');
    return (
      <div className="App">
        {this.state.movies.map((movie, index) => {
          return <Movie title={movie.title} poster={movie.poster} key={index}/>
        })}
      </div>
    );
  }
}

export default App;

```

위와같은걸 응용해서  infinite scroll 할 수 있다.



# Loading states

데이터없이 컴포넌트가 로딩하고 데이터를위해 API를 불러서 API가 데이터를 주면

컴포넌트가 업데이트.

API콜을 타임아웃기능으로 구현



데이터가 없을때는 loading..하다가 5초후(데이터가있으면) 영화리스트 보이기

App.js

```javascript
import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  //Render : componentWillMount() -> render() -> componentDidMount()

  //Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() ->render() -> componentDidUpdate()
  
  componentWillMount(){
    console.log('componentWillMount');
  }

  state = {
  }
 
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        movies: [
          {
            title : "Matrix",
            poster: "http://ticketimage.interpark.com/Movie/still_image/V16/V1601447p_s01.gif"
          },
          {
            title: "Full Metal Jacket",
            poster: "https://resizing.flixster.com/G-2niPIShTNblY9-sUj9FrQit3U=/206x305/v1.bTsxMTE2ODAyOTtqOzE3NTg5OzEyMDA7ODAwOzEyMDA"
          },
          {
            title: "Oldboy",
            poster: "https://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg"
          },
          {
            title: "Star Wars",
            poster: "http://cdn.movieweb.com/img.albums/FRgAKNrSBIT2km_8_600.jpg"
          },
          {
            title: "Trainpotting",
            poster: "https://resizing.flixster.com/MqY3wZXTHDAdhVAs8CMSjOikRg8=/300x300/v1.bjs1NTQ3OTM7ajsxNzUxMTsxMjAwOzIwMDA7MTMzMQ"
          }
        ]
      });
    }, 5000);
  }

  _renderMovies = () =>{
    const movies = this.state.movies.map((movie, index) => {
      return <Movie title={movie.title} poster={movie.poster} key={index}/>
    })
    return movies
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

```



# Smart vs Dumb



### stateless functional component

모든 컴포넌트가 state가 있는것은 아니다.

똑똑한 컴포넌트는 state가 있고 멍청한 컴포넌트는 state가 없다.

state가 없고 props만 있을때 - 클래스 컴포넌트를 쓰는 대신 functional을 쓰면된다.  

Movie.js

```javascript
class MoviePoster extends Component {

  static propTypes =  {
    poster: PropTypes.string.isRequired
  }
  render() {
    console.log(this.props);
    return (
      <img src={this.props.poster} alt="" />
    );
  }
}

function MoviePoster({poster}){
  return (
    <img src={poster} alt="" />
  )
}
```

- 이 컴포넌트는 will mount, function, update state가 필요없다.
- 1개의 props와 html 만 필요하다.
- function render도 없고 라이프사이클도 없다.
- return 만 있다. 



functional component로 바꾸기

Movie.js



```javascript
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
function Movie({title, poster}){
  return (
    <div>
      <MoviePoster poster={poster}/>
    <h1>{title}</h1>
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

function MoviePoster({poster}){
  return (
    <img src={poster} alt="" />
  )
}
Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
}
MoviePoster.propTypes = {
  poster: PropTypes.string
}
  export default Movie;
```

this가 필요없다. 이미 props를 쓴다.

functional 컴포넌트를 가지고 있으면 will mount...다 없다. (state도 없다.)

html return 한다.



# AJAX on React

JSON : 

FETCH request

FATCH를 이용해서 URL에서 뭔가를 GET

->개발자도구 network로 json 확인

```javascript
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
    fetch('https://yts.ag/api/v2/list_movies.json?sort_by=rating')
  }

  _renderMovies = () =>{
    const movies = this.state.movies.map((movie, index) => {
      return <Movie title={movie.title} poster={movie.poster} key={index}/>
    })
    return movies
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

```



# Promise

: 새로운 자바스크립트 오브젝트가 아니라 컨셉

## asynchronous program

```javascript
 componentDidMount(){
    console.log(fetch('https://yts.ag/api/v2/list_movies.json?sort_by=rating'));
    console.log('hello'); //두번째라인 hello는 첫번째라인 fetch가 끝나지 않으면 실행되지않는다.
  }
```

동기의 단점을 극복할때 promise!!!

기능들

- 모든 작업들은 다른 작업 수행이랑 관계없이 진행된다.

- 시나리오가 생기고 이를 관리할 수 있다. 

  ex: 2가지 시나리오 영화를보러간다. 영화를 보러가지 못한다. 



then function은 1개의 attribute만 준다.  - Object fetch의 결과물

그 이름을 response

```javascript
componentDidMount(){
    fetch('https://yts.ag/api/v2/list_movies.json')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))   
  }
```

# Asyns Await

```javascript
  componentDidMount(){
    fetch('https://yts.ag/api/v2/list_movies.json')
    .then(response => response.json())
    .then(json => {
      this.setState({
        movies: json.data.movies
      })
      .then( ()=> .then())
      CALLBACK HELL!
    })
    .catch(err => console.log(err))   
  }
```

위와같이 then then 지저분해지기에 Asyns Await를 쓴다.

function들이 한꺼번에 몰아있는것보다는 작은 function.들이 다른장소에 있는것이 좋다.

```javascript
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
      return <Movie title={movie.title} poster={movie.large_cover_image} key={movie.id}/> //index는 느려서 id사용
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

```

async를 안쓰면 await 가 작동을 안한다.



App.js

```javascript
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

```

Movie.js

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Movie.css';


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
```

