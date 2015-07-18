'use strict';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('History and pushState enabled: ' + pushStateExists());

    if (document.addEventListener) {
      document.addEventListener('click', callback, false);
    } else {
      document.attachEvent('onclick', callback);
    }

    // Checks to see if pushState is supported by the 
    // browser
    function pushStateExists() {
      return !!(window.history && window.history.pushState);
    }

    // Event bubbling for anchor elements
    function callback(e) {
      e = window.e || e;
      if (e.target.tagName !== 'A') {
        return;
      }
      // The function to execute when any link gets clicked
      console.log('a link was clicked');
    }
  });
})();