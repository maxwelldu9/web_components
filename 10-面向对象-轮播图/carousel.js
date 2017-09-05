function Carousel(selector) {		
	this.index = 0;
	this.oRightBtn = document.querySelector(selector).querySelector('.carousel_rightBtn');
	this.oLeftBtn = document.querySelector(selector).querySelector('.carousel_leftBtn');
	this.oImagesLists = document.querySelector(selector).querySelector('.imagesList').getElementsByTagName('li');
	this.oCirclesLists = document.querySelector(selector).querySelector('.circles').getElementsByTagName('li');
	this.bindEvent();
}
Carousel.prototype.bindEvent = function() {
	var self = this;
	self.oRightBtn.onclick = function(){
	  self.index++;
	  if (self.index >= self.oImagesLists.length) {
		self.index = 0;
	  }
	  self.move();
	}
	self.oLeftBtn.onclick = function(){
	  self.index--;
	  if (self.index < 0) {
		self.index = self.oImagesLists.length-1;
	  }
	  self.move();
	}
	
	for (var i = 0; i < self.oCirclesLists.length; i++) {
	  (function(i){
		self.oCirclesLists[i].onmouseover = function() {
		  self.index = i;
		  self.move();
		}
	  })(i);
	}
}
Carousel.prototype.move = function() {
  for (var i = 0; i < this.oImagesLists.length; i++) {
    this.oImagesLists[i].className = '';
  }
  this.oImagesLists[this.index].className = 'current';

  for (var i = 0; i < this.oCirclesLists.length; i++) {
    this.oCirclesLists[i].className = '';
  }
  this.oCirclesLists[this.index].className = 'current';
}
