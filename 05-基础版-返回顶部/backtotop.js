/**
id 返回顶部元素的id字符串，默认值为#backtotop
scrolltop 滑动多少px时显示返回顶部，默认为500
target 目标值，默认为0，回到顶部
animatetime 动画时间，默认为1000
*/
function backtotop(id, scrolltop, target, animatetime) {
  id         = id || '#backtotop';
  scrolltop  = scrolltop || 500;
  target     = target || 0;
  animatetime = animatetime || 1000;

  var oBack = document.querySelector(id);
  window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > scrolltop) {
      oBack.style.display = 'block';
    } else {
      oBack.style.display = 'none';
    }
  }

  oBack.onclick = function() {
    scrollAnimate(target, animatetime);
  }

  function scrollAnimate(target, time) {
    if (navigator.userAgent.indexOf('MSIE') != -1) {
      var interval = 50;
    } else {
      var interval = 20;
    }
    var frame = 0;
    var frames = time / interval;
    var start = document.body.scrollTop || document.documentElement.scrollTop;
    var distance = target - start;
    var timer;
    clearInterval(timer);
    timer = setInterval(function(){
      frame++;
      if (frame >= frames) {
        clearInterval(timer);
      }
      //第一个参数t表示当前帧
      //第二个b表示起始位置
      //第三个c表示变化量
      //第四个d表示总帧数
      document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
    }, interval);

    function CubicEaseInOut(t,b,c,d){
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    }
  }
}
