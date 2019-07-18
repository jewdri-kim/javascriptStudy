# Lesson 05 - 프로토타입 방식으로 클래스 만들기

지난번 : https://github.com/jewdri-kim/javascriptStudy/blob/master/prototype/prototype_01.md



## 함수형 클래스의 단점 (프로토타입 방식의 필요성)

#### 지난번꺼 예제 수정 2 > 인스턴스 생성시 메서드 호출 줄여주기

- 탭메뉴는 쉬운예제를 들기 위함
- TabMenu 클래스 하나를 이용해 독립적으로 동작하는 탭메뉴를 여러개 만들 수 있다.

```
// 탭메뉴 함수 방식으로 클래스이용
$(document).ready(function(){
    //인스턴스 생성
    var tabMenu1 = new TabMenu('.tabMenu1');    //생성자에 파라미터 추가
    //tabMenu1.initEvent();       //매번만들때마다 귀찮
    
    //인스턴스 생성2
    var tabMenu2 = new TabMenu('.tabMenu2');    //생성자에 파라미터 추가
    var tabMenu3 = new TabMenu('.tabMenu3');
})

function tabMenu(pSelector){   //생성자에 파라미터 추가
    //프로퍼티생성
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectMenuItem = null;
    
    // ***생성자에서 초기메서드 호출***
    this.init(pSelector);      //생성자에서 받은 파라미터 메서드에
    this.initEvent();
    //메서드
    
   //초기화 메서드
    this.init = function(pSelector){      //생성자에 파라미터 추가 //여기서잠깐!!!=>추가에서
        this.$tabMenu = $(pSelector);
        this.$menuItems = this.$tabMenu.find('li');
    }
    
    //이벤트 메서드 
    this.initEvent = function(){
        var objThis = this;     						//여기서잠깐!!!=>추가에서
        this.$menuItems.on('click',function(){
            objThis.setSelectItem($(this));
        });
    }
    
    this.setSelectItem = function($menuItem){          //여기서잠깐!!!=>추가에서
        if(this.$selectMenuItem){
            this.$selectMenuItem.remveClass('active');
        }
        this.$selectMenuItem = $menuItem;
        this.$selectMenuItem.addClass('active');
    }
    //... 생략
}    
```

##### But, 단점은?

![](https://raw.githubusercontent.com/jewdri-kim/javascriptStudy/master/prototype/img/ex1.jpg)



- 메서드 하나의 크기가 100이고 프로퍼티 크기가 10이라고 했을때 - 하나의 탭메뉴 인스턴스의 크기는??
  - 프로퍼티 3개 10*3
  - 메서드 3개 100*3
  - 객체 하나당 330
  - 탭메뉴 3개면 990
  - 실무에서 100개 1000개 쓸때는???!!!



#### 프로토타입은 ??

![](https://raw.githubusercontent.com/jewdri-kim/javascriptStudy/master/prototype/img/ex2.jpg)

- 모든 인스턴스는 TabMenu.prototype 에 만들어져 있는 메서드를 공유해서 사용

- 중요! 프로토타입의 메서드들은 오직한번만 만들어진다.

- 크기 계산.

  - 프로퍼티 3개 10*3
  - 프로토타입메서드 3개 100*3
  - 객체 하나당 30
  - 탭메뉴 3개면 90 + 300 => 390 (아까 990 VS 390)
  - 실무에서 100개 1000개 쓸때는???!!!
  - 100개 일때 비교 (함수형 : 330X100 , 프로토타입 30X100+300) => 33000 VS 3300

- So, 많이 찍어내는 플러그인의 경우 프로토타입 형태

  

## 01_ 사용법

```javascrit
function 클래스이름(){
    this.프로퍼티1 = 초기값;
    this.프로퍼티2 = 초기값;

    ......

    //this.메서드명 = function(){}->XXXX
}

클래스이름.prototype.메서드명 = function(){}
```

#### 예제1> 프로토타입 방식을 활용한 간단한 클래스

```javascript
// 클래스 생성자
function User(){
    this.name="Jewdri";
    this.age = 10;
    
     //this.showInfo = function(){}->XXXX
}

// 프로토타입 메서드 정의
User.prototype.showInfo = function(){
    console.log("name = " + this.name + "age = "+this.age);
}

// 인스턴스생성
var user1 = new User();
// 메서즈 호출
user.showInfo();
```

- 생성자는 함수방식 = 프로토타입방식 같다.
- 프로퍼티 정의도 함수방식과 동일
- 메서드 정의 방법 (다른)
  - 프로토타입 방식에서는 메서드는 prototype이라는 곳에 만들어준다.
  - 함수방식은 생성자 내부에서  this 속성에 메서드를 생성
  - 프로토타입 방식은 **생성자 밖**에서 **prototype 속성**에 메서드를 생성
- 인스턴스 생성방법은 같다.
- 객체 외부에서 프로퍼티와 메서드 접근방법 : 함수방식과 동일
  - 객체 내부 프로토타입 메서드 안에서도 내부 프로퍼티 접근하는 방식 동일하다

- 상속기능 : 프로토타입 방식의 또 하나의 큰특징!! prototype 이용해 상속을 구현할 수 있다. 





# Lesson 06 - 클래스 정의방법 3가지 비교





## 1 . 특징

| 방식           | 특징                                                         |
| -------------- | ------------------------------------------------------------ |
| 리터럴 방식    | 클래스 만드는 용도 X<br />여러개 그룹으로 묶어 사용          |
| 함수방식       | 간단한 클래스 제작시 사용<br />인스턴스마다 메서드가 독립적으로 만들어지는 단점 |
| 프로토타입방식 | 일반적인 클래스 제작방법<br />인스턴스마다 공통된 메서드를 공유해서 사용하는 장점<br />jQuery 도 prototype 방식으로 만들어져있음 |

## 2. 클래스 정의 방법

#### 리터럴 방식

```javascript
var 인스턴스 = {
	프로퍼티1 : 초기값,
    프로퍼티2: 초기값
    
    메서드1: function(){},
    메서드2: function(){}
}

```

#### 함수방식

```javascript
function 클래스이름(){
	this.프로퍼티1 : 초기값,
    this.프로퍼티2: 초기값
    
    this.메서드1 = function(){},
    this.메서드2 = function(){}
}

```

#### 프로토타입방식

```javascript
function 클래스이름(){
	this.프로퍼티1 : 초기값,
    this.프로퍼티2: 초기값
}

    
클래스이름.prototype.메서드1 =  function(){}
클래스이름.prototype.메서드2 =  function(){}
```

#### 

## 3. 인스턴스 생성방법

| 리터럴방식        | 함수방식                        | 프로토타입 방식                 |
| ----------------- | ------------------------------- | ------------------------------- |
| var 인스턴스 = {} | var 인스턴스 = new 클래스이름() | var 인스턴스 = new 클래스이름() |



## 4. 객체 외부에서 프로퍼티와 메서드 접근방법

- 객체 외부에서 프로퍼티와 메서드 접근방법 : 함수방식, 프로토타입방식 다 동일

```
인스턴스.프로퍼티1;
인스턴스.매서드1();
```



## 5. 객체 내부에서 프로퍼티와 메서드 접근방법

- 함수방식, 프로토타입방식 다 동일

#### 리터럴 방식

```javascript
var 인스턴스 = {
	프로퍼티1 : 초기값,
    프로퍼티2: 초기값
    
    메서드1: function(){
        alert(this.프로퍼티1);
        this.메서드2();
    },
    메서드2: function(){}
}

```

#### 함수 방식

```javascript
function 클래스이름(){
	this.프로퍼티1 : 초기값,
    this.프로퍼티2: 초기값
    
    this.메서드1 = function(){
        alert(this.프로퍼티1);
        this.메서드2();
    },
    this.메서드2 = function(){}
}

```

#### 프로토타입 방식

```javascript
function 클래스이름(){
	this.프로퍼티1 : 초기값,
    this.프로퍼티2: 초기값
}

    
클래스이름.prototype.메서드1 =  function(){
    alert(this.프로퍼티1);
    this.메서드2();
}

```



# 정리

- 하나 또는 소수만 쓸때는 - 리터럴, 함수형이 적합
- 플러그인과 같이 다수의 인스턴스를 사용할땐 프로토타입 방식



