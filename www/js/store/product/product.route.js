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
				.state('tab.searchProducts', {
					url: '/search/:categoryId/:keyword',
					views: {
						'tab-categories': {
							templateUrl: 'js/store/product/product.search.list.html',
							controller: 'ProductSearchResultCtrl as productSearchResultCtrl'
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
					resolve: {
						product: function($q, $timeout, Utils, StoreService){
							var pid = Utils.getObjectFromSessionStorage('current_pid');
							return StoreService.getProductDetail(pid);
						}
					}

				})
				

		});
})();
