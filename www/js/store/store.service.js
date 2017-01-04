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

        var searchProducts = function (options) {
            var deferred = $q.defer();
            var url = applicationConfig.api_url + '/' + 'Product/Search';
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

        var getProductDetail = function(pid) {
            var deferred = $q.defer();
            var url = applicationConfig.api_url + '/' + 'Product/Detail?pid='+pid;
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

        var addToCart = function(options) {
            var deferred = $q.defer();
            var url = applicationConfig.api_url + '/' + 'Cart/AddProduct';
            $http.post(url, options
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

        var cartList = function(options) {
            var deferred = $q.defer();
            var url = applicationConfig.api_url + '/' + 'Cart/List';
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
			getProducts: getProducts,
            searchProducts: searchProducts,
            getProductDetail: getProductDetail,
            addToCart: addToCart,
            cartList: cartList
		};
	}

})();
