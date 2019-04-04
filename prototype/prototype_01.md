# Lesson 01 - 클래스 소개

클래스란 ? 연관있는 변수와 함수만을 선별해 모아놓은 것

(자스에서는 객체가 클래스와 비슷하다. )

```javascript
var a = {
    name : '김지혜',
    print: function(){ console.log(this.name); }
}
```

깊게 따지자면, 실제는 클래스는 아니지만 클래스 흉내낸 것 = 객체 (상속과 같은 클래스 특징들도 흉내낼 수 있다.)

### 클래스기능

- 객체 단위의 코드 그룹화
- 객체 단위의 중복코드 제거 및 코드 재사용성



자바스크립트에서는 클래스처럼 사용할 수 있는 방법 3가지 - 리터럴 방식, 함수방식, 프로토타입 방식



## 리터럴방식

```javascript
var 이름 = {
    프로퍼티1: 초기값,
    프로퍼티2: 초기값,
    
    메서드1: function(){        
    },
    메서드2: function(){
    }
    
}
```



## 함수방식

```javascript
function 이름(){
    this.프로퍼티1 = 초기값;
    this.프로퍼티2 = 초기값;
    
    this.메서드1 = function(){}
    this.메서드2 = function(){}
}
```



## 프로토타입 방식

```javascript
function 이름(){
    this.프로퍼티1 = 초기값;
    this.프로퍼티2 = 초기값
}

이름.prototype.메서드1 = function(){}
이름.prototype.메서드2 = function(){}
```



## Lesson1 정리

- 자바스크립트에서 클래스는  - 객체로 표현, 함수 또한 객체형태

- 프로그래밍적인 지식에서 자료구조 - 해쉬구조

  <https://ko.wikipedia.org/wiki/%ED%95%B4%EC%8B%9C_%ED%85%8C%EC%9D%B4%EB%B8%94>

- Core 적인 부분까지 자세히 알 필요는 없지만, 어느정도 개념만 알고있기



# Lesson 02 - 클래스 관련 기본 개념과 용어정리



함수를 사용하려면 함수 정의(틀) -> 함수호출(실체- 실제사용)

```javascript
function printName(pName){     //함수정의 : 실행되지 않는다.
    console.log(pName);
}
```

```javascript
printName('옹성우');           //함수호출 : 정의된 구문이 실행된다. (실체가 됨)
```



클래스 (틀) -> new 클래스명() : 인스턴스 또는 객체 (결과물)

※ 흔히 객체지향책에서 설명 : 붕어빵 틀 -> 붕어빵 - 정확한 설명은 아니지만 어느정도 이해할 수 있다.



### 우리가 흔히 쓰는 예시 

```javascript
var date = new Date();       // Date 날짜클래스(객체), 틀   ==> new Date 날짜인스턴스(객체)
console.log(date);
```

※ 브라우저 콘솔창에서 Date에 짜여있는 메소드를 보자. 이것도 틀이다. 



#### 날짜객체 Date

- 슬릿 슬라이드 플러그인 (클래스 = 틀)  =>  사용시 선택자 및 옵션값 파라미터로 전달하면서 인스턴스생성 new 클래스명과 동일 



#### **슬릿 사용**

`main.js`

```javascript
$('.ranking-slider').slick({    // 함수 호출 
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		//autoplay: true,
		//autoplaySpeed: 3000,
		dots: true,
		customPaging : function(slider, i) {
			var lSlide = slider.$slides[i];
			return '<a href="javascript:;">' + '<span>'+ $(lSlide).attr('data-name') +'</span>' + '</a>';
		}
	});
```



`slick.js 일부`

```javascript
 $.fn.slick = function() {     // 슬릿함수내 
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);    // 객체 인스턴스 만들어짐.(붕어빵)
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {       // 슬릿 클래스(틀)

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                .....생략
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                .....생략
```

용어정의  > (사람마다, 일마다) 다른데 이 발표(사실 책)에서는 

- 앞으로 우리가 평소에 쓰던 객체 -> 클래스라고 부른다. 

- new를 통해 만든 실체를 인스턴스 혹은 객체로 부른다.



## Lesson2 정리

- 객체, 인스턴스 두 용어 모두 클래스의 실체를 나타내는 용어
- 인스턴스 : new라는 키워드를 이용해 클래스의 실체를 생성할 때 주로 사용
- 객체 : 인스턴스 생성 후 클래스에서 제공하는 프로퍼티와 메서드를 사용할 떄 주로사용 
- 프로퍼티 : 클래스 내부에 만드는 변수, 멤버변수라고도 부름.
- 메서드 : 클래스에서 만드는 함수, 멤버함수 라고도 부름.
- 우리가 실무에서도 많이 사용하고 있다. (new Date 및 플러그인 내부)



# Lesson 03 - 리터럴 방식으로 클래스 만들기 

리터럴 방식은 객체 리터럴을 의미하는 {} 내부에 프로퍼티와 메서드를 정의 하는 구조.

#### 예시

```javascript
// *클래스 정의 및 인스턴스 생성 (동시)
var user = {
    name : "Jewdri",
    age : 1,
    showInfo:function(){
        console.log("이름 : "+this.name+ " 나이 : " + this.age);
    }
}
// 메서드 접근 (호출)
user.showInfo();
```

### 프로퍼티

- 콜론(:) 을 기준으로 왼쪽에는 프로퍼티 이름 오른쪽에는 값

- 프로퍼티 구분은 세미콜론(;)이 아닌 **콤마(,)로 구분**



### 메서드

리터럴 방식에서는 프로퍼티 정의 방법과 동일하게 메서드를 정의



### 인스턴스

- 리터럴 방식은 클래스를 정의함과 동시에 자동으로 인스턴스 생성
- 인스턴스를 만들기위해 다른작업 (new 클래스명) 필요없음
- 단점 : 인스턴스를 하나까지만 만들 수 있다 (여러개 못만듬)
- 객체 외부에서 프로퍼티와 메서드에 접근하려면 접근연산자인 점(.) 사용
- 객체 내부에서 자신의 프로퍼티와 메서드에 접근하려면 현재 객체 자신을 나타내는 this 라는 속성과 점(.)을 사용

```javascript
var 이름 = {
    프로퍼티1: 초기값,
    프로퍼티2: 초기값,
    메서드1: function(){
        console.log(this.프로퍼티1);    //내부에서사용
        this.메서드2();
    }
    메서드2: function(){}
}

이름.프로퍼티1;
이름.메서드1();
```

#### 탭메뉴를 이용하여 예제

- 실제 작업시, 탭메뉴를 이렇게 클래스로 만들 필요는 없다. (접근성 쉬운예로 예제를 들기위함)

```javascript
// 탭메뉴 리터럴 방식으로 
$(document).ready(function(){
    tabMenu1.init();
    tabMenu1.initEvent();
});

var tabMenu1 = {
    //프로퍼티
    $tabMenu : null,
    $menuItems: null,
    $selectMenuItem : null,
    
    //메서드
    
    //초기화 메서드
    init: function(){
        this.$tabMenu = $('#tabMenu1');
        this.$menuItems = this.$tabMenu,find('li');
    }
    
    //이벤트 메서드
    initEvent: function(){
        var objThis = this;       // 왜 이렇게 쓸까?
        this.$menuItems.on('click',function(){
            objThis.setSelectItem($(this));
        });
    }
    
    //클릭한 메뉴 아이템 선택 메서드
    setSelectItem: function($menuItem){
        //기존 메뉴 비활성화
        if(this.$selectMenuItem){
            this.$selectMenuItem.removeClass('active');
        }
        //선택한 메뉴활성화
        this.$selectMenuItem = $menuItem;
        this.$selectMenuItem.addClass('active');
    }
}
```



## Lesson 03 정리

- 리터럴 방식은 정의함과 동시에 인스턴스가 자동으로 만들어진다.

- 단점은 여러개를 만들 수 없다.

- 주 용도: 여러개 데이터 포장용


# Lesson 04 함수 방식으로 클래스 만들기



- 함수 방식 클래스의 경우는 하나의 함수 내부에 프로퍼티와 메서드를 정의하는 구조
- 프로퍼티와 메서드는 자기자신을 나타내는 this에 정의해야 한다.

```javascript
// 클래스 정의

function User(){
    this.name = "Jewdri";
    this.age = 1;
    this.showInfo = function(){
        console.log("이름 : "+this.name+ " 나이 : " + this.age);
    }
}
```

- 자바스크립트에서는 클래스 만드는 방법은 함수 만드는 방법과 동일.
- 둘다 function 키워드를 사용하기 때문에 내부 구문 안봐서는 일반함수인지 클래스인지 구분X
-  일반적으로 함수이름을 소문자로, 클래스는 대문자로 시작
- 그래서 클래스함수를 만들땐 특별한 경우를 제외하고는 대문자로 작성하자



### 생성자

- 인스턴스가 만들어지면서 자동으로 호출되는 함수
- 주로 프로퍼티를 초기화 하는 구문을 작성

### 프로퍼티

- 함수방식에서 프로퍼티는 this에 만들어줌

### 메서드

- 메서드 역시 this 에 만들어줌



### 인스턴스

- '클래스이름' 함수를 호출할 때 앞에 new 키워드를 추가해 호출 (=생성자 호출)
- 객체외부에서 객체 내부에 있는 프로퍼티와 메서드에 접근하려면 접근연산자(.) 를 이용

```javascript
function 클래스이름(){     //생성자
    this.프로퍼티1 = 초기값;
    this.프로퍼티2 = 초기값;
    this.메서드1 = function(){
        console.log(this.프로퍼티1);
        this.메서드2();
    }
}

var 인스턴스 = new 클래스이름();
인스턴스.프로퍼티1;
인스턴스.메서드1();
```

#### 탭메뉴를 이용하여 예제

```javascript
// 탭메뉴 함수 방식으로 클래스이용
$(document).ready(function(){
    //인스턴스 생성
    var tabMenu1 = new TabMenu();
    tabMenu1.init();
    tabMenu1.initEvent();
})

function tabMenu(){
    //프로퍼티생성
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectMenuItem = null;
    
    //메서드
    
    //초기화 메서드
    this.init = function(){
        this.$tabMenu = $('.tabMenu');
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
}
```

#### 예제 수정 > 여러번 여러군데 쓸수있도록

```javascript
// 탭메뉴 함수 방식으로 클래스이용
$(document).ready(function(){
    //인스턴스 생성
    var tabMenu1 = new TabMenu();
    tabMenu1.init('.tabMenu1');
    tabMenu1.initEvent();
    
    //인스턴스 생성2
    var tabMenu2 = new TabMenu();
    tabMenu2.init('.tabMenu2');
    tabMenu2.initEvent();
})

function tabMenu(){
    //프로퍼티생성
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectMenuItem = null;
    
    //메서드
    
    //초기화 메서드
    this.init = function(selector){      //생성자에 파라미터 추가 //여기서잠깐!!!=>추가에서
        this.$tabMenu = $(selector);
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
}
```



#### 추가 : 네이밍 하는 방식 (클래스 쓸때 내가 주로사용)

- 클래스 내부 프로퍼티와 메서드 파라미터 혼동될 우려 ( this.$menuItems, $menuItem)
- 앞에 파라미터의 p 써줌 
- 함수내부에서 쓰는 지역변수 또한 로컬의  l 써줌 

```javascript
function tabMenu(){
    //프로퍼티생성
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectMenuItem = null;
    
    //초기화 메서드
    this.init = function(pSelector){      //생성자에 파라미터 추가 //여기서잠깐!!!=>추가에서
        this.$tabMenu = $(pSelector);
        this.$menuItems = this.$tabMenu.find('li');
    }
    
    //이벤트 메서드 
    this.initEvent = function(){
        var lObjThis = this;     						//여기서잠깐!!!=>추가에서
        this.$menuItems.on('click',function(){
            objThis.setSelectItem($(this));
        });
    }
    this.setSelectItem = function($pMenuItem){          //여기서잠깐!!!
        if(this.$selectMenuItem){
            this.$selectMenuItem.remveClass('active');
        }
        this.$selectMenuItem = $pMenuItem;    // p는 파라미터
        this.$selectMenuItem.addClass('active');
    }
}
```

#### 예제 수정 2 > 인스턴스 생성시 메서드 호출 줄여주기

```javascript
// 탭메뉴 함수 방식으로 클래스이용
$(document).ready(function(){
    //인스턴스 생성
    var tabMenu1 = new TabMenu('.tabMenu1');    //생성자에 파라미터 추가
    //tabMenu1.init('.tabMenu1');       //매번만들때마다 귀찮
    //tabMenu1.initEvent();       //매번만들때마다 귀찮
    
    //인스턴스 생성2
    var tabMenu2 = new TabMenu('.tabMenu1');    //생성자에 파라미터 추가
    //tabMenu2.init('.tabMenu2');       //매번만들때마다 귀찮
    //tabMenu2.initEvent();       //매번만들때마다 귀찮
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
    
    //... 생략
}    
```



## Lesson 04 정리

- 클래스 정의할땐 function 를 이용하여 정의
- 함수는 (소문자) 클래스는(대문자)로 네이밍
- 실제 사용할때는 new 클래스이름(); 으로 인스턴스 만들어 사용
- 하나의 클래스로 여러번 사용할 수 있음



# 리터럴 방식 , 함수방식클래스 비교

| 구분                | 리터럴         | 함수방식                                         |
| ------------------- | -------------- | ------------------------------------------------ |
| 정의                | var 클래스이름 | function 클래스이름(대문자)                      |
| 인스턴스생성        | 정의와 동시에  | new 클래스이름();                                |
| 프로퍼티,메서드정의 | {안에 바로}    | this.프로퍼티이름, this.메서드명 = function() {} |
| 재사용              | 1번만          | 여러번 인스턴스 만들어 사용                      |



다음에 이어서



출처 : [자바스크립트+jQuery 완전정복 스터디 3 중급/고급/활용편](https://book.naver.com/bookdb/book_detail.nhn?bid=9650886)



### 이거 하기에 앞서 알고 있어야하는 내용

1. 함수를 사용하는 이유를 알고있나요?

2. 지역변수와 전역변수를 이해하고 있나요?

3. 매개변수가 있는 함수를 만들 수 있나요?

4. 리턴값이 있는 함수를 만들 수 있나요?

5. 중첩 함수를 이해하고 있나요?

6. 콜백 함수를 이해하고 있나요?

7. 클로저를 이해하고 있나요?

   ### 