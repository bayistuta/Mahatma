(function () {

	'use strict';

	angular
		.module('mahatma')
		.factory('Utils', Utils);

	Utils.$inject = ['$q', '$log', '$document', '$location', '$ionicHistory', 'ionicToast'];

	function Utils($q, $log, $document, $location, $ionicHistory, ionicToast) {

		function toLocation(location, isClearHistory) {
			if (isClearHistory) {
				$ionicHistory
					.clearCache()
					.then(function () {
						$location.path(location)
					});
			} else {
				$location.path(location);
			}

		}

		function setObjectInSessionStorage(key, obj) {
			sessionStorage.setItem(key, JSON.stringify(obj))
		}

		function getObjectFromSessionStorage(key) {
			var obj = sessionStorage.getItem(key);
			if (obj === "undefined") {
				obj = false;
			} else {
				obj = JSON.parse(obj);
			}
			return obj;
		}


		return {
			toLocation: toLocation,
			setObjectInSessionStorage: setObjectInSessionStorage,
			getObjectFromSessionStorage: getObjectFromSessionStorage,
		};
	}


})();
