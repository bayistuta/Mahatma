(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.orders', {
					url: '/orders',
					views: {
						'tab-orders': {
							templateUrl: 'js/order/offlineOrder/offlineOrder.html',
							controller: 'OfflineOrderCtrl as offlineOrderCtrl'
						}
					},
					resolve: {
						params: function () {
							return {
								canSelectOrder: false,
								state: 0,
								title: '线下订单',
								type: 'listOrders',
							};
						}
					}
				})
				.state('tab.confirmOrders', {
					url: '/confirmOrders',
					views: {
						'tab-confirmOrders': {
							templateUrl: 'js/order/offlineOrder/offlineOrder.html',
							controller: 'OfflineOrderCtrl as offlineOrderCtrl'
						}
					},
					resolve: {
						params: function () {
							return {
								canSelectOrder: true,
								state: 10,
								title: '确认订单',
								type: 'confirmOrders'
							};
						}
					}
				})
				.state('tab.approveOrders', {
					url: '/approveOrders',
					views: {
						'tab-approveOrders': {
							templateUrl: 'js/order/offlineOrder/offlineOrder.html',
							controller: 'OfflineOrderCtrl as offlineOrderCtrl'
						}
					},
					resolve: {
						params: function (Constants, Utils) {
							var orderState = 0;
							var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
							if (account != null) {
								if (account.MallAgid == 7) {
									orderState = 20;
								} else if (account.MallAgid == 13) {
									orderState = 30;
								} else if (account.MallAgid == 12) {
									orderState = 40;
								}
							}
							return {
								canSelectOrder: true,
								state: orderState,
								title: '审核订单',
								type: 'approveOrders',
							};
						}
					}
				})
				.state('tab.orders-create', {
					url: '/orders/create',
					views: {
						'tab-orders': {
							templateUrl: 'js/order/offlineOrder/offlineOrder.create.html',
							controller: 'OrderCreateCtrl as orderCreateCtrl'
						}
					}
				})
		});
})();
