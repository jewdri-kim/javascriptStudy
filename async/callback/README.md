# 비동기 처리와 콜백함수



Promise : 자바스크립트 비동기 처리에 사용되는 객체



## 비동기 vs 동기

```javascript
 console.log('1');
 console.log('2');
 console.log('3');
```

```javascript
 console.log('1');
 setTimeout(function(){
    console.log('2');
 }, 1000);
 console.log('3');
```

```javascript
 setTimeout(function(){
    console.log('2');
 }, 1000);

 setTimeout(()=>console.log('2'),1000);
```

- ES6 화살표 함수에 익숙해지기!

- setTimeout 안에 들어가는 function 콜백!!!

  

## 콜백함수 

- 함수의 파라미터로 전달해주는것이 callback
- 흔한 예 
  - setTimeout
  - 플러그인
    - slick : https://kenwheeler.github.io/slick/
    - swiper : https://swiperjs.com/swiper-api
- 콜백은 비동기만 있을까 ? 

```javascript
 // 동기 콜백
function printImmediately(print){
    print();
}

printImmediately(()=>console.log('hello'));


// 비동기 콜백
function printWithDelay(print, timeout){
    setTimeout(print, timeout);
}

printWithDelay(()=>console.log('async callback'), 2000);
```



## 콜백체인의 문제점

- 로그인 예시 코드

```javascript
class UserStorage {
    loginUser(id, password, onSuccess, onError){
        setTimeout(()=>{
            if(
                (id === 'Jewdri' && password === 'd2.co.kr!!') ||
                (id === 'Sally' && password === 'd2.co.kr!@#')
            ) {
                onSuccess(id);
            } else{
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(()=>{
            if(user === 'Jewdri'){
                onSuccess({ name: 'Jewdri', role: 'admin'});
            }else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}
```

```javascript
const userStorage = new UserStorage();

const id = prompt('id');
const password = prompt('password');

userStorage.loginUser(id, password, 
    (user) => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role}`);
            },
            error => {
                console.log('Error');
            }
        );
    }, 
    (error)=>{console.log('Error');}
);
```

- 가독성이 떨어진다.
- 비즈니스 로직 보기 어렵다.
- 에러 발생시 디버깅해야될 경우 어렵다.
- 유지보수 어렵다.

#### 참고 : Template literals

- `템플릿 리터럴`은 내장된 표현식을 허용하는 문자열 리터럴
- 검색 : https://eblee-repo.tistory.com/38





### 콜백체인 해결법

- Promise나 Async를 사용하면 편하게 해결 가능하다. 

  