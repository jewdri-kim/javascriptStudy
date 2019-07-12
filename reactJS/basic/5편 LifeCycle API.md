# 5편: LifeCycle API

- 지난번 LifeCycle API 대략적으로 봤다. (아래그림 참고)

- 이번엔 아래 LifeCycle을 실제 코드를 짜보며 익히는 시간.
- https://codesandbox.io/embed/reactanyone-lifecycle-api-ycc2j

![](/jewdri-kim/javascriptStudy/blob/master/reactJS/basic/img/images.jpg?raw=true)



## 컴포넌트 초기 생성

- 일단, 컴포넌트가 브라우저에 나타나기 전, 후에 호출되는 API 들

### constructor

```javascript
constructor(props) {
  super(props);
}
```

- 생성자 함수
- 컴포넌트가 새로 만들어질 때마다 이 함수 호출

### componentWillMount

```javascript
componentWillMount() {

}
```

- 컴포넌트가 화면에 나가기 직전 호출되는 API
- v16.3부터 사라졌다.
- componentDidMount 에서 충분히 처리가능
- 대부분 사라진 LifeCycle API : will 붙는거 ====> 대체 ====> Did 붙는걸루 

### componentDidMount

```javascript
componentDidMount() {
  // 외부 라이브러리 연동: D3, masonry, etc
  // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
  // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
}
```

- 컴포넌트가 화면에 나타나게 됐을때 호출
- 주로 외부라이브러리 연동(D3, masonry, etc)
- 데이터 요청 (Ajax, GraphQL, etc)
- 직접변경할때도 



## 컴포넌트 업데이트

- props의 변화 그리고 state의 변화에 따라 결정

### componentWillReceiveProps

```javascript
componentWillReceiveProps(nextProps) {
  // this.props 는 아직 바뀌지 않은 상태
}
```

- 새로운 props 를 받게 됐을때 호출
- state가 props에 따라 변해야하는 로직 작성한다. 
- 새로 받게될 props는 nextProps로 조회할수 있다.
- v16.3부터 안쓴다. => UNSAFE_componentWillReceiveProps() OR [getDerivedStateFromProps](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 로 대체
- 아까말했다시피 will류는 거의 없어진다고 보면된다. 



### [NEW] static getDerivedStateFromProps()

- v16.3 이후에 만들어진 LifeCycle API
-  props로 받아온 값을 state로 동기화 하는 작업을 해줘야 하는 경우에 사용 

- 객체 리턴하면 그 객체가 state값이 된다.

```javascript
static getDerivedStateFromProps(nextProps, prevState) {
  // 여기서는 setState 를 하는 것이 아니라
  // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
  // 사용됩니다.
  /*
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  */
}
```

### shouldComponentUpdate

```javascript
shouldComponentUpdate(nextProps, nextState) {
  // return false 하면 업데이트를 안함
  // return this.props.checked !== nextProps.checked
  return true;
}
```

- 컴포넌트 최적화하는 작업에서 매우 유용
- 특정조건에 따라 랜더링 막아준다.
- 리엑트는 원래 부모 컴포넌트 리랜더링 -> 자식 컴포넌트 랜더링 ( render함수호출)
- 기본 true 반환 false 반환하면 render함수 호출X



### componentWillUpdate

```javascript
componentWillUpdate(nextProps, nextState) {

}
```

- will 붙었쥬? **이 API 또한 v16.3 이후 deprecate**
- shouldComponentUpdate 에서 true 를 반환했을때만 호출
- false 반환하면 호출 X



### [NEW] getSnapshotBeforeUpdate()

이 API 가 발생하는 시점은 다음과 같다.

1. render()
2. **getSnapshotBeforeUpdate()**
3. 실제 DOM 에 변화 발생
4. componentDidUpdate

이 API를 통해서, DOM 변화가 일어나기 직전의 DOM 상태를 가져오고, 여기서 리턴하는 값은 componentDidUpdate 에서 3번째 파라미터로 받아올 수 있게 됩니다.

https://codesandbox.io/embed/getsnapshotbeforeupdate-yeje-6rkq2



### componentDidUpdate

```javascript
componentDidUpdate(prevProps, prevState, snapshot) {

}
```

- render()를 호출하고 난 다음에 발생
- this.props 와 this.state가 이미 바뀐상태
- 그 전꺼는 prevProps 와 prevState 에서 조회
- snapshot 는 getSnapshotBeforeUpdate() 에서 반환한 값



## 컴포넌트 제거

- 컴포넌트가 더 이상 필요하지 않게 되면 단 하나의 API 호출



### componentWillUnmount

```javascript
componentWillUnmount() {
  // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
}
```



## 직접 사용해보기

- 블로그에 있는건 안함 ->각자해보세요.
- https://codesandbox.io/embed/reactanyone-lifecycle-api-ycc2j
- 위에 꺼 기반으로 영화API불러오기
  -  (code : https://github.com/jewdri-kim/javascriptStudy/tree/master/reactJS/basic/hello-react)



## 컴포넌트에 에러 발생



### componentDidCatch

- 에러가 발생할 수 있는 컴포넌트의 부모컴포넌트에서 작성
- 에러 발생하면 componentDidCatch 가 실행
- state의 error값을 이용하여 render함수에서 에러라고 화면 띄워주면된다. 



## 정리

- 리액트 컴포넌트가 사용될 때 각 상황에 따라 호출되는 LifeCycle API 에 대해서 알아보았다.

-  이 API 들은 알아두면 여러상황에 유용하게 쓸 수 있으니, 어떠한 API 들이 있는지 인지해두시고, 나중에 해결해야 할 문제가 있을 때 사용하면 되겠습니다.

- 다음>> 섹션에서는 state 와 props 를 사용하여 컴포넌트간의 데이터 교류와 조금 더 복잡한 상태관리



