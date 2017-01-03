/**
 * Store for User domain.
 * */
(function () {

	'use strict';

	angular
		.module('mahatma')
		.factory('StoreService', StoreService);

	StoreService.$inject = ['$q', '$http', 'Utils', 'Constants', '$rootScope'];

	function StoreService($q, $http, Utils, Constants, $rootScope) {

        var getProducts = function (options) {
            var deferred = $q.defer();
            var url = applicationConfig.api_url + '/' + 'Product/list';
            $http.post(url,
            options
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
        }; 
  

		var init = function () {
            
		};

		init();

		return {
			getProducts: getProducts
		};
	}

})();
