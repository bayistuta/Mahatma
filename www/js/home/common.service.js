/**
 * Store for User domain.
 * */
(function () {

	'use strict';

	angular
		.module('mahatma')
		.factory('CommonService', CommonService);

	CommonService.$inject = ['$q', '$http', 'Utils', 'Constants', '$rootScope'];

	function CommonService($q, $http, Utils, Constants, $rootScope) {

		
		var getAppversion = function () {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'App/GetAppDetail';
			$rootScope.showLoadingBar = false;
      $http.post(url
      ).then(function (response) {
        if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    }

		var init = function () {

		};

		init();

		return {
			getAppversion: getAppversion,
		};
	}

})();
