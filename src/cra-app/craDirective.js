import app from "../../main";
// import React from "react";
// import ReactDOM from "react-dom";
// import Layout from "../react/Layout";

const load = (function() {
  function _load(tag) {
    return function(url) {
      return new Promise(function(resolve, reject) {
        var element = document.createElement(tag);
        var parent = "body";
        var attr = "src";

        // Important success and error for the promise
        element.onload = function() {
          resolve(url);
        };
        element.onerror = function() {
          reject(url);
        };

        switch (tag) {
          case "script":
            element.async = true;
            break;
          case "link":
            element.type = "text/css";
            element.rel = "stylesheet";
            attr = "href";
            parent = "head";
        }
        element[attr] = url;
        document[parent].appendChild(element);
      });
    };
  }
  return {
    css: _load("link"),
    js: _load("script"),
    img: _load("img")
  };
})();

const craDirective = app.directive("craDirective", function() {
  return {
    template: '<div id="root">loading react app</div>',
    scope: {
      todos: "=",
      markComplete: "&"
    },
    link: function(scope, el, attrs) {
      window.setTimeout(function() {
        load.css("/static/css/main.css");
        load.js("/static/js/main.js");
      }, 1000);
    }
  };
});

export default craDirective;
