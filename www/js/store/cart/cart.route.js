(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.cart', {
					url: '/cart',
					views: {
						'tab-cart': {
							templateUrl: 'js/store/cart/cart.html',
							controller: 'CartCtrl as cartCtrl'
						}
					},
					resolve: {
						cart: function($q, $timeout, StoreService){
							return StoreService.cartList();
						}
					}


				})
				.state('tab.confirmOrder', {
					url: '/confirmOrder/:keys',
					views: {
						'tab-cart': {
							templateUrl: 'js/store/cart/order.confirm.html',
							controller: 'OrderConfrimCtrl as orderConfrimCtrl'
						}
					}
				})
		});
})();
