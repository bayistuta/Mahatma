(function () {

	'use strict';

	angular
		.module('mahatma')
		.factory('Interceptor', Interceptor);

	Interceptor.$inject = ['$rootScope', '$q', 'Constants'];

	function Interceptor($rootScope, $q, Constants) {

		function requestError(config) {
			return config;
		}

		function request(config) {
			var authString;
			config.headers = config.headers || {};
			var token = sessionStorage.getItem(Constants.CACHE_TOKEN_KEY);
			if (token) {
				config.headers['Authorization'] = 'bearer ' + token;
			}
			if (config.url && config.url.lastIndexOf('html') < 0) {
				$rootScope.$broadcast('loading:show')
			}
			return config;
		}

		function response(response) {
			if (response.config.url && response.config.url.lastIndexOf('html') < 0) {
				$rootScope.$broadcast('loading:hide');
			}
			if (response.data && !response.data.Result && response.data.ErrorItemList && response.data.ErrorItemList.length) {
				var message = '';
				response.data.ErrorItemList.forEach(function (error) {
					message += error.ErrorMsg + '<br>'
				});
				$rootScope.$broadcast('response:error',message);
			}
			return response;
		}

		function responseError (response) {
			if (response.config.url && response.config.url.lastIndexOf('html') < 0) {
				$rootScope.$broadcast('loading:hide');
			}
			if (response.data && response.data.error_description) {
				$rootScope.$broadcast('response:error',response.data.error_description);
			}
			return response;
		}
		return {
			request: request,
			response: response,
			responseError: responseError, 
			requestError: requestError,
		};
	}
})();
