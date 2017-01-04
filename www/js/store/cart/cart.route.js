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
					}

				})
		});
})();
