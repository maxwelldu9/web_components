function rolling(direction) {
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

  //左是负值，右是正值
  //上是负值，下是正值
  //如果方向是左或者往上；则每次是递减一个值；
  //如果方向是右或下；则每次将属性值加一个值
  var flag = (direction === 'left' || direction === 'top') ? -1 : 1;
  //根据方向控制css的属性，如果是左和上，那就控制left和top的值；如果是right则依然控制left属性；如果是bottom则依然控制top属性
  var directionProperty = direction;//将方向给css属性
  if (direction === 'right') {
    directionProperty = 'left';
  } else if (direction === 'bottom') {
    directionProperty = 'top';
  }
  var startPoint; //起始位置

  oListUl.innerHTML += oListUl.innerHTML;
  //现在要计算折返点，但是每个li的宽度不一样，所以现在第二个火车头的开头元素的offsetLeft就是折返点。这个元素是oLis[listlength], 我们知道offset的一些值，需要等图片加载完成之后才有，如果要读取offsetLeft值必须保证图片加载完成
  for (var i = 0; i < oImgs.length; i++) {
    oImgs[i].onload = function() {
      count++;
      if (count >= oImgs.length) {
        loadFinish = true;
        //所有图片加载完成这个时候可以得到offsetLeft的值
        //如果方向是左或右，则折返点是中间的一个元素
        if (direction === 'left' || direction === 'right') {
          retracingPoint = oLis[listlength].offsetLeft;
        } else {
          retracingPoint = oLis[listlength].offsetTop;
        }

        //起始位置，如果是左或上，则从0开始，否则从折返点开始
        if (direction === 'left' || direction === 'top') {
          startPoint = nowLeft = 0;
        } else {
          startPoint = nowLeft = -retracingPoint;
        }
        //图片加载完成，再开始运动
        move();
      }
    }
  }

  var timer;
  var nowLeft;

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
      nowLeft += 3 * flag; //flag在左和上的时候，值为-1 在右和下的时候，值为1
      if (direction === 'left' || direction === 'top') {
        if (nowLeft < flag * retracingPoint) {
          nowLeft = startPoint;
        }
      } else {
          if (nowLeft >= 0) {
            nowLeft = startPoint;
          }
      }

      oMUnit.style[directionProperty] = nowLeft + 'px';
    }, 20);
  }

}
