
function Zoom(smallPicSelector, bigPicSelector, zoomSelector, bigImgPath) {
  this.oSmallPic = document.querySelector(smallPicSelector);
  this.oBigPic = document.querySelector(bigPicSelector);
  this.oZoom = document.querySelector(zoomSelector);
  this.oBigPic.style.backgroundImage = 'url(' + bigImgPath + ')';
  this.oBigPic.style.backgroundRepeat = 'no-repeat';

  //大图800*800 大图盒子 400*400
  //小图盒子350*350 放大镜175*175
  //所以放大镜总行程是350-175 = 175,  大图的总行程 800 - 400 = 400
  // var rate = 400 / 175;//可以用这句话代替下面的四行，下面四行是更通用的代码
  this.bigPicWidth = parseFloat(fetchComputedStyle(this.oBigPic, 'width'));
  this.smallPicWidth = parseFloat(fetchComputedStyle(this.oSmallPic, 'width'));
  this.zoomWidth = parseFloat(fetchComputedStyle(this.oZoom, 'width'));
  this.rate = (800 - this.bigPicWidth) / (this.smallPicWidth - this.zoomWidth) ;
	this.bindMouseEvent();
	
  }
  Zoom.prototype.bindMouseEvent = function(){
	 var self = this;
	this.oSmallPic.onmouseover = function() {
		self.oZoom.style.display = 'block';
		self.oBigPic.style.display = 'block';
	  }
	  this.oSmallPic.onmouseout = function () {
		self.oZoom.style.display = 'none';
		self.oBigPic.style.display = 'none';
	  }
	  
	this.oSmallPic.onmousemove = function(event) {
		event = event || window.event;

		//event.offsetX不能用
		//因为onmousemove事件冒泡，鼠标碰到zoom这个放大镜时事件将往上传播
		//会触发oSmallPic的onmousemove事件。因此event.offsetX的坐标，以zoom左上角为准
		// var x = event.offsetX;
		// var y = event.offsetY;

		var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		var x = event.clientX - (getAllLeft(self.oSmallPic) - scrollLeft) - self.oZoom.clientWidth / 2;
		var y = event.clientY - (getAllTop(self.oSmallPic) - scrollTop) - self.oZoom.clientHeight / 2;
		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x > self.oSmallPic.clientWidth - self.oZoom.clientWidth) {
		  x = self.oSmallPic.clientWidth - self.oZoom.clientWidth;
		}
		if (y > self.oSmallPic.clientHeight - self.oZoom.clientHeight) {
		  y = self.oSmallPic.clientHeight - self.oZoom.clientHeight;
		}

		self.oZoom.style.top = y + 'px';
		self.oZoom.style.left = x + 'px';

		self.oBigPic.style.backgroundPosition = -x * self.rate + 'px ' + -y * self.rate + 'px';
	}
  }
  
  function fetchComputedStyle(obj, property) {
    if (window.getComputedStyle) {
      property = property.replace(/[A-Z]/g, function(match){
        return '-' + match.toLowerCase();
      });
      return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
    } else {
      property = property.replace(/-([a-z])/g, function(match, $1){
        return $1.toUpperCase();
      });
      return obj.currentStyle[property];
    }
  }
  function getAllTop(obj) {
    var allTop = obj.offsetTop;
    var currentObj = obj;
    while (currentObj = currentObj.offsetParent) {
      allTop += currentObj.offsetTop;
    }
    return allTop;
  }
  function getAllLeft(obj) {
    var allLeft = obj.offsetLeft;
    var currentObj = obj;
    while(currentObj = currentObj.offsetParent) {
      allLeft += currentObj.offsetLeft;
    }
    return allLeft;
  }
