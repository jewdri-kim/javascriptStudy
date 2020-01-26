# Canvas - Images

## drawImage()

- 캔버스에 이미지를 그린다면 다음과 같이 사용한다.

  ```javascript
  drawImage ( 이미지, x, y )
  ```

- *context*.drawImage(*img,x,y,width,height*);

```javascript
window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("scream");
  ctx.drawImage(img, 10, 10);
};
```

- context*.drawImage(*img,sx,sy,swidth,sheight,x,y,width,height*);

test.html: http://code.d2.co.kr/jewdri/idea/test.html

```html

	<canvas id="canvas" width="400" height="500">
		이 브라우저는 캔버스를 지원하지 않습니다.
	</canvas>
	<script>
		var canvas;
		var ctx;
		window.onload = function() {
			canvas = document.getElementById("canvas");
			if (canvas == null || canvas.getContext == null) return;
			ctx = canvas.getContext("2d");
			draw();
		}
		
		function draw() {
			var img = new Image();
			img.src="pic_the_scream.jpg"
			img.onload = function() {
				ctx.drawImage(img, 0, 0);
				ctx.drawImage(img,80,80,80,80,10,10,80,80);
			}
		}
	</script>
```



## getImageData()

- getImageData () 메소드는 캔버스에서 지정된 사각형의 픽셀 데이터 - ImageData 객체를 반환한다.
- R-빨강 (0-255에서)
  G-초록 (0-255에서)
  B-파랑 (0-255에서)
  A-알파

```javascript
red=imgData.data[0];
green=imgData.data[1];
blue=imgData.data[2];
alpha=imgData.data[3];
```

## putImageData()

- getImageData를 통해 이미지에 읽어드린 픽셀정보를 -> 공식에 의해 변환 (많음) -> 그 변환된 픽셀데이터를 다시 캔버스에 넣어준다.

- [grayscale.html]: http://code.d2.co.kr/jewdri/idea/grayscale.html

  ```html
  
  	<canvas id="canvas" width="400" height="500">
  		이 브라우저는 캔버스를 지원하지 않습니다.
  	</canvas>
  	<script>
  		var canvas;
  		var ctx;
  		window.onload = function() {
  			canvas = document.getElementById("canvas");
  			if (canvas == null || canvas.getContext == null) return;
  			ctx = canvas.getContext("2d");
  			draw();
  		}
  		
  		function draw() {
  			var img = new Image();
  			img.src="pic_the_scream.jpg"
  			img.onload = function() {
  				ctx.drawImage(img, 0, 0);
  								
  
  				var imgData=ctx.getImageData(0, 0, canvas.width, canvas.height);
                  var raster = imgData.data;
                  console.log(imgData.data); 
                  for(var i=0; i<raster.length; i+=4) {
                      // YCbCr Luma = 0.299*r + 0.587*g + 0.114*b
                      var brightness = 0.299 * raster[i] + 0.587 * raster[i+1] + 0.114 * raster[i+2];
                      raster[i] = brightness;
                      raster[i+1] = brightness;
                      raster[i+2] = brightness;
                  }
  				ctx.putImageData(imgData,0, 0);
  			}
  		}
  	</script>
  ```

  

- [reverse.html]: http://code.d2.co.kr/jewdri/idea/reverse.html

```html

	<canvas id="canvas" width="400" height="500">
		이 브라우저는 캔버스를 지원하지 않습니다.
	</canvas>
	<script>
		var canvas;
		var ctx;
		window.onload = function() {
			canvas = document.getElementById("canvas");
			if (canvas == null || canvas.getContext == null) return;
			ctx = canvas.getContext("2d");
			draw();
		}
		
		function draw() {
			var img = new Image();
			img.src="pic_the_scream.jpg"
			img.onload = function() {
				ctx.drawImage(img, 0, 0);
								

				var imgData=ctx.getImageData(0, 80, canvas.width, canvas.height);
                var raster = imgData.data;
                console.log(imgData.data);
				for (var i=0;i<raster.length;i++) {
					if (i % 4 != 3) {
						raster[i] = 255 - raster[i];
					}
				}
				ctx.putImageData(imgData,0, 80);
			}
		}
	</script>
```



## clip()

- 클리핑 영역이란 그리기가 제한되는 영역을 의미한다.
- 설정된 패스가 클리핑 영역이 되어 패스의 안쪽만 출력된다.

- [이미지원모양으로 clip]: http://code.d2.co.kr/jewdri/idea/clip.html

  ```html
  	<canvas id="canvas" width="400" height="500">
  		이 브라우저는 캔버스를 지원하지 않습니다.
  	</canvas>
  	<script>
  		var canvas;
  		var ctx;
  		window.onload = function() {
  			canvas = document.getElementById("canvas");
  			if (canvas == null || canvas.getContext == null) return;
  			ctx = canvas.getContext("2d");
  			draw();
  		}
  		
  
          function draw() {
              var img = new Image();
              img.src="pic_the_scream.jpg"
              img.onload = function() {
                  ctx.beginPath();
                  ctx.arc(200,100,100,0,2*Math.PI,true);
                  ctx.clip();
                  ctx.drawImage(img, 50, 0);
              }
          }
  	</script>
  ```

- [이미지 하트모양으로 clip]: http://code.d2.co.kr/jewdri/idea/clip2.html

  ```html
  	<canvas id="canvas" width="400" height="500">
  		이 브라우저는 캔버스를 지원하지 않습니다.
  	</canvas>
  	<script>
  		var canvas;
  		var ctx;
  		window.onload = function() {
  			canvas = document.getElementById("canvas");
  			if (canvas == null || canvas.getContext == null) return;
  			ctx = canvas.getContext("2d");
  			draw();
  		}
  		
  
          function draw() {
              var img = new Image();
              img.src="pic_the_scream.jpg"
              img.onload = function() {
                  ctx.beginPath();
                  ctx.moveTo(0, 0);
                  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
                  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
                  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
                  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
                  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
                  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
                  //ctx.fill();
                  ctx.clip();
                  ctx.drawImage(img, 0, 0);
              }
          }
  	</script>
  ```

  

## globalCompositeOperation

- 캔버스에 지금 그리려는 대상(도형 혹은 이미지 또는 색)이 캔버스에 이미 그려져있는 대상과 겹쳐질 때 어떻게 조합(또는 합성)할지 지정한다.

- 지정하는 속성들

  - copy : 새 도형만 그리고 나머지는 모두 제거한다.
  - darker : 두 도형이 겹치는 부분에서는 두 색의 차이 값을 구하여 최종 색을 결정한다.
  - destination-atop : 기존에 있던 내용 중 오직 새 도형과 겹치는 부분만 보존된다. 새 도형은 기존 내용의 밑에 그려진다.
  - destination-in : 기존에 있던 내용 중 새 도형과 기존 캔버스 내용이 겹치는 부분만 보존된다. 나머지는 모두 투명하게 처리된다
  - destination-out : 기존에 있던 내용 중 새 도형과 겹치지 않는 부분만 보존된다. 나머지는 모두 투명하게 처리된다
  - destination-over : 새 도형은 기존 내용의 밑에 그려진다.
  - lighter : 두 도형이 겹치는 부분에서는 두 색 값의 합을 구하여 최종 색을 결정한다.
  - source-atop : 새로 그려질 도형 중 기존 내용과 겹치는 부분만 그려진다.
  - source-in : 새로 그려질 도형 중 새 도형과 기존 내용이 겹쳐지는 부분만 그려진다. 나머지는 모두 투명하게 처리된다.
  - source-out : 새로 그려질 도형 중 기존 내용과 겹치지 않는 부분만 그려진다.
  - source-over : 새 도형은 기존 내용 위에 그려진다. 기본값
  - xor : 겹쳐지는 부분의 도형은 모두 투명하게 그렇지 않은 부분은 정상적으로 그려진다.

- [속성들 한번에]: https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp

- [lighter예시1]: http://code.d2.co.kr/jewdri/idea/reverse2.html

- [lighter예시2 - 글자랑 겹치기]: http://code.d2.co.kr/jewdri/idea/reverse4.html

- [lighter예시3 - 글자랑 겹치기]: http://code.d2.co.kr/jewdri/idea/reverse5.html

- [lighter예시4 - 글자랑 겹치기]: http://code.d2.co.kr/jewdri/idea/reverse6.html

- [xor 예시 - 글자랑 겹치기]: http://code.d2.co.kr/jewdri/idea/reverse7.html

- 코드 : reverse6.html

```html

	<canvas id="canvas" width="1920" height="800">
		이 브라우저는 캔버스를 지원하지 않습니다.
	</canvas>
	<script>
		var canvas;
		var ctx;
		window.onload = function() {
			canvas = document.getElementById("canvas");
			if (canvas == null || canvas.getContext == null) return;
			ctx = canvas.getContext("2d");
			draw(canvas.width/3, canvas.height);
		}
		
		function draw(pX,pY) {
			var img = new Image();
			img.src="img_cont_02.jpg"
			img.onload = function() {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.globalCompositeOperation = "lighter";
                ctx.globalAlpha = 1;
				ctx.drawImage(img, 0, 0);
                ctx.font = "500px Arial";
                ctx.fillStyle = '#9999ff';
                ctx.globalAlpha = 0.5;
                ctx.fillText("K", pX, pY);
			}
		}

        $(document).ready(function(){
            $('body').click(function(e){
                console.log(e.pageY);
                draw(e.pageX, e.pageY);
            });
        });
	</script>
```



















