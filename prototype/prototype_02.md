# Lesson 05 - 프로토타입 방식으로 클래스 만들기

지난번 : https://github.com/jewdri-kim/javascriptStudy/blob/master/prototype/prototype_01.md



## 함수형 클래스의 단점 (프로토타입 방식의 필요성)

#### 지난번꺼 예제 수정 2 > 인스턴스 생성시 메서드 호출 줄여주기

- 탭메뉴는 쉬운예제를 들기 위함
- TabMenu 클래스 하나를 이용해 독립적으로 동작하는 탭메뉴를 여러개 만들 수 있다.

```javascript
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

```javascript
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



### 프로토타입 이용한 구버전 브라우저 최적화 및 사용

- 자바스크립트는 자바처럼 private , public 개념이 없어 클래스 외부에서 자꾸 수정하여 사용가능.

```javascript
var a = new String("1234");
console.log(String);
console.log(String.prototype);
a.charAt(1);


// 외부에서 charAt 메서드 수정
String.prototype.charAt = function(){
    console.log("김지혜");
}
var b = new String("1234");
b.charAt(1);
```

- 위에 특징을 활용하는 방법 :  ES6 에서 나온 repeat 문자열 반복함수

```javascript
var a = new String("abc");
a.repeat(3);  //=> "abcabcabc";

--------------------------------------------
var a = new String("abc");
if(typeof String.prototype.repeat !== "function"){
    String.prototype.repeat = function repeat(count) {
        console.log('수정');
        var str = this;
        var innerRepeat = function (str, count) {
            var result = str;
            var i, endi;

            if (count > 2) {
                for (i = 2, endi = count; i < endi; i *= 2) {
                    result += result;
                }

                result += innerRepeat(str, endi - i / 2);
            } else if (count === 2) {
                result += str;
            } else if (count <= 0) {
                result = "";
            }

            return result;
        }

        return innerRepeat(str, count);
    };
}

a.repeat(3);    


```



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



# 추가 : 클래스 프로퍼티와 메서드

- 지금까지 사용한 클래스의 프로퍼티와 메서드는 독립적으로 사용X
- 인스턴스 생성한 후 사용했었다.
- 지금까지 이용했던 형태를 그냥 프로퍼티와 메서드라고 부른다. 

예>

```javascript
 var tabMenu1 = new TabMenu("#tabMenu");
 tabMenu1.setSelectItemAt(1);
```



## 클래스 프로퍼티와 메서드란?

- 인스턴스를 생성하지 않고도 사용할 수 있는 프로퍼티와 메서드가 있다. 
- static - 자바에서도 있음
- [https://github.com/jewdri-kim/OOAD/blob/master/99_java/05%EC%9E%A5%EC%A0%84%EA%B9%8C%EC%A7%80md.md](https://github.com/jewdri-kim/OOAD/blob/master/99_java/05장전까지md.md)



### 만드는 방법

```javascript
function 클래스이름(){
    ....
}
클래스이름.프로퍼티 = 값;
클래스이름.메서드이름 = function(){}
```



### 사용법

```javascript

클래스이름.프로퍼티 = 값;
클래스이름.메서드이름 = function(){}

```



### 주용도

- 유틸리티성 기능
- 실행하더라도 내부데이터에 영향을 주지않고 독립적으로 실행되는 기능이나 정보담을 때 사용

```javascript
클래스이름.프로퍼티 = 값;
클래스이름.메서드이름 = function(){}

```



#### 용도 예제1> 탭메뉴 클래스

```javascript
function TabMenu(){
    ....
}

TabMenu.version = "1.0";
TabMenu.getInfo = function(){
    var info = {
        developer : "딴동네",
        email : "ddandongne@webdongne.com",
        decs : "탭메뉴를 구현한 클래스입니다." 
    }
    return info;
}
```

#### 용도 예제2> Math 기능사용

```javascript
// 0에서 10사이의 랜덤 숫자만들기
Math.floor(Math.random()*10);

// 두 수중 큰 숫자 값 알아내기
Math.max(10,20);
```

- Math : 자바스크립트 코어 라이브러리중 수학관련 기능을 담고 있는 클래스 
- Math 에서 제공해주는 기능은 모두 클래스 프로퍼티와 메서드로 만들어져있다. 
- 클래스 메서드의 공통점은 이 메서드를 실행한다고해서 Math 클래스 내부에 처리결과가 남거나 하지않는다. 그냥 사용할 목적에 해당
- 이와 같은 기능을 클래스 메서드로 만들어 사용 => static

#### 용도 예제3> jQuery 기능

- jQuery 에서도 static 메서드를 찾을 수 있다.
- https://api.jquery.com/category/utilities/
- 목록중에서 jQuery.메서드, jQuery.프로퍼티가 있는것을 확인할 수 있다.
- 이 중 jQuery.trim()

```javascript
var data = " 1234 ";   //문자열 좌우에 공백 포함
var result = jQuery.trim(data); 
alert(result);      //실행결과 = "1234";
```

#### 

# 패키지

- 함수: 특정 알고리증이나 구문의 영역 나누기 위해 포장
- 클래스 : 연관있는 변수와 함수를 묶을때 (포장) 사용
- 패키지 : 연관있는 클래스를 묶을 때 사용하는 기술
- 전문 프로그래밍 패턴용어로 - **네임스페이스 패턴**이라고 한다. 



### 일반 개발언어에서의 패키지

- 일반 프로그래밍에서는 대부분 패키지 문법을 제공해줌.

- 자바에서는 package 라는 명령어를 사용한다.

```java
//문법
package 패키지명 : 
publick class 클래스이름 {
    .....
}
//예
package ddan.utils:
public class StringUtil {
    ....
}
```



### 자바스크립트에서 패키지

- 자바스크립트에서는 따로 패키지 문법을 제공하진 않는다.
- 하지만 흉내내어 사용할 수 있다.

```javascript
var packageName = {}    
//또는
var packageName = new Object();

packageName.className = function(){
    .....
}....
```







출처 : [자바스크립트+jQuery 완전정복 스터디 3 중급/고급/활용편

참고 : 

[https://github.com/jewdri-kim/OOAD/blob/master/99_java/05%EC%9E%A5%EC%A0%84%EA%B9%8C%EC%A7%80md.md](https://github.com/jewdri-kim/OOAD/blob/master/99_java/05장전까지md.md)

https://github.com/jewdri-kim/OOAD/blob/master/99_java/5%EC%9E%A5%20%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D.md





자바문법 : https://wikidocs.net/book/31

자바코드연습 : https://code.sololearn.com/cVRUy2BwauK8/#java



