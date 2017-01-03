(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.products', {
					url: '/products/:categoryId',
					views: {
						'tab-categories': {
							templateUrl: 'js/store/product/product.list.html',
							controller: 'ProductListCtrl as productListCtrl'
						}
					},
                    data: {
						requireLogin: false,
					},

				})
                .state('tab.productDetail', {
					url: '/product/:productId',
					views: {
						'tab-categories': {
							templateUrl: 'js/store/product/product.detail.html',
							controller: 'ProductDetailCtrl as productDetailCtrl'
						}
					},
                    data: {
						requireLogin: false,
					},

				})
				

		});
})();
