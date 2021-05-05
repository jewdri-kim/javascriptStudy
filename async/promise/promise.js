'use strict';




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


new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(1);
    }, 2000);
  })
  .then(function(result) {
    console.log(result); // 1
    return result + 10;
  })
  .then(function(result) {
    console.log(result); // 11
    return result + 20;
  })
  .then(function(result) {
    console.log(result); // 31
  });


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

    
    const gethen = () =>
        new Promise((resolve, reject) => {
            setTimeout(()=> resolve('🐔'), 1000);
        })

    const getEgg = hen =>
        new Promise((resolve, reject) =>{
            setTimeout( ()=>reject(new Error(`error!! ${hen} => 🥚`)), 1000);
        });

    const cook = egg => 
        new Promise((resolve, reject) => {
            setTimeout(resolve(`${egg} => 🍳`), 1000);
        });

    gethen()
    .then(hen=>getEgg(hen))
    .catch(error => {
        return '🍞';        // getEgg 에서 에러나면 대체
    })
    .then(egg => cook(egg))
    .then(meal => console.log(meal));

