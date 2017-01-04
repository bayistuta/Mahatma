(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.myOrders', {
					url: '/account/myOrders/:orderState',
					views: {
						'tab-account': {
							templateUrl: 'js/order/onlineOrder/order.html',
							controller: 'OnlineOrderCtrl as onlineOrderCtrl'
						}
					}
				})
				
		});
})();
