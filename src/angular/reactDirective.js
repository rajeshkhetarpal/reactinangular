import app from "../../main";
// import React from "react";
// import ReactDOM from "react-dom";
// import Layout from "../react/Layout";

// template: '<div id="reactapp" class="react-part"></div>',

var load = (function() {
  // Function which returns a function: https://davidwalsh.name/javascript-functions
  function _load(tag) {
    return function(url) {
      // This promise will be used by Promise.all to determine success or failure
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

        // Need to set different attributes depending on tag type
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

        // Inject into document to kick off loading
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

const reactDirective = app.directive("reactDirective", [
  "$sce",
  "$compile",
  function($sce, $compile) {
    return {
      template:
        '<div id="root"></div><link href="/static/main.css" rel="stylesheet">',
      scope: {
        todos: "=",
        markComplete: "&"
      },
      link: function(scope, el, attrs) {
        scope.newItem = value => {
          alert(value);
        };

        //el.html($sce.trustAsHtml('<div id="root">loading</div>'));

        //<link href="/static/main.css" rel="stylesheet"><script src="/static/js/2.65aa1cca.chunk.js"></script><script src="/static/js/main.addbc214.chunk.js"></script>
        load.js("/static/main.js");
        // load.js(
        //   "https://olifecontracker.blob.core.windows.net/contracker365/main.js"
        // );

        //$compile(el.contents())(scope);

        // scope.markComplete = (todoItem) => {scope.markItemCompleted(todoItem)}

        const reactapp = document.getElementById("reactapp");
        scope.$watch(
          "todos",
          function(newValue, oldValue) {
            if (angular.isDefined(newValue)) {
              // ReactDOM.render(
              //   <Layout
              //     todos={newValue}
              //     newItem={scope.newItem}
              //     markComplete={scope.markComplete}
              //   />,
              //   reactapp
              // );
            }
          },
          true
        );
      }
    };
  }
]);

export default reactDirective;
