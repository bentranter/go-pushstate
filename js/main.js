'use strict';

/**
 * Stacker is an AJAX + pushState + WebSocket lib for
 * applications powered by Go.
 *
 * @author Ben Tranter
 * @version 0.0.1
 */
var Stacker = {

  /**
   * Initializes this library by registering all clicks
   * on the document and executing the callback.
   */
  init: function() {
    if (document.addEventListener) {
      document.addEventListener('click', Stacker.callback, false);
    } else {
      document.attachEvent('onclick', Stacker.callback);
    }
  },

  /**
   * Callback for the click event that fires anywhere on
   * the document. Used to register events on all anchor
   * elements, so we can intercept that click to make an
   * AJAX request.
   *
   * @param {Object} the click event
   */
  callback: function(e) {
    e = window.e || e;
    if (e.target.tagName !== 'A') return;
    
    e.preventDefault();
    var tpl = Stacker.fetch(e.target.href);
    console.log(tpl);
  },

  /**
   * Checks for pushState support.
   *
   * @return {Boolean} whether the browser will support
   * HTML5 pushState or not.
   */
  pushStateExists: function() {
    return !!(window.history && window.history.pushState);
  },

  /**
   * Checks for WebSocket support.
   *
   * @return {Boolean} whether the browser will support
   * web sockets or not.
   */
  WebSocketExists: function() {
    return typeof(WebSocket) === 'function';
  },

  /**
   * The AJAX part of this library. Gets a compiled
   * template from the server.
   *
   * @param {String} url of resource you need.
   */
  fetch: function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', document.location.href);
    xhr.send();

    // Events
    xhr.onload = function() {
      // @TODO: manage scroll position in here and stuff like that
    };

    xhr.onloadend = function() {
      Stacker.replace(xhr.response);
    };
    xhr.onerror = function() {
      // @TODO: Change this
      window.alert('Error during fetch');
    };
  },

  /**
   * Replaces the contents of the DOM with the contents
   * returned from the AJAX request.
   *
   * @param {String} the HTML from the response.
   */
  changePage: function(html, url) {
    // Push current state into stupid shitty browser
    // history
    window.history.pushState({}, '', document.location.href);
    document.getElementsByTagName('body')[0].innerHTML = html;
  }
};

(function() {
  
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize our pushState lib
    Stacker.init();
    console.log(Stacker.pushStateExists(), Stacker.WebSocketExists());
  });
})();