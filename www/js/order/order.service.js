/**
 * Store for User domain.
 * */
(function () {

	'use strict';

	angular
		.module('mahatma')
		.factory('OrderService', OrderService);

	OrderService.$inject = ['$q', '$http', 'Utils', 'Constants', '$rootScope'];

	function OrderService($q, $http, Utils, Constants, $rootScope) {

		var getOrders = function (options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'OfflineOrder/OrderList';
			if (options.orderState === 10) {
				//确认订单
				url = applicationConfig.api_url + '/' + 'OfflineOrder/MyOrderList';
			}
			$http.post(url, {
				Osn: options.osn,
				SellerRealName: '',
				BuyerAccountName: '',
				StoreName: '',
				OrderState: options.orderState,
				PageIndex: options.pageIndex + 1,
				PageSize: 10,
			}
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

		var auditOrders = function (orders) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'OfflineOrder/AuditOrder';
			$http.post(url, orders
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

		var denyOrder = function (orderId, comment) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'OfflineOrder/RejectOrder';
			$http.post(url, {
				Oid: orderId,
				OperateRemark: comment,
			}
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

		var confirmOrders = function (orders) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'OfflineOrder/ConfirmOrder';
			$http.post(url, orders
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

		var createOrder = function (order) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'OfflineOrder/AddOrder';
      $http.post(url, order
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

		var getOrderDetail = function (orderId) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'OfflineOrder/GetOrder?oid=' + orderId;
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
    };

		var getOnlineOrders= function (options){
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'Order/OrderList';
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
		};

		var cancelOrder= function (oid){
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'Order/CancelOrder';
			$http.post(url, {
				Oid: oid
			}
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

		var confirmReceipt = function (oid) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'Order/ConfirmReceipt?oid='+ oid;
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

		var confirmOnlineOrder = function(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'Order/ConfirmOrder';
			$http.post(url,options
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
			getOrders: getOrders,
			confirmOrders: confirmOrders,
			denyOrder: denyOrder,
			auditOrders: auditOrders,
			createOrder: createOrder,
			getOrderDetail: getOrderDetail,
			getOnlineOrders: getOnlineOrders,
			cancelOrder: cancelOrder,
			confirmReceipt: confirmReceipt,
			confirmOnlineOrder: confirmOnlineOrder,
		};
	}

})();
