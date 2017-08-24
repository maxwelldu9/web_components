var index = 0;
var oRightBtn = document.getElementById('carousel_rightBtn');
var oLeftBtn = document.getElementById('carousel_leftBtn');
var oImagesLists = document.getElementById('imagesList').getElementsByTagName('li');
var oCirclesLists = document.getElementById('circles').getElementsByTagName('li');
oRightBtn.onclick = function(){
  index++;
  if (index >= oImagesLists.length) {
    index = 0;
  }
  move();
}
oLeftBtn.onclick = function(){
  index--;
  if (index < 0) {
    index = oImagesLists.length-1;
  }
  move();
}
for (var i = 0; i < oCirclesLists.length; i++) {
  (function(i){
    oCirclesLists[i].onmouseover = function() {
      index = i;
      move();
    }
  })(i);
}
function move() {
  for (var i = 0; i < oImagesLists.length; i++) {
    oImagesLists[i].className = '';
  }
  oImagesLists[index].className = 'current';

  for (var i = 0; i < oCirclesLists.length; i++) {
    oCirclesLists[i].className = '';
  }
  oCirclesLists[index].className = 'current';
}
