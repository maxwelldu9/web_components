var oRolling = document.getElementById('rolling');
var oMUnit = document.getElementById('m_unit');
var oListUl = document.getElementsByTagName('ul')[0];
var oImgs = oListUl.getElementsByTagName('img');
var oLis = oListUl.getElementsByTagName('li');
var listlength = oLis.length;

//折返点
var retracingPoint;
var count = 0;
var loadFinish = false;

oListUl.innerHTML += oListUl.innerHTML;
//现在要计算折返点，但是每个li的宽度不一样，所以现在第二个火车头的开头元素的offsetLeft就是折返点。这个元素是oLis[listlength], 我们知道offset的一些值，需要等图片加载完成之后才有，如果要读取offsetLeft值必须保证图片加载完成
for (var i = 0; i < oImgs.length; i++) {
  oImgs[i].onload = function() {
    count++;
    if (count >= oImgs.length) {
      loadFinish = true;
      //所有图片加载完成这个时候可以得到offsetLeft的值
      retracingPoint = oLis[listlength].offsetLeft;
      //图片加载完成，再开始运动
      move();
    }
  }
}

var nowLeft = 0;
var timer;

oRolling.onmouseover = function() {
  clearInterval(timer);
}
oRolling.onmouseout = function(){
  move();
}

function move() {
  if (!loadFinish) {
    return;
  }

  clearInterval(timer);
  timer = setInterval(function(){
    nowLeft -= 3;
    if (nowLeft < -retracingPoint) {
      nowLeft = 0;
    }
    oMUnit.style.left = nowLeft + 'px';
  }, 20);
}
