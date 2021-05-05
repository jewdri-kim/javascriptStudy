# Promise

- 자바스크립트 비동기 처리에 사용되는 객체
- 비동기 처리 : 특정코드의 실행이 완료될때까지 기다리지않고 다음코드를 먼저 수행
- 두가지 고려하여 사용 
  - state 에 대한 이해
  - producer comstomer 에 대한 이해 





## 왜 필요할까?

- 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용
- 서버에서 데이터를 요청하고 받아오기 위해 아래와 같은 API 를 사용

```javascript
$.get('url 주소/products/1', function(response) {
  // ...
});
```

- 데이터 요청 완료되기전에 화면에 데이터를 표시하면 undefined 또는 오류
- 이런 문제점 해결하기 위한 방법 중 하나가 프로미스!



## promise 코드

- 프로미스가 만들어지면 콜백함수 바로 실행

```javascript
const promise = new Promise((resolve, reject)=>{
    console.log('doing something');
})
```



- ajax 통신 코드

```javascript
function getData(callbackFunc) {
  $.get('url 주소/products/1', function(response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function(tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

- 프로미스를 적용한 코드

```javascript
function getData(callback) {
  // new Promise() 추가
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function(tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});
```

- 콜백함수 구조 -> new Promise(), resolve(). then() 와 같은 프로미스 API 구조



## 프로미스의 3가지 상태 (states)

- 상태란 처리과정을 의미
- new Promise() 로 프로미스를 생성하고 종료될때까지 3가지 상태를 갖는다
  - Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
  - Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
  - Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태



### Pending (대기)

- new Promise() 메서드를 호출하면 대기상태

```javascript
new Promise();
```

- new Promise() 메서드를 호출할 때 콜백함수를 선언할 수 있고, 콜백함수의 인자는 resolve, reject 이다.

```javascript
new Promise(function(resolve, reject) {
  // ...
});
```



### Fulfilled (이행)

- 콜백함수의 인자 resolve를 아래와 같이 실행하면 이행(Fulfilled) 상태가 된다. => 완료

  ```javascript
  new Promise(function(resolve, reject) {
    resolve();
  });
  ```

- 이행상태가 되면 then()을 이용하여 처리 결과 값을 받을 수 있다.

```javascript
function getData() {
  return new Promise(function(resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function(resolvedData) {
  console.log(resolvedData); // 100
});
```



### Rejected (실패)

- new Promise() 생성시 콜백함수 인자로 받은것중 reject를 호출하면 실패(Rejected)상태가 된다.

  ```javascript
  new Promise(function(resolve, reject) {
    reject();
  });
  ```

- 실패 상태가 되면 실패한 이유를(실패 처리 결과값) cath()로 받을 수 있다.

  ```javascript
  function getData() {
    return new Promise(function(resolve, reject) {
      reject(new Error("Request is failed"));
    });
  }
  
  // reject()의 결과 값 Error를 err에 받음
  getData().then().catch(function(err) {
    console.log(err); // Error: Request is failed
  });
  ```

  



## 프로미스코드 - 예제

- ajax 통신 코드 예지코드에 프로미스를 적용

```javascript
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});
```

- getData에서 response에 받아오면 - resolve() 호출, 응답없으면 reject() 메서드를 호출
- 호출된 메서드에 따라 then()이나 cathch()로 분기





```javascript
// 1. Producer
const promise = new Promise((resolve, reject)=>{
    console.log('doing something');
    setTimeout(function() {
        resolve('Jewdri');
      }, 2000);
})

// 2. Consumers : then, catch, finally
promise.then((value) => {
    console.log(value);
});
```

```javascript
// 1. Producer
const promise = new Promise((resolve, reject)=>{
    console.log('doing something');
    setTimeout(function() {
        //resolve('Jewdri');
        reject(new Error('no network'));
      }, 2000);
})

// 2. Consumers : then, catch, finally
promise
    .then((value) => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    });
```

```javascript
// 1. Producer
const promise = new Promise((resolve, reject)=>{
    console.log('doing something');
    setTimeout(function() {
        //resolve('Jewdri');
        reject(new Error('no network'));
      }, 2000);
})

// 2. Consumers : then, catch, finally
promise
    .then((value) => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(()=>{
        console.log('finally');
    })
```





## Promise chaining

```javascript
  const fetchNumber = new Promise((resolve, reject) => {
      setTimeout(()=> resolve(1),1000);
  })


  fetchNumber
    .then(num => num *2)
    .then(num => num *3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(()=> resolve(num -1, 1000));
        })
    })
    .then(num => console.log(num));
```



### 오류처리

```javascript
    const gethen = () =>
        new Promise((resolve, reject) => {
            setTimeout(()=> resolve('🐔'), 1000);
        })

    const getEgg = hen =>
        new Promise((resolve, reject) =>{
            setTimeout( ()=>resolve(`${hen} => 🥚`), 1000);
        });

    const cook = egg => 
        new Promise((resolve, reject) => {
            setTimeout(resolve(`${egg} => 🍳`), 1000);
        });

    gethen()
    .then(hen=>getEgg(hen))
    .then(egg => cook(egg))
    .then(meal => console.log(meal));
```





