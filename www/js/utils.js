(function () {

  'use strict';

  angular
    .module('mahatma')
    .factory('Utils', Utils);

  Utils.$inject = ['$q', '$log', '$document'];

  function Utils($q, $log, $document) {

      function notEmptyString(string) {
        return typeof string == 'string' && string.length > 0;
      }

      function setObjectInSessionStorage (key, obj) {
          sessionStorage.setItem(key, JSON.stringify(obj))
      }

      function getObjectFromSessionStorage (key) {
          var obj= sessionStorage.getItem(key);
          if (obj === "undefined") {
              obj = false;
          } else {
              obj = JSON.parse(obj);
          }
          return obj;
      }

      function setObjectInLocalStorage (key, obj) {
          localStorage.setItem(key, JSON.stringify(obj))
      }

      function getObjectFromLocalStorage (key) {
          var obj = localStorage.getItem(key);
          if (obj === "undefined") {
              obj = false;
          } else {
              obj = JSON.parse(obj);
          }
          return obj;
      }

      function getDate(javaTimestamp){
          var date = new Date(javaTimestamp);
          return date.toLocaleDateString();
      }

    return {
      notEmptyString : notEmptyString,
      setObjectInSessionStorage : setObjectInSessionStorage,
      getObjectFromSessionStorage : getObjectFromSessionStorage,
      setObjectInLocalStorage : setObjectInLocalStorage,
      getObjectFromLocalStorage : getObjectFromLocalStorage,
      getDate : getDate

    };
  }


})();
