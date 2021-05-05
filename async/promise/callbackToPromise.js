'use strict';


class UserStorage {
    loginUser(id, password){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if(
                    (id === 'Jewdri' && password === 'd2.co.kr!!') ||
                    (id === 'Sally' && password === 'd2.co.kr!@#')
                ) {
                    resolve(id);
                } else{
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }

    getRoles(user){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if(user === 'Jewdri'){
                    resolve({ name: 'Jewdri', role: 'admin'});
                }else {
                    reject(new Error('no access'));
                }
            }, 1000);
        })
    }
}


const userStorage = new UserStorage();

const id = prompt('id');
const password = prompt('password');

userStorage.loginUser(id, password)
    .then(userStorage.getRoles)
    .then(user=>alert(`Hello ${user.name}, you have a ${user.role}`))
    .catch(console.log)