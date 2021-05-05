'use strict';

// Javascript is synchronous

// 자바스크립트 동기적 -> 순서대로
// hoisting : va, function 선언 위로


 console.log('1');
 setTimeout(function(){
    console.log('2');
 }, 1000);
 console.log('3');


 setTimeout(()=>console.log('2'),1000);


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