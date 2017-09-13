(function(){
  function getType(o) {
    var _t;
    return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
  }
  //获取不带单位的样式值
  function getStyleNum(el, styleName) {
    return parseInt(fetchComputedStyle(el, styleName));
  }
  //设置样式
  function setStyle(el, obj) {
    if (getType(obj) == "object") {
      for (var s in obj) {
        //把中横线的转为驼峰命名
        var cssArrt = s.split('-');
        for (var i = 1; i < cssArrt.length; i++) {
          cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase());
        }
        var cssArrtnew = cssArrt.join("");
        //设置样式
        el.style[cssArrtnew] = obj[s];
      }
    } else {
      if (getType(obj) == "string") {
        //style.cssText = "color:red; font-size:13px;";
        //设置样式字符串
        el.style.cssText = obj;
      }
    }
  }
  //得到大小
  function getSize(el) {
    //当前元素是隐藏元素直接返回, 或者父元素不是隐藏直接返回
    if (fetchComputedStyle(el, "display") != "none") {
      return {
        width: el.offsetWidth || getStyleNum(el, "width"),
        height: el.offsetHeight || getStyleNum(el, "height")
      };
    }
    //准备要添加的样式，只有添加这些样式之后才能够获取元素的宽高
    var _addCss = { display: "block", position: "absolute", visibility: "hidden"};
    //获得之前旧的这几个样式的值
    var _oldCss = {};
    for (var i in _addCss) {
      //得到样式值放数组中，等获得宽高之后再设置回去
      _oldCss[i] = fetchComputedStyle(el, i);
    }
    //设置上新的样式
    setStyle(el, _addCss);
    //拿到当前元素的子元素container宽高
    var container = el.querySelector('.container');
    var _width = container.offsetWidth || getStyleNum(container, "width");
    var _height = container.offsetHeight || getStyleNum(container, "height");
    //再设置回去
    for (var i in _oldCss) {
      setStyle(el, _oldCss);
    }
    //返回宽高
    return { width: _width, height: _height};
  }
  //把这个方法暴露到外面
  window.getSize = getSize;
})();
function fetchComputedStyle(obj, property) {
  if (window.getComputedStyle) {
    // paddingLeft 需要转换成padding-left
    property = property.replace(/[A-Z]/g, function(match){
      return '-' + match.toLowerCase();
    });
    // return widow.getComputedStyle(obj).property; //表示属性名就叫property
    return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
  } else {
    //padding-top -> paddingTop
    property = property.replace(/-([a-z])/g, function(match, $1){
      return $1.toUpperCase();
    });
    return obj.currentStyle[property];
  }
}

function Modal(selector) {
  //控制模态框的位置
  this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  this.oContainer = document.querySelector('.container');
  this.containerHeight = getSize(this.oContainer.parentNode).height;
  this.oContainer.style.top = (this.windowHeight - this.containerHeight) / 2 + 'px';
  this.oModal = document.querySelector('.modal');
  this.oBtn = document.querySelector(selector);
  this.bindEvent();
}
Modal.prototype.bindEvent = function() {
  this.oModal.onclick = (event) => {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.className === 'close' || target.className === 'modal') {
      this.oModal.style.display = 'none';
    }
  }

  this.oBtn.onclick = () => {
    this.oModal.style.display = "block";
  }
}
