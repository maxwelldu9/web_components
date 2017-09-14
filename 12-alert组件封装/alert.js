(function(){
  function alert(txt, delay) {
    delay = delay || 3000;
    if (!document.querySelector(".alert")) {
      var oDiv = document.createElement('div');
      oDiv.className = 'alert';
      oDiv.innerText = txt;
      document.body.appendChild(oDiv);
      oDiv.style.marginTop = -parseInt(fetchComputedStyle(oDiv, 'height')) / 2 + 'px';
      var timer = setInterval(function() {
        document.body.removeChild(oDiv);
        lock = true;
        clearInterval(timer);
      }, delay)
    }
  }

  function fetchComputedStyle(obj, property) {
    if (window.getComputedStyle) {
      property = property.replace(/[A-Z]/g, function(match) {
        return '-' + match.toLowerCase();
      });
      return window.getComputedStyle(obj)[property];
    } else {
      property = property.replace(/-(a-z)/g, function(match, $1) {
        return $1.toUpperCase();
      })
      return obj.currentStyle[property];
    }
  }

  window.alert = alert;

})();
