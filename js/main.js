'use strict';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    function callback(e) {
      e = window.e || e;

      if (e.target.tagName !== 'A') {
        return;
      }

      console.log('a link was clicked');
    }

    if (document.addEventListener) {
      document.addEventListener('click', callback, false);
    } else {
      document.attachEvent('onclick', callback);
    }
  })
})();