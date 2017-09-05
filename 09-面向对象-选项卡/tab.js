function Tab(hdSelector, bdSelector) {
	this.oSpans = document.querySelector(hdSelector).getElementsByTagName('span');
	//得到body部分的所有div
	this.oDivs = document.querySelector(bdSelector).getElementsByTagName('div');
	this.bindEvent();
}
Tab.prototype.bindEvent = function() {
	//循环批量绑定事件
	var self = this;
	for (var i = 0; i < self.oSpans.length; i++) {
	  //IIFE将外部的i传递到内部的i
	  (function(i){
		//绑定鼠标移入事件
		self.oSpans[i].onmouseover = function () {
		  //排他模型，让所有的div隐藏，让当前对应的div显示
		  for (var j = 0; j < self.oDivs.length; j++) {
			self.oDivs[j].className = '';//将class属性的值设置为空
		  }
		  //当前的i对应的div显示
		  self.oDivs[i].className = 'current';
		  //把所有的span元素的class样式设置为空
		  for (j = 0; j < self.oSpans.length; j++) {
			self.oSpans[j].className = '';
		  }
		  //给最后一个span元素的 class名称设置为last
		  self.oSpans[self.oSpans.length - 1].className = 'last';
		  //给当前的span元素的类名 +是一个空格 current类名, 因为最后一个span默认有一个class为last, 添加后的为 last current。其他元素添加类名之后他的类名是 " current"
		  this.className += ' current'; //class的类名
		}
	  })(i);
	}
}


